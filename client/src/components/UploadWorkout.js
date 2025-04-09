import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function UploadWorkout() {
  const [formData, setFormData] = useState({
    title: '',
    gender: '',
    goal: '',
    type: '',
    duration: '',
    equipment: '',
    video: null,
    userId: 'admin_user_id', // Hardcoded for now; use login state in production
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/upload-workout', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
      setFormData({ ...formData, title: '', gender: '', goal: '', type: '', duration: '', equipment: '', video: null });
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  return (
    <Container className="my-5">
      <h2>Upload a Workout</h2>
      {message && <Alert variant={message.includes('failed') ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="both">Both</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Goal</Form.Label>
          <Form.Control as="select" name="goal" value={formData.goal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="strength">Strength</option>
            <option value="toning">Toning</option>
            <option value="cardio">Cardio</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control as="select" name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select</option>
            <option value="HIIT">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="strength">Strength</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Equipment (comma-separated)</Form.Label>
          <Form.Control type="text" name="equipment" value={formData.equipment} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Video File</Form.Label>
          <Form.Control type="file" name="video" onChange={handleFileChange} accept="video/*" required />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Upload Workout</Button>
      </Form>
    </Container>
  );
}

export default UploadWorkout;