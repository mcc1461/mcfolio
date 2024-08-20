import React from "react";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = (e) => {
    e.preventDefault();
    console.log("Register user");
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    console.log(name, email, password);
    console.log("user", user);
  };

  return (
    <div className="grid grid-cols-1 text-4xl text-center text-blue-900 bg-blue-300">
      <form onSubmit={registerUser} className="grid grid-cols-1">
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          className="pl-3"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="pl-3"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="pl-3"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
