import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css"


function SignupForm({ signup }){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "singup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );
  
  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signup(formData);
    if(res.success) {
      navigate("/");
    } else {
      setFormErrors(res.errors);
    }
  }

  async function handleChange(e){
    const {name, value} = e.target;
    setFormData(data => ({...data, [name] : value }));
  }
  return (
      <div className="form">
        <div className="form-card">
          <h3>Signup</h3>
          <div className="form-card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null} */}
              <div className="form-group button-group">
                <button
                    type="submit"
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                > 
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default SignupForm;