import { useState } from 'react';

export default function AddCarForm({ token, onAdd }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const carData = { brand, model, year, price, status, image };
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Car added!');
        setBrand(''); setModel(''); setYear(''); setPrice(''); setStatus('available'); setImage('');
        onAdd();
      } else {
        setError(data.message || 'Failed to add car');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Add New Car</h2>
      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={e => setBrand(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={e => setModel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)}
        required
        min="1900"
        max={new Date().getFullYear()}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
        min="0"
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ marginBottom: 10 }}
      />
      {image && (
        <img src={image} alt="Preview" style={{ maxWidth: 120, maxHeight: 80, marginBottom: 10, borderRadius: 8, border: '1px solid #ccc' }} />
      )}
      <button type="submit">Add Car</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
} 