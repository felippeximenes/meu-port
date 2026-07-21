const items = ['Full Stack', 'IA & LLM', 'RAG', 'AWS Serverless', 'React', 'Node.js', 'Python', 'Next.js', 'Busca Vetorial'];

function Run() {
  return (
    <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, whiteSpace: 'nowrap', paddingRight: 24 }}>
      {items.map(it => (
        <span key={it}>{it} <em style={{ color: '#8a8478' }}>·</em> </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div style={{ borderTop: '1px solid #dcd7ce', borderBottom: '1px solid #dcd7ce', overflow: 'hidden', padding: '18px 0', background: '#faf9f7' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
        <Run /><Run />
      </div>
    </div>
  );
}
