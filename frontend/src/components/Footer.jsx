import { FaCar } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{
      width: '100vw',
      background: 'var(--bg-section)',
      color: 'var(--text-secondary)',
      textAlign: 'center',
      padding: '14px 0 8px 0',
      fontSize: 15,
      borderTop: '0',
      boxShadow: '0 -2px 16px rgba(25,118,210,0.06)',
      // position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      <div style={{
        height: 5,
        width: '100%',
        background: 'var(--header-gradient)',
        marginBottom: 10,
        borderRadius: '0 0 8px 8px',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 2 }}>
        <FaCar size={18} color="var(--btn-border)" />
        <span>© {new Date().getFullYear()} Carzz. All rights reserved.</span>
      </div>
      <div style={{ fontSize: 13, marginTop: 0, color: 'var(--text-secondary)' }}>Made with ❤️ for car lovers.</div>
    </footer>
  );
} 