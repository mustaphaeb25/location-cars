import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Image } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const CarForm = ({ onSubmit, initialData = {}, loading, error, success }) => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    statut: 'disponible',
    prix_par_jour: '',
    description: '',
    image: null,
    
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        marque: initialData.marque || '',
        modele: initialData.modele || '',
        statut: initialData.statut || '',
        prix_par_jour: initialData.prix_par_jour || '',
        description: initialData.description || '',
        image: null, // Image input should be reset for edit, user can re-upload
      });
      if (initialData.image_url) {
        setImagePreview(`http://localhost:3000/uploads/${initialData.image_url}`);
      } else {
        setImagePreview(null);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreview(initialData.image_url ? `http://localhost:3000/uploads/${initialData.image_url}` : null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.marque || !formData.modele || !formData.prix_par_jour || !formData.description) {
      setValidationError('Please fill in all required fields.');
      return;
    }

    if (isNaN(formData.prix_par_jour) || parseFloat(formData.prix_par_jour) <= 0) {
      setValidationError('Price per day must be a positive number.');
      return;
    }

    const data = new FormData();
    data.append('marque', formData.marque);
    data.append('modele', formData.modele);
    data.append('statut', formData.statut);
    data.append('prix_par_jour', formData.prix_par_jour);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formMarque">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              placeholder="Enter car brand"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formModele">
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="modele"
              value={formData.modele}
              onChange={handleChange}
              placeholder="Enter car model"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formPrixParJour">
            <Form.Label>Price per Day ($)</Form.Label>
            <Form.Control
              type="number"
              name="prix_par_jour"
              value={formData.prix_par_jour}
              onChange={handleChange}
              placeholder="Enter price per day"
              step="0.01"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formStatut">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
            >
              <option value="disponible">Available</option>
              <option value="réservée ">Rented</option>
              <option value="en maintenance">In Maintenance</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter car description"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Car Image</Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/jpeg, image/jpg, image/jfif, image/png"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <div className="mt-3">
            <p>Image Preview:</p>
            <Image src={imagePreview} thumbnail style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        )}
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100" disabled={loading}>
        {loading ? 'Saving...' : (initialData ? 'Update Car' : 'Add Car')}
      </Button>
    </Form>
  );
};

export default CarForm;