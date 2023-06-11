import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/Auth.context";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}></Form.Control>
            </Form.Group>
            <br />
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forget-password">Forget Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?<Link to="/signup"> Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
