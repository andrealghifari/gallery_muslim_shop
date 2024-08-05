import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SidebarMenu from "../../../components/SidebarMenu";

const Dashboard = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userData = Cookies.get("user");
    setUser(JSON.parse(userData));
  }, []);
  return (
    <div className="container wrapper-authenticated">
      <div className="row">
        <SidebarMenu/>
        <div className="card card-dashboard border-0 rounded shadow-lg">
          <div className="card-header">Dashboard</div>
          <div className="card-body">
            Selamat datang di Dashboard Gallery Muslim,{" "}
            <strong>{user.name}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
