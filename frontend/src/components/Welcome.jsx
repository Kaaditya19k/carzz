import { FaCheckCircle, FaTags, FaMoneyCheckAlt } from 'react-icons/fa';

const carSvg = (
  <svg width="220" height="100" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 24 }} className="animated-car">
    {/* Shadow */}
    <ellipse cx="110" cy="90" rx="90" ry="10" fill="#e0f7fa" />
    {/* Car body */}
    <rect x="40" y="50" width="140" height="30" rx="14" fill="#1976d2" />
    {/* Car roof */}
    <rect x="70" y="35" width="80" height="25" rx="10" fill="#26c6da" />
    {/* Windows */}
    <rect x="85" y="40" width="50" height="15" rx="6" fill="#fff" opacity="0.8" />
    {/* Wheels with animation */}
    <g className="animated-wheel">
      <circle cx="65" cy="85" r="10" fill="#16213a" />
      <circle cx="155" cy="85" r="10" fill="#16213a" />
      {/* Wheel hubs */}
      <circle cx="65" cy="85" r="4" fill="#b2ebf2" />
      <circle cx="155" cy="85" r="4" fill="#b2ebf2" />
    </g>
  </svg>
);

const features = [
  {
    icon: <FaCheckCircle size={32} color="var(--feature-accent)" />,
    title: 'Verified Listings',
    desc: 'All cars are checked and verified for your peace of mind.'
  },
  {
    icon: <FaTags size={32} color="#1976d2" />,
    title: 'Best Prices',
    desc: 'Get the best deals and transparent pricing on every car.'
  },
  {
    icon: <FaMoneyCheckAlt size={32} color="#0097a7" />,
    title: 'Easy Financing',
    desc: 'Flexible financing options to suit your needs.'
  }
];

export default function Welcome() {
  return (
    <section style={{
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh',
      padding: '48px 0 32px 0',
      width: '100vw',
      boxSizing: 'border-box',
      background: 'linear-gradient(120deg, #e0f7fa 60%, #1976d2 100%)',
      overflow: 'hidden',
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(120deg, rgba(25,118,210,0.08) 0%, rgba(38,198,218,0.10) 100%)',
        zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {carSvg}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          color: 'var(--btn-border)',
          marginBottom: 12,
          letterSpacing: 1,
          textAlign: 'center',
        }}>
          Welcome to Carzz
        </h1>
        <p style={{ fontSize: 20, color: 'var(--text-secondary)', marginBottom: 32, textAlign: 'center', maxWidth: 500 }}>
          Find your perfect car with the best deals and financing options
        </p>
        <div style={{ display: 'flex', gap: 18, marginBottom: 36 }}>
          <button className="animated-btn"
            style={{
              background: 'var(--btn-gradient)',
              color: 'var(--btn-text)',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
              cursor: 'pointer',
              transition: 'transform 0.1s',
            }}
            onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
          >
            Browse Cars
          </button>
          <button className="animated-btn"
            style={{
              background: 'var(--bg-section)',
              color: 'var(--btn-border)',
              border: '2px solid var(--btn-border)',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            Contact Dealer
          </button>
        </div>
        {/* Features row */}
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-section)',
              borderRadius: 12,
              boxShadow: '0 2px 12px rgba(25,118,210,0.06)',
              padding: '22px 18px',
              minWidth: 210,
              maxWidth: 260,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center',
              margin: '8px 0',
            }}>
              {f.icon}
              <div style={{ fontWeight: 700, fontSize: 18, margin: '10px 0 4px 0', color: 'var(--btn-border)' }}>{f.title}</div>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 