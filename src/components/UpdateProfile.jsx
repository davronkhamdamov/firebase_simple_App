import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/Auth.context";
import { Link, useNavigate } from "react-router-dom";

const Update_Profile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const password_confirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password_confirmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blankto keep the same"
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={password_confirmRef}
                placeholder="Leave blankto keep the same"
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default Update_Profile;
