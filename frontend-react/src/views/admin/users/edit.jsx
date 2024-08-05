import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UsersEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;

    await api
      .put(`/api/admin/users/${id}`, {
        name: name,
        email: email,
        role: role,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/admin/users", { state: { updatedUser: name } });
      })
      .catch((error) => {
        console.log(error);
        setValidate(error.response.data);
      });
  };

  useEffect(() => {
    const fetchDataUsers = async () => {
      const token = Cookies.get("token");
      api.defaults.headers.common["Authorization"] = token;
      await api
        .post(`/api/admin/users/${id}`)
        .then((response) => {
          setName(response.data.data.name);
          setEmail(response.data.data.email);
          setRole(response.data.data.role);
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    fetchDataUsers();
  }, []);
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
        <h3>Edit User</h3>

        <hr />
        <div className="card border-0 rounded shadow-lg">
          <div className="card-body">
            <form>
              {validate.error && (
                <div
                  className="alert alert-danger mb-4"
                  style={{ color: "#FF0000", textAlign: "justify", justifyContent : "center"}}
                  >
                  {validate.error.map((eachError, index) => (
                    <li key={index}>{eachError.msg}</li>
                  ))}
                </div>
              )}
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
                onClick={handleUpdate}
                type="submit"
                className="btn btn-info text-light"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersEdit;
