// React
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import Custom hook
import { useFirebase } from "../context/FirebaseContext";

// React Bootstrap
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

// Detail component
function Details() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const { bookId } = useParams();
  const [qyt, setQyt] = useState(1);

  const firebase = useFirebase();

  useEffect(() => {
    firebase
      .getBookById(bookId)
      .then((book) => setData(book.data()))
      .catch((err) => console.log("error ", err));
  }, [bookId]);

  console.log(data);

  useEffect(() => {
    if (data) {
      const imageUrl = data.imageURL;
      firebase.getImageURL(imageUrl).then((url) => setUrl(url));
    }
  }, [data]);

  const placeOrder = async () => {
    const resutl = await firebase.placeOrder(bookId, qyt);
    console.log("order placed -> ", resutl);
  };

  if (data == null)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
        <Button variant="dark" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );

  return (
    <div
      className="container m-5"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        left: "250px",
      }}>
      <Card
        style={{
          width: "800px",
          borderRadius: "30px",
          overflow: "hidden",
        }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>
            <h1 style={{ textAlign: "center" }}>{data.Name}</h1>
          </Card.Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px",
            }}>
            <div>
              <Card.Title>
                <h2>Details:</h2>
              </Card.Title>
              <Card.Title>Book ISBN no: {data.isbn}</Card.Title>
              <Card.Title>Book Price: {data.price}</Card.Title>
            </div>
            <div>
              <Card.Title>
                <h2>Owner Details:</h2>
              </Card.Title>
              <Card.Title>Name: {data.userDisplayName}</Card.Title>
              <Card.Title>Email: {data.userEmail}</Card.Title>
            </div>
          </div>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              onChange={(e) => setQyt(e.target.value)}
              value={qyt}
              type="Number"
              placeholder="Enter item Quantity ..."
              min={0}
            />
          </Form.Group>

          <Button
            onClick={placeOrder}
            style={{ width: "100%" }}
            variant="success">
            Buy now
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Details;
