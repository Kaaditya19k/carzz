import { useState } from 'react';

export default function AddCarForm({ token, onAdd }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [type, setType] = useState('petrol'); // Added car type state
  const [image, setImage] = useState(null); // Added image state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const formData = new FormData();
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('year', year);
      formData.append('price', price);
      formData.append('status', status);
      formData.append('type', type); // Add car type
      if (image) {
        formData.append('image', image);
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Car added!');
        setBrand(''); setModel(''); setYear(''); setPrice(''); setStatus('available'); setType('petrol'); setImage(null);
        onAdd();
      } else {
        setError(data.message || 'Failed to add car');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }} encType="multipart/form-data">
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
      <select value={type} onChange={e => setType(e.target.value)} required>
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="ev">EV</option>
        <option value="hybrid">Hybrid</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />
      <button type="submit" style={{ background: 'var(--btn-gradient)', color: 'var(--btn-text)', border: '2px solid var(--btn-border)', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 17, marginTop: 8, cursor: 'pointer' }}>Add Car</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
} 