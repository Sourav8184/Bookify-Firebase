import React from "react";
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
}) {
  const firebase = useFirebase();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    console.log("imageURL -> ", imageURL);
    firebase
      .getImageURL(imageURL)
      .then((url) => setUrl(url))
      .catch((err) => console.log("error ", err));
  }, []);

  return (
    <Card
      style={{
        width: "18rem",
        margin: "10px",
        borderRadius: "20px",
        overflow: "hidden",
      }}>
      <Card.Img variant="top" src={url} style={{ height: "200px" }} />
      <Card.Body>
        <Card.Title>{Name}</Card.Title>
        <Card.Text>
          This book has a title <b>{Name}</b> By <b>{userDisplayName}</b> and
          this book is sold By <b>{userDisplayName}</b> and this book cost is
          Rs.<b>{price}</b>
        </Card.Text>
        <Button
          variant="primary"
          style={{
            width: "100%",
          }}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
