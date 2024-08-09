import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//diperlukan ketika logout
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SidebarMenu = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    setUser(JSON.parse(Cookies.get("user")));
  }, []);

  return (
    <div className="card card-sidebar card-menu border-0 shadow-lg rounded">
      <div className="card-header">Main Menu</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to={"/admin/dashboard"}
            className="list-group-item"
            style={{ backgroundColor: "grey", color: "#FFFF" }}
          >
            Dashboard
          </Link>
          {user.role == "Admin" && (
            <span>
              <Link to={"/admin/users"} className="list-group-item">
                {" "}
                User Profile
              </Link>
              <Link to={"/admin/barang"} className="list-group-item">
                {" "}
                Data Barang
              </Link>
              <Link to={"/admin/transaksi"} className="list-group-item">
                Data Transaksi Harian
              </Link>
              <Link to={"/supplier"} className="list-group-item">
                Supplier Barang
              </Link>
            </span>
          )}
          {user.role == "Supplier" && (
            <span>
              <Link to={"/supplier"} className="list-group-item">
                Supplier Barang
              </Link>
            </span>
          )}
          {user.role == "Customer" && (
            <span>
              <Link to={"/customer/order"} className="list-group-item">
                Order Products
              </Link>             
            </span>
          )}
          <a
            onClick={logout}
            className="list-group-item"
            style={{
              cursor: "pointer",
              backgroundColor: "red",
              color: "#FFFF",
            }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
