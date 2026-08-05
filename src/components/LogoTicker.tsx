const TOOLS = [
  'React', 'TypeScript', 'FastAPI', 'LangGraph', 'RAG',
  'Amazon Bedrock', 'AWS Lambda', 'NestJS', 'Angular 17',
  'PostgreSQL', 'PGVector', 'Playwright', 'n8n', 'Make.com',
  'Netlify', 'Node.js', 'Next.js', 'GitHub Actions',
];

const SEP = (
  <span aria-hidden style={{ color: 'var(--line)', fontSize: 14, flexShrink: 0 }}>✦</span>
);

// Duplicado para loop contínuo sem gap
const items = [...TOOLS, ...TOOLS];

export default function LogoTicker() {
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--line)', background: 'var(--bg)', padding: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: 'max-content', animation: 'marquee 35s linear infinite' }}>
        {items.map((tool, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 28, paddingRight: 28, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {tool}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  );
}
