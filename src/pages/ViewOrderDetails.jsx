import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

function ViewOrderDetails() {
  const [orders, setOrders] = useState([]);
  const firebase = useFirebase();
  const params = useParams();

  useEffect(() => {
    firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Order</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            className="container mt-5"
            style={{
              border: "1px solid black",
              borderRadius: "20px",
              padding: "20px",
            }}>
            <h4>Order By: {data.displayName}</h4>
            <h4>Order Qyt: {data.qyt}</h4>
            <h4>Emai: {data.email}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrderDetails;
