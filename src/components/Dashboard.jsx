import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/Auth.context";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert>{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
