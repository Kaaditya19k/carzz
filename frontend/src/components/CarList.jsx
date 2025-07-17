import { useEffect, useState } from 'react';
import './CarList.css';

export default function CarList({ refresh }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch cars');
        setLoading(false);
      });
  }, [refresh]);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="car-list-section">
      <div className="car-grid">
        {cars.length === 0 ? (
          <div>No cars found.</div>
        ) : (
          cars.map(car => (
            <div className="car-card" key={car._id}>
              <div className="car-card-header">
                <span className="car-brand">{car.brand}</span>
                <span className="car-model">{car.model}</span>
              </div>
              <div className="car-card-details">
                <div><b>Year:</b> {car.year}</div>
                <div><b>Price:</b> ${car.price}</div>
                <div><b>Status:</b> <span className={car.status === 'sold' ? 'car-status-sold' : 'car-status-available'}>{car.status}</span></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 