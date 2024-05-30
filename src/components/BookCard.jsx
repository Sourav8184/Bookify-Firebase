// React
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";
import { Col, Card } from "react-bootstrap";

// import custom Hook:
import { useFirebase } from "../context/FirebaseContext";

function BookCard({
  Name,
  imageURL,
  isbn,
  price,
  userDisplayName,
  userEmail,
  userId,
  userPhotoURL,
  bookId,
  link,
}) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("imageURL -> ", imageURL);
    firebase
      .getImageURL(imageURL)
      .then((url) => setUrl(url))
      .catch((err) => console.log("error ", err));
  }, []);

  return (
    <Col xs={12} md={4} lg={4} className="mb-3">
      <Card
        style={{ borderRadius: "30px", overflow: "hidden", margin: "20px" }}>
        <Card.Img variant="top" src={url} style={{ height: "250px" }} />
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
          <Card.Text>
            This book has a title <b>{Name}</b> By <b>{userDisplayName}</b> and
            this book is sold By <b>{userDisplayName}</b> and this book cost is
            Rs.<b>{price}</b>
          </Card.Text>
          <Button
            onClick={(e) => navigate(link)}
            variant="primary"
            style={{
              width: "100%",
            }}>
            View
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BookCard;
