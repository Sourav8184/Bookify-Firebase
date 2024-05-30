// React
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

// import Custome Hook
import { useFirebase } from "../context/FirebaseContext";

//Home Component
function Home() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();
  // console.log(firebase);

  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, []);
  // console.log("books id ->", books);

  if (books.length == 0)
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
    <div className="container mt-5">
      <Row className="g-4">
        <CardGroup>
          {books.map((book) => (
            <BookCard
              link={`/book/view/${book.id}`}
              key={book.id}
              bookId={book.id}
              {...book.data()}
            />
          ))}
        </CardGroup>
      </Row>
    </div>
  );
}

export default Home;
