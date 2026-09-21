"""Regenerates the monitor corner-pin tracking JSON from the real screen edge of every frame.

Run from the repo root:  python tools/retrack.py mobile|desktop [--prior FILE] [--out FILE]
Needs: pip install numpy scipy pillow scikit-image

mobile  -> public/quad_tracking_mobile.json  (frames: public/hero-frames-mobile, green mask + sub-pixel contour)
desktop -> public/quad_tracking.json         (frames: public/hero-frames, brightness edge profiles; the screen
           has a bright glare and a bezel close to the wall colour, so a colour mask leaks there)

The existing JSON (or --prior) is only a COARSE prior: it tells each frame roughly where the four
sides are (must be within ~15 px, ~25 px for desktop). If the footage is re-recorded with a very
different camera move, first put a rough per-frame quad in that file (or in --prior).
Output: one line per side fitted by total least squares, corners = intersections, then a temporal
Savitzky-Golay smooth. Prints line residual, smoothing cost and jitter (2nd difference); check
that the frame-to-frame jump stays smooth and the residuals are ~0.1-1 px before committing.
"""
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from scipy.signal import savgol_filter

ROOT = Path(__file__).resolve().parent.parent / 'public'
SIDES = [(0, 1), (1, 2), (2, 3), (3, 0)]     # top, right, bottom, left (corners TL, TR, BR, BL)


def intersect(l1, l2):
    (p, u), (q, v) = l1, l2
    A = np.array([u, -v]).T
    if abs(np.linalg.det(A)) < 1e-6:
        return None
    return p + np.linalg.solve(A, q - p)[0] * u


def fit_line(pts):
    c = pts.mean(0)
    return c, np.linalg.svd(pts - c, full_matrices=False)[2][0]


# ---------------------------------------------------------------- mobile: green mask contour

def mobile_field(path):
    im = np.asarray(Image.open(path).convert('RGB')).astype(float)
    f = np.clip((im[..., 1] - np.maximum(im[..., 0], im[..., 2])) / 150.0, 0, 1)
    lab, n = ndi.label(f > 0.5)
    if n > 1:
        sizes = ndi.sum(np.ones_like(lab), lab, index=range(1, n + 1))
        f = f * ndi.binary_dilation(lab == 1 + int(np.argmax(sizes)), iterations=3)
    return f


def mobile_contour(f):
    from skimage import measure
    p = np.pad(f, 1, mode='edge')            # a mask touching the frame keeps going outside
    # with the screen past the left/right frame edges the outline is TWO open curves: keep them all
    c = np.concatenate([c for c in measure.find_contours(p, 0.5) if len(c) > 15])
    return np.stack([c[:, 1] - 0.5, c[:, 0] - 0.5], axis=1)      # (x, y), pixel-edge convention


def mobile_solve(pts, prior, W, H):
    border = {0: (np.array([0., 0.]), np.array([1., 0.])), 1: (np.array([float(W), 0.]), np.array([0., 1.])),
              2: (np.array([0., float(H)]), np.array([1., 0.])), 3: (np.array([0., 0.]), np.array([0., 1.]))}
    cur, used = np.array(prior, float), [False] * 4
    for it in range(3):
        tol, lines = (14 if it == 0 else 6), []
        for k, (a, b) in enumerate(SIDES):
            d = cur[b] - cur[a]
            L = np.hypot(*d)
            line = None
            if L > 20:
                u = d / L
                s, t = (pts - cur[a]) @ u, (pts - cur[a]) @ np.array([-u[1], u[0]])
                # 12-88% keeps clear of the corners; a side needs a decent visible span, else it "left the frame"
                sp = pts[(s > 0.12 * L) & (s < 0.88 * L) & (np.abs(t) < tol)]
                if len(sp) >= 30 and np.ptp(sp @ u) >= 25:
                    line = fit_line(sp)
            used[k] = line is not None
            lines.append(line if line is not None else border[k])
        cur = np.array([c if (c := intersect(lines[(k - 1) % 4], lines[k])) is not None else cur[k] for k in range(4)])
    res = []
    for k, (a, b) in enumerate(SIDES):
        if not used[k]:
            continue
        p, u = lines[k]
        s, t = (pts - p) @ u, (pts - p) @ np.array([-u[1], u[0]])
        d = cur[b] - cur[a]
        L, sg, s0 = np.hypot(*d), np.sign((d @ u) or 1), (cur[a] - p) @ u
        m = (np.abs(t) < 3) & ((s - s0) * sg > 0.12 * L) & ((s - s0) * sg < 0.88 * L)
        if m.sum() > 5:
            res.append(t[m])
    rms = float(np.sqrt(np.mean(np.concatenate(res) ** 2))) if res else float('nan')
    return cur, used, rms, lines


