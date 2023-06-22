import React, {useState} from "react";
import { useNavigate } from "react-router-dom/";
import "./Form.css"


function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState([])

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors,
  );

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
  }

  async function handleChange(e) {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="form">
        <div className="form-card">
        <h3>Log In</h3>
          <div className="form-card-body">
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
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
                    autoComplete="current-password"
                    required
                />
              </div>

              {/* {formErrors.length ? <Alert type="danger" messages={formErrors} /> : null} */}

              <div className="form-group button-group">
                <button
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
  );
}

export default LoginForm;