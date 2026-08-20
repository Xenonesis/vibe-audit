interface BentoCard {
  className?: string;
  badge: string;
  title: string;
  desc: string;
  badgeClass?: 'badge-blue' | 'badge-green' | 'badge-yellow';
}

export default function BentoGrid({ cards }: { cards: BentoCard[] }) {
  return (
    <div className="bento-grid reveal">
      {cards.map((card, i) => (
        <div key={i} className={`bento-card ${card.className || ''}`}>
          <div>
            <div className={`badge ${card.badgeClass || 'badge-blue'}`} style={{ marginBottom: '12px' }}>{card.badge}</div>
            <div className="card-title">{card.title}</div>
            <div className="card-desc">{card.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}