def keep_outside(line, k, span, W, H):
    """A side that left the frame stays just past its border, only along the stretch where the screen exists."""
    p, u = line
    lo, hi = span
    x_at = lambda y: p[0] + u[0] * ((y - p[1]) / u[1]) if abs(u[1]) > 1e-9 else p[0]
    y_at = lambda x: p[1] + u[1] * ((x - p[0]) / u[0]) if abs(u[0]) > 1e-9 else p[1]
    if k == 1:
        p = p + np.array([max(0.0, W - min(x_at(lo), x_at(hi))), 0.0])
    elif k == 3:
        p = p - np.array([max(0.0, max(x_at(lo), x_at(hi))), 0.0])
    elif k == 0:
        p = p - np.array([0.0, max(0.0, max(y_at(lo), y_at(hi)))])
    elif k == 2:
        p = p + np.array([0.0, max(0.0, H - min(y_at(lo), y_at(hi)))])
    return p, u


def track_mobile(prior, frames_dir):
    W, H, n = prior['width'], prior['height'], len(prior['frames'])
    last, C = [None] * 4, []                 # last VISIBLE line per side, frozen once the side leaves the frame
    for i in range(n):
        pts = mobile_contour(mobile_field(frames_dir / f'monitor_{i:05d}.webp'))
        corners, used, rms, lines = mobile_solve(pts, prior['frames'][i]['corners'], W, H)
        lines = list(lines)
        for k in range(4):
            if used[k]:
                last[k] = lines[k]
        for k in range(4):
            if not used[k] and last[k] is not None:
                ends = [e for e in (intersect(last[k], lines[(k + d) % 4]) for d in (-1, 1)) if e is not None]
                ax = 1 if k in (1, 3) else 0     # vertical sides span y, horizontal ones span x
                span = (min(e[ax] for e in ends), max(e[ax] for e in ends)) if len(ends) == 2 else ((0, H) if ax else (0, W))
                lines[k] = keep_outside(last[k], k, span, W, H)
        C.append((np.array([c if (c := intersect(lines[(k - 1) % 4], lines[k])) is not None else corners[k] for k in range(4)]), rms))
    return np.array([c for c, _ in C]), [r for _, r in C], 9


# ---------------------------------------------------------------- desktop: brightness edge profiles

GRAD_MIN = 5.0      # levels/px: weakest screen->bezel step accepted (the glare side is only ~10-17 levels)


def desktop_edge_points(V, p0, p1, centroid, wide, step=3.0, res=0.25):
    """Sub-pixel edge points along one side: first strong falling edge going outward from the screen.
    wide=True is the first pass (prior can be ~25 px off); later passes refine around a good line."""
    inner, outer, start_at = (60, 30, -50) if wide else (22, 14, -8)
    d = p1 - p0
    L = np.hypot(*d)
    u = d / L
    n = np.array([-u[1], u[0]])
    if (p0 + p1) / 2 @ n < centroid @ n:     # normal points away from the centroid
        n = -n
    ts = np.arange(-inner, outer + res, res)
    zone = np.nonzero(ts >= start_at)[0]
    pts = []
    for s in np.arange(0.10 * L, 0.90 * L, step):
        base = p0 + u * s
        xy = base[None, :] + ts[:, None] * n[None, :]
        prof = ndi.map_coordinates(V, [xy[:, 1] - 0.5, xy[:, 0] - 0.5], order=1, mode='nearest')
        g = np.gradient(ndi.gaussian_filter1d(prof, 0.75 / res), res)
        gz = g[zone]
        hit = np.nonzero(gz < -GRAD_MIN)[0]
        if hit.size == 0:
            continue
        end = first = hit[0]
        while end + 1 < len(gz) and gz[end + 1] < -GRAD_MIN:
            end += 1
        k = zone[first + int(np.argmin(gz[first:end + 1]))]
        if k <= 0 or k >= len(ts) - 1:
            continue
        den = g[k - 1] - 2 * g[k] + g[k + 1]                       # parabolic refinement of the gradient peak
        off = 0.5 * (g[k - 1] - g[k + 1]) / den if den != 0 else 0.0
        pts.append(base + n * (ts[k] + float(np.clip(off, -1, 1)) * res))
    return np.array(pts)


