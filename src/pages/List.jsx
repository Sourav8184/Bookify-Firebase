// React:
import { React, useEffect, useState } from "react";

// Bootstrap:
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// import Custoom Hook
import { useFirebase } from "../context/FirebaseContext";

function List() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Listing a Book ...");
    const result = await firebase.handleCreateNewListing(
      name,
      isbnNumber,
      price,
      coverImage
    );
    console.log("Listing Success ...", result);
    console.log("Cover Img ...", coverImage);
  };
  return (
    <div className="container  mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Enter Book Name ..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Book ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="Enter ISBN Number ..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Book Price ..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover image</Form.Label>
          <Form.Control
            onChange={(e) => setCoverImage(e.target.files[0])}
            type="file"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default List;
