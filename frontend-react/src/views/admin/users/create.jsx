import { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UsersCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    api
      .post("/api/admin/users/", {
        email: email,
        name: name,
        role: role,
        password: password,
      })
      .then((response) => {
        navigate("/admin/users", { state: { createdUser: name } });
      })
      .catch((error) => {
        console.log(error);
        setValidate(error.response.data);
      });
  };
  return (
    <div className="mb-4 bg-light shadow-sm rounded-3 wrapper">
      <div className="container-fluid py-5">
        <div
          className="logo-toko"
          style={{
            width: "420px",
            position: "relative",
            backgroundColor: "orange",
            color: "#FFFF",
            fontSize: "3rem",
            fontWeight: "800",
            border: ".3rem solid black",
            borderRadius: "3rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <img
            src={`/img/man.png`}
            alt=""
            style={{ scale: ".7", marginRight: "-20px", marginTop: "-10px" }}
          />{" "}
          <strong>Gallery Muslim</strong>
        </div>
        <h3>Create New User</h3>

        <hr />
        <div className="card border-0 rounded shadow-lg">
          <div className="card-body">
            {validate.message && (
              <div
                className="alert alert-danger mt-4 p-2"
                style={{ color: "#FF0000", textAlign: "center" }}
              >
                {validate.message}
              </div>
            )}
            {validate.error && (
              <div
                className="alert alert-danger mt-2"
                style={{ color: "#FF0000", textAlign: "justify", justifyContent : "center"}}
              >
                {validate.error.map((eachError, index) => (
                  <li key={index}> {eachError.msg} </li>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label className="mb-1 fw-bold">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control "
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group ">
                    <label className="mb-1 fw-bold">User Role</label>
                    <input
                      id="role"
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-control"
                      placeholder="User Role"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group ">
                    <label className="mb-1 fw-bold">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group ">
                    <label className="mb-1 fw-bold">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCreate;
