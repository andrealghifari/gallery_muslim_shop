import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import SidebarMenu from "../../../components/SidebarMenu";
import { useState } from "react";
import extend_image from "../../../assets/goods.png";
import api from "../../../services/api";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import imgArrowLeft from "../../../assets/arrow-left-2.png";

const BarangCreate = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [validate, setValidate] = useState([]);
  const navigate = useNavigate();
  const getErrorMessage = (field) => {
    const error = validate.find((error) => error.path === field);
    return error ? error.msg : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(supplierCode);
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    if (token) {
      api
        .post("/api/admin/barang", {
          name: name,
          type: type,
          quantity: quantity,
          supplier_code: supplierCode,
        })
        .then((response) => {
          navigate("/admin/barang", {state: {createdBarang : `Barang ${name} has created!`}});
        })
        .catch((error) => {
          console.error("There's an error: ", error.response.data);
          setValidate(error.response.data.error);
        });
    }
  };
  console.log(validate);

  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu></SidebarMenu>
        <div className="card card-dashboard border-0 rounded shadow-lg">
          <div className="card-header fw-bold">Input Barang</div>
          <div className="card-body card-body-barang">
            <div className="card-body-icon">
              <Link to={"/admin/barang"}>
                <img src={imgArrowLeft} alt="" />
              </Link>
            </div>
            <div className="card-body-content">
              <img src={extend_image} alt="goods" style={{ width: "230px" }} />
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
                  label="Nama Barang"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!getErrorMessage("name")}
                  helperText={getErrorMessage("name")}
                />
                <TextField
                  id="quantity"
                  label="Jumlah Barang"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  error={!!getErrorMessage("quantity")}
                  helperText={getErrorMessage("quantity")}
                />
                <TextField
                  id="type"
                  label="Tipe Barang"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  error={!!getErrorMessage("type")}
                  helperText={getErrorMessage("type")}
                />
                <FormControl
                  sx={{ m: 1, width: "35ch" }}
                  error={!!getErrorMessage("supplier_code")}
                >
                  <InputLabel id="supplier-label">Supplier</InputLabel>
                  <Select
                    labelId="supplier-label"
                    id="supplier"
                    label="Supplier"
                    value={supplierCode}
                    onChange={(e) => setSupplierCode(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                  <FormHelperText>
                    {getErrorMessage("supplier_code")}
                  </FormHelperText>
                </FormControl>
                <Button
                  sx={{ m: 1, width: "42ch" }}
                  variant="contained"
                  type="submit"
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

export default BarangCreate;