def robust_line(pts):
    keep = np.ones(len(pts), bool)
    for _ in range(3):
        c = pts[keep].mean(0)
        u = np.linalg.svd(pts[keep] - c, full_matrices=False)[2][0]
        r = (pts - c) @ np.array([-u[1], u[0]])
        s = max(0.35, 1.4826 * np.median(np.abs(r[keep] - np.median(r[keep]))))
        keep = np.abs(r - np.median(r[keep])) < 3.0 * s
        if keep.sum() < 10:
            break
    line = fit_line(pts[keep])
    r = (pts[keep] - line[0]) @ np.array([-line[1][1], line[1][0]])
    return line, float(np.sqrt(np.mean(r ** 2)))


def track_desktop(prior, frames_dir):
    C, R = [], []
    for i in range(len(prior['frames'])):
        V = np.asarray(Image.open(frames_dir / f'monitor_{i:05d}.webp').convert('RGB')).astype(float).max(axis=2)
        cur = np.array(prior['frames'][i]['corners'], float)          # coarse prior only
        for it in range(3):                                            # pass 0 wide, then two refinements
            lines, rms = [], []
            for a, b in SIDES:
                pts = desktop_edge_points(V, cur[a], cur[b], cur.mean(0), wide=(it == 0))
                if len(pts) < 20:
                    raise RuntimeError(f'frame {i}: too few edge points on a side (prior too far off?)')
                ln, r = robust_line(pts)
                lines.append(ln); rms.append(r)
            cur = np.array([intersect(lines[(k - 1) % 4], lines[k]) for k in range(4)])
        C.append(cur); R.append(max(rms))
    return np.array(C), R, 13


# ---------------------------------------------------------------- shared

CONFIG = {
    'mobile': ('quad_tracking_mobile.json', 'hero-frames-mobile', track_mobile),
    'desktop': ('quad_tracking.json', 'hero-frames', track_desktop),
}


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[1])
    ap.add_argument('which', choices=CONFIG)
    ap.add_argument('--prior', help='coarse prior JSON (default: the current one in public/)')
    ap.add_argument('--out', help='output JSON (default: overwrite the one in public/)')
    a = ap.parse_args()
    name, frames, track = CONFIG[a.which]
    prior_path = Path(a.prior) if a.prior else ROOT / name
    prior = json.loads(prior_path.read_text())
    raw, rms, win = track(prior, ROOT / frames)
    S = savgol_filter(raw, win, 2, axis=0, mode='interp')
    old = np.array([f['corners'] for f in prior['frames']], float)
    d1, d2 = (np.abs(np.diff(S, n=k, axis=0)).max(axis=(1, 2)) for k in (1, 2))
    print(f'{a.which}: {len(S)} frames | line residual px median {np.nanmedian(rms):.2f} max {np.nanmax(rms):.2f}'
          f' | smoothing cost max {np.abs(S - raw).max():.2f} px | |new-prior| max {np.abs(S - old).max():.1f} px'
          f' | jump max {d1.max():.2f} px | jitter (2nd diff) median {np.median(d2):.3f} p95 {np.percentile(d2, 95):.2f} max {d2.max():.2f}')
    out = {'width': prior['width'], 'height': prior['height'], 'fps': prior['fps'],
           'frames': [{'t': f['t'], 'corners': [[round(float(x), 2), round(float(y), 2)] for x, y in c]}
                      for f, c in zip(prior['frames'], S)]}
    Path(a.out or ROOT / name).write_text(json.dumps(out))


if __name__ == '__main__':
    main()
