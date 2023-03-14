import jwt from "jsonwebtoken";
import Place from "../model/Place.js";

export const addNewPlace = async (req, res) => {
  const { access_token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    const placeDoc = await Place.create({
      owner: data.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
};

export const getPlaces = async (req, res) => {
  const { access_token } = req.cookies;
  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    const { id } = data;
    const placeData = await Place.find({ owner: id });
    res.json(placeData);
  });
};
export const getPlace = async (req, res) => {
  const { id } = req.params;
  const placeData = await Place.findById({ _id: id });
  res.json(placeData);
};
export const updatePlace = async (req, res) => {
  const { access_token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    const placeData = await Place.findById(id);
    if (data.id === placeData.owner.toString()) {
      placeData.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeData.save();
      res.json("Successfully");
    }
  });
};
export const deletePlace = async (req, res) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

  jwt.verify(access_token, "jwtSecret", {}, async (err, data) => {
    if (err) return res.status(403).json("Token is not valid");
    await Place.deleteOne({ _id: id });
    res.json("deleted");
  });
};

export const getPlacesInHome = async (req, res) => {
  const allPlacesData = await Place.find();
  res.json(allPlacesData);
};
