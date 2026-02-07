import React from "react";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";
function Auth() {
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.Amtad6cu5WsYrZ3gC2IgGgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="logo"
        />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={classes.login_signInbutton}>Sign In</button>
        </form>
        {/* agreement */}
        <p>
          By signing in your agree to the amazon clone condition of use and
          sate.
        </p>
        {/* create account btn */}
        <button className={classes.login_registerbutton}>
          Create your Amazone Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
