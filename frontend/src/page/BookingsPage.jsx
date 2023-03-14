import axios from "axios";
import React, { useEffect, useState } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then(({ data }) => setBookings(data));
  }, []);

  return (
    <div>
      {bookings.map((booking) => (
        <div>{booking.price}</div>
      ))}
    </div>
  );
};

export default BookingsPage;
