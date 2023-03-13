import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={register} className="max-w-md mx-auto ">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          {err && (
            <p className="text-center font-bold text-red-500 my-1">{err}</p>
          )}
          <div className="text-center py-2 text-gray-500">
            <span>Already a member? </span>
            <Link to="/login" className="underline text-black">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
