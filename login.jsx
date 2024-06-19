export default Home;

import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "../App.css";

function Login() {
  const navigate = useNavigate();
  const logUser = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        getAuth(),
        e.target.email.value,
        e.target.pass.value
      );
      navigate("/");
    } catch (except) {
      alert("OOOpsy..\nErrros is: " + except.code);
    }
  };
  return (
    <form onSubmit={logUser} className="loginForm">
      <section>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required />
      </section>
      <section>
        <label htmlFor="pass">Password</label>
        <input type="password" name="pass" required />
      </section>
      <section>
        <input type="reset" value="Clear fields" />
        <input type="submit" value="Login" />
      </section>
      <a href="/signup">Don't have an account? Sign Up</a>
    </form>
  );
}

