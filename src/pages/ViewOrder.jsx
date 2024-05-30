import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import BookCard from "../components/BookCard";

function ViewOrder() {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    if (firebase.isLoggedin) {
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs))
        .catch((err) => console.log("error ", err));
    }
    // console.log("books -> ", books);
  }, [firebase]);

  if (!firebase.isLoggedin) return <h1>Please Log in</h1>;
  return (
    <div
      className="container mt-5"
      style={{ display: "flex", flexWrap: "wrap" }}>
      {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}

export default ViewOrder;
