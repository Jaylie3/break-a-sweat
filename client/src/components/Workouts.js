import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then(res => setWorkouts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container className="my-5">
      <h2>Workouts</h2>
      <Row>
        {workouts.map(workout => (
          <Col md={4} key={workout._id} className="my-3">
            <Card>
              <Card.Body>
                <Card.Title>{workout.title}</Card.Title>
                <Card.Text>Duration: {workout.duration} mins</Card.Text>
                <iframe
                  src={workout.videoUrl}
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={workout.title}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Workouts;