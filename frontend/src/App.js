import axios from "axios";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePage from "./page/ProfilePage";
import AccountPage from "./page/AccountPage";
import Home from "./page/Home";
import Login from "./page/Login";
import PlacesPage from "./page/PlacesPage";
import Register from "./page/Register";
import PlacesFormPage from "./page/PlacesFormPage";
import DetailPlacePage from "./page/DetailPlacePage";
import BookingsPage from "./page/BookingsPage";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountPage />}>
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
        </Route>
        <Route path="/place/:id" element={<DetailPlacePage />} />
      </Route>
    </Routes>
  );
}

export default App;
