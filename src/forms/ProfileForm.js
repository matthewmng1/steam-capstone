import React, { useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import SteamDbApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./Form.css"

function ProfileForm() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [flashMessage, setFlashMessage] = useState("")

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrors,
    "saveConfirmed=", saveConfirmed,
);

    async function handleSubmit(e){
      e.preventDefault();

      let profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

      let username = formData.username;
      let updatedUser;
      try{
        updatedUser = await SteamDbApi.update(username, profileData)
        setFlashMessage("Profile successfully updated")
        navigate("/profile");
        console.log("updated user", updatedUser)
      } catch (e) {
        console.log("catching error")
        setFormErrors(e);
        return;
      }

      setFormData(data => ({...data, password: ""}));
      setFormErrors([]);
      setSaveConfirmed(true);
      setCurrentUser(updatedUser)
    }

    function handleChange(e){
      const {name, value} = e.target;
      setFormData(data => ({
        ...data,
        [name]: value,
      }));
      setFormErrors([]);
    }

    return (
      <div className="form">
        <div className="form-card">
        <h3>Profile</h3>
        {flashMessage && <div className="flash-message" style={{color: "red"}}>{flashMessage}</div>}
          <div className="form-card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  value={currentUser.username}
                  readOnly
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
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Confirm password to save changes: </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null} */}
              <div className="form-group button-group">
                <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
}

export default ProfileForm;