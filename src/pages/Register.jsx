import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  getUsers,
  saveUsers,
  saveCurrentUser
} from "../utils/localStorage";


function Register() {

  const navigate =
    useNavigate();


  const [name, setName] =
    useState("");


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


    const existingUser =
      users.find(
        (user) =>
          user.email ===
          normalizedEmail
      );


    if (existingUser) {

      setError(
        "An account with this email already exists."
      );

      return;
    }


    const newUser = {

      id: Date.now(),

      name:
        name.trim(),

      email:
        normalizedEmail,

      password

    };


    saveUsers([
      ...users,
      newUser
    ]);


    saveCurrentUser(
      newUser
    );


    navigate("/");

  }


  return (

    <main>

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-4">

            <div className="card border-0 shadow-sm p-4">

              <h2 className="fw-bold mb-2">
                Create Account
              </h2>

              <p className="text-secondary mb-4">
                Start managing your projects with DevSpace.
              </p>


              {error && (

                <div className="alert alert-danger">
                  {error}
                </div>

              )}


              <form
                onSubmit={handleSubmit}
              >

                {/* NAME */}

                <div className="mb-3">

                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    required
                  />

                </div>


                {/* EMAIL */}

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


                {/* PASSWORD */}

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
                  Create Account
                </button>

              </form>


              <p className="text-secondary text-center mt-4 mb-0">

                Already have an account?{" "}

                <Link to="/login">
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );
}

export default Register;