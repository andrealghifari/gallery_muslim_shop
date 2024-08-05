import { Box, Button, TextField } from "@mui/material";
import supplierIcon from "../../../assets/supplier.png";
import imgArrowLeft from "../../../assets/arrow-left-2.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Cookies from "js-cookie";

const SupplierCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [validate, setValidate] = useState([]);
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      api
        .post(`/api/admin/supplier`, {
          name: name,
          location: location,
          phone_number: contact,
        })
        .then((response) => {
          console.log(response);
          navigate("/admin/supplier", {state : {createdSupplier : response.data.message}})
        })
        .catch((error) => {
          console.error(error);
          setValidate(error.response.data.error);
        });
    }
  };
  const errorGetMessage = (field) => {
    const checkError = validate.find((error) => error.path === field);
    return checkError ? checkError.msg : "";
  };
  console.log(validate);

  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        <div className="card card-dashboard rounded shadow-lg border-0">
          <div className="card-header">Create Supplier</div>
          <div className="card-body card-body-supplier">
            <div className="card-body-icon">
              <Link>
                <img src={imgArrowLeft} alt="" />
              </Link>
            </div>
            <div className="card-body-content">
              <img src={supplierIcon} alt="" />
              <Box
                component={"form"}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "35ch" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
                noValidate
                onSubmit={handleSubmit}
              >
                <TextField
                  id="name"
                  label="Supplier Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errorGetMessage("name")}
                  helperText={errorGetMessage("name")}
                ></TextField>

                <TextField
                  id="location"
                  label="Supplier Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  error={!!errorGetMessage("location")}
                  helperText={errorGetMessage("location")}
                ></TextField>
                <TextField
                  id="phone_number"
                  label="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  error={!!errorGetMessage("phone_number")}
                  helperText={errorGetMessage("phone_number")}
                ></TextField>
                <Button
                  sx={{ margin: 1, width: "42ch" }}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupplierCreate;
