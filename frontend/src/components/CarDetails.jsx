import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) setCar(data);
        else setError(data.message || 'Car not found');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch car');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading car details...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (!car) return null;

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', padding: 0 }}>
      <div style={{ marginBottom: 18 }}>
        <button
          onClick={() => navigate('/cars')}
          style={{
            background: 'var(--btn-gradient)',
            color: 'var(--btn-text)',
            border: 'none',
            borderRadius: 8,
            padding: '8px 22px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            marginBottom: 10,
            boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
          }}
        >
          ← Back to Cars
        </button>
      </div>
      <div style={{
        background: 'var(--bg-section)',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(25,118,210,0.10)',
        padding: '36px 32px 28px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12
      }}>
        {/* Removed car image display */}
        <h2 style={{ fontWeight: 900, fontSize: '2.3rem', marginBottom: 10, color: 'var(--btn-border)', letterSpacing: 1 }}>
          {car.brand} {car.model} <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>({car.year})</span>
        </h2>
        <div style={{ width: '100%', height: 2, background: 'var(--header-gradient)', borderRadius: 2, margin: '10px 0 18px 0' }} />
        <div style={{ fontSize: 20, marginBottom: 6 }}><b>Brand:</b> <span style={{ color: 'var(--text-main)' }}>{car.brand}</span></div>
        <div style={{ fontSize: 20, marginBottom: 6 }}><b>Model:</b> <span style={{ color: 'var(--text-main)' }}>{car.model}</span></div>
        <div style={{ fontSize: 20, marginBottom: 6 }}><b>Year:</b> <span style={{ color: 'var(--text-main)' }}>{car.year}</span></div>
        <div style={{ fontSize: 20, marginBottom: 6 }}><b>Price:</b> <span style={{ color: '#1976d2', fontWeight: 700 }}>${car.price}</span></div>
        <div style={{ fontSize: 20, marginBottom: 6 }}><b>Status:</b> <span className={car.status === 'sold' ? 'car-status-sold' : 'car-status-available'} style={{ fontWeight: 700 }}>{car.status}</span></div>
        <div style={{ fontSize: 16, marginTop: 10, color: '#888' }}><b>ID:</b> {car._id}</div>
      </div>
    </div>
  );
} 