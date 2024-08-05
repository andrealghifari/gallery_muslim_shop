import { useEffect, useState } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import api from "../../../services/api";
import { Link, useLocation } from "react-router-dom";
const UserIndex = () => {
  const [userData, setUserData] = useState([]);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [userDeleted, setUserDeleted] = useState("");
  //   const [showModals, setShowModals] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchDataUsers();
  }, []);
  useEffect(() => {
    if (
      (location.state && location.state.updatedUser) ||
      (location.state && location.state.createdUser)
    ) {
      setShowFlashMessage(true);      
      const timer = setTimeout(() => {
        setShowFlashMessage(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if(deleteMessage){
      setDeleteMessage(true);
      const timer = setTimeout(() => {
        setDeleteMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage])

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    if (token) {
      await api
        .delete(`/api/admin/users/${id}`)
        .then((response) => {
          fetchDataUsers();
          setDeleteMessage(true);
          setUserDeleted(response.data.data.message);
        })
        .catch((error) => console.log(error));
    } else {
      console.error("Token is not available");
    }
  };
  const fetchDataUsers = async () => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      try {
        const response = await api.get("/api/admin/users");
        setUserData(response.data.data);
      } catch (error) {
        console.error("There's an error while fetching data users!", error);
      }
    } else {
      console.error("Token is not available");
    }
  };

  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        <div className="card card-dashboard border-0 rounded shadow-lg">
          <div className="card-header">
            <span>User Profile</span>
          </div>

          <div className="card-body">
            {deleteMessage && (
              <div className="alert alert-danger mt-4 rounded">
                User <strong>{userDeleted}</strong> has deleted!
              </div>
            )}
            <div className="info-wrapper">
              <div className="btn-wrapper">
                <Link
                  to={"/admin/users/create"}
                  className="btn btn-sm btn-success rounded"
                >
                  Create
                </Link>
              </div>
              <span>
                {" "}
                {showFlashMessage && (
                  <div
                    className="alert alert-info"
                    style={{ width: "300px", marginBottom: "0px" }}
                  >
                    {" "}
                    {location.state.updatedUser && (
                      <span>
                        User <strong>{location.state.updatedUser}</strong> has updated!
                      </span>
                    )}
                    {location.state.createdUser && (
                      <span>
                        User <strong>{location.state.createdUser}</strong> has created!
                      </span>
                    )}
                  </div>
                )}
              </span>
            </div>
            <table className="table table-bordered table-responsive-md">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role}</td>
                      <td>
                        <span className="btn-wrapper">
                          <Link
                            to={`/admin/users/edit/${data.id}`}
                            className="btn btn-warning btn-sm rounded"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger btn-sm rounded"
                            onClick={() => handleDelete(data.id)}
                          >
                            Delete
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIndex;
