// React:
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap:
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import Custom hook:
import { useFirebase } from "../context/FirebaseContext";

// Login Component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // if user Logged in then navigate to Home
    navigate("/");
  });

  const firebase = useFirebase();
  console.log(firebase);

  //Signin method
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login a user ...");
    const result = await firebase.signinUserWithEmailAndPassword(
      email,
      password
    );
    console.log("login Success ", result);
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
          Login
        </Button>
      </Form>
      <h2 className="mt-5 mb-5">Or</h2>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        Signin with Google
      </Button>
    </div>
  );
}

export default Login;
