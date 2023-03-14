import Booking from "../model/Booking.js";
import jwt from "jsonwebtoken";
export const bookingPlace = async (req, res) => {
  const { access_token } = req.cookies;
  const { checkIn, checkOut, numberOfGuests, name, phone, place, price } =
    req.body;

  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    const bookingDoc = await Booking.create({
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place,
      price,
      user: data.id,
    });
    res.json(bookingDoc);
  });
};

export const getBookings = async (req, res) => {
  const { access_token } = req.cookies;

  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    const { id } = data;
    const bookingsData = await Booking.find({ user: id }).populate("place");
    res.json(bookingsData);
  });
};
