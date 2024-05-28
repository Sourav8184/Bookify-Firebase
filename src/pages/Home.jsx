// React
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import CardGroup from "react-bootstrap/CardGroup";

// import Custome Hook
import { useFirebase } from "../context/FirebaseContext";

//Home Component
function Home() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();
  console.log(firebase);

  useEffect(() => {
    firebase.listAllBooks().then((books) => {
      setBooks(books.docs);
    });
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book) => (
          <BookCard key={book.id} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
