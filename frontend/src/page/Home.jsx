import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      {places.map((place) => (
        <div>
          <img
            src={`http://localhost:5000/uploads/${place.photos[0]}`}
            alt=""
          />
          {place.title}
        </div>
      ))}
    </div>
  );
};

export default Home;
