import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="text-center my-5">
      <h1>Welcome to Break a Sweat</h1>
      <p>Your virtual fitness companion.</p>
      <Button variant="primary" href="/workouts">Get Started</Button>
    </Container>
  );
}

export default Home;