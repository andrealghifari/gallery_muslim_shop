//import useContext dan menggunakannya untuk cek status otentikasi
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";
import Dashboard from "../admin/dashboard";
import UserIndex from "../admin/users";
import UsersEdit from "../admin/users/edit";
import UsersCreate from "../admin/users/create";
import BarangIndex from "../admin/barang";
import BarangCreate from "../admin/barang/create";
import BarangEdit from "../admin/barang/edit";
import SupplierIndex from "../admin/supplier";
import TransaksiIndex from "../admin/transaksi";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={"/admin/dashboard"} replace/> : <Home/>}></Route>
     <Route path="/register" element={isAuthenticated ? <Navigate to={"/admin/dashboard"} replace/> : <Register/>}></Route>
     <Route path="/login" element={isAuthenticated ? <Navigate to={"/admin/dashboard"} replace/> : <Login/>}></Route>
     <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard/> : <Navigate to={"/login"} replace/>}></Route>

     {/* PROTECTED ROUTES! */}
     <Route path="/admin/users" element={isAuthenticated ? <UserIndex/> : <Navigate to={"/login" } replace/>}></Route>
     <Route path="/admin/users/edit/:id" element = {isAuthenticated ? <UsersEdit/> : <Navigate to={"/login"} replace/> }></Route>
     <Route path="/admin/users/create" element={isAuthenticated  ? <UsersCreate/> : <Navigate to={"/login"} replace/>}></Route>
     <Route path="/admin/barang/" element={isAuthenticated ? <BarangIndex/> : <Navigate to={"/login"} replace/>}></Route>
     <Route path="/admin/barang/create" element={isAuthenticated ? <BarangCreate/> : <Navigate to={"/login"} replace/>}></Route>
     <Route path="/admin/barang/edit/:id" element={isAuthenticated ? <BarangEdit/> : <Navigate to={"/login"} replace/>}></Route>
     <Route path="/admin/supplier" element = {isAuthenticated ? <SupplierIndex/> : <Navigate to={"/login"} replace/>}></Route>
     <Route path="/admin/transaksi" element={isAuthenticated ? <TransaksiIndex/> : <Navigate to={"/login"} replace/>}></Route>
    </Routes>
  );
};
export default AppRoutes;
