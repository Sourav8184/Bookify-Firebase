// React:
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap:
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import Custom hook:
import { useFirebase } from "../context/FirebaseContext";

// Register Component
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // if user Register then Navigate to Home
    navigate("/");
  });

  const firebase = useFirebase();
  console.log(firebase);

  // Signup method
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signin up a user ...");
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
    console.log("Signin Success ", result);
  };

  return (
    <div className="container  mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email ..."
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Your Password ..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  );
}

export default Register;
