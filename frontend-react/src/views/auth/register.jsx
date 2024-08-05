import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState([]);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    await api
      .post("/api/register", {
        email: email,
        name: name,
        password: password,
        role: role,
      })
      .then((response) => navigate("/login"))
      .catch((error) => setValidate(error.response.data));
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
        <h3>Register</h3>

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
                style={{ color: "#FF0000", textAlign: "center" }}
              >
                {validate.error.map((eachError, index) => (
                  <p key={index}> {eachError.msg} </p>
                ))}
              </div>
            )}
            <form>
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
              <button
                onClick={handleRegister}
                type="submit"
                className="btn btn-primary "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
