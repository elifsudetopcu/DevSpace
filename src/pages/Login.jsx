import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  getUsers,
  saveCurrentUser
} from "../utils/localStorage";


function Login() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [error, setError] =
    useState("");


  function handleSubmit(event) {

    event.preventDefault();

    setError("");


    const users =
      getUsers();


    const normalizedEmail =
      email.trim().toLowerCase();


    const user =
      users.find(
        (item) =>
          item.email === normalizedEmail &&
          item.password === password
      );


    if (!user) {

      setError(
        "Email or password is incorrect."
      );

      return;
    }


    saveCurrentUser(user);

    navigate("/");

  }


  return (

    <main>

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-4">

            <div className="card border-0 shadow-sm p-4">

              <h2 className="fw-bold mb-2">
                Welcome Back
              </h2>

              <p className="text-secondary mb-4">
                Login to your DevSpace account.
              </p>


              {error && (

                <div className="alert alert-danger">
                  {error}
                </div>

              )}


              <form
                onSubmit={handleSubmit}
              >

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>


                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>


              <p className="text-secondary text-center mt-4 mb-0">

                Don't have an account?{" "}

                <Link to="/register">
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}

export default Login;