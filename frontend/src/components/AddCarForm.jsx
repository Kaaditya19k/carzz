import { useState } from 'react';

export default function AddCarForm({ token, onAdd }) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

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
      images.forEach(img => formData.append('images', img));
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Car added!');
        setBrand(''); setModel(''); setYear(''); setPrice(''); setStatus('available');
        setImages([]); setImagePreviews([]);
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
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={handleImageChange}
        style={{ marginBottom: 10 }}
      />
      {imagePreviews.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          {imagePreviews.map((src, i) => (
            <img key={i} src={src} alt="preview" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid #ccc' }} />
          ))}
        </div>
      )}
      <button type="submit">Add Car</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </form>
  );
} 