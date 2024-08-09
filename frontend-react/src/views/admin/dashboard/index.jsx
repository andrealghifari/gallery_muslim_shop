import { useEffect, useState } from "react";
import SidebarMenu from "../../../components/SidebarMenu";
import Cookies from "js-cookie";
import GallerySlider from "../../customer/gallery";


const Dashboard = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const data = JSON.parse(Cookies.get("user"));
    setUser(data);
  }, []);

  return (
    <div className="container wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        {user.role === "Admin" || user.role === "Supplier" ? (
          <div className="card card-dashboard border-0 rounded shadow-lg">
            <div className="card-header">Dashboard</div>
            <div className="card-body">
              <span>
                Welcome to Dashboard Gallery Muslim,{" "}
                <strong>{user.name}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="card card-customer border-0 shadow-lg rounded">
            <div className="card-header">
              <span>Dashboard</span>
            </div>
            <div className="card-body" style={{ position: "relative" }}>
              <p>Welcome <strong>{user.name}</strong>,</p>
              Discover Our Latest Products!
              <div className="carousel-bx">
                <GallerySlider/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
