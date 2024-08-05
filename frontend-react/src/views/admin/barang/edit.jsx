import SidebarMenu from "../../../components/SidebarMenu";
import imgBarang from "../../../assets/goods.png";
import imgArrowLeft from "../../../assets/arrow-left-2.png";

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
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const BarangEdit = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [value, setValue] = useState(0);
  const [validate, setValidate] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const getErrorMessage = (field) => {
    const error = validate.find((eachError) => eachError.path === field);
    return error ? error.msg : "";
  };
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  const fetchDetailBarang = async () => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    if (api) {
      await api
        .post(`/api/admin/barang/${id}`)
        .then((response) => {
          console.log(response);
          setName(response.data.data.name);
          setQuantity(response.data.data.quantity);
          setType(response.data.data.type);
          setValue(response.data.data.value);
        })
        .catch((error) =>
          console.error("There's an error while fetching data Barang: ", error)
        );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    if (api) {
      api
        .put(`/api/admin/barang/${id}`, {
          name: name,
          quantity: quantity,
          type: type,
          supplier_code: supplierCode,
          value: value,
        })
        .then((response) => {
          navigate("/admin/barang", {
            state: { updatedBarang: `Barang ${name} has updated!` },
          });
        })
        .catch((error) => {
          console.error("There's an error: ", error.response.data);
          setValidate(error.response.data.error);
        });
    }
  };

  useEffect(() => {
    fetchDetailBarang();
  }, []);
  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu></SidebarMenu>
        <div className="card card-dashboard rounded border-0 shadow-lg">
          <div className="card-header fw-bold">Edit Data Barang</div>
          <div className="card-body card-body-barang">
            <div className="card-body-icon">
              {" "}
              <Link to={"/admin/barang"}>
                <img src={imgArrowLeft} alt="" />
              </Link>
            </div>
            <div className="card-body-content">
              <img src={imgBarang} alt="goods" style={{ width: "230px" }} />
              <Box
                onSubmit={handleSubmit}
                component={"form"}
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "35ch" },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
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
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  error={!!getErrorMessage("quantity")}
                  helperText={getErrorMessage("quantity")}
                />
                <TextField
                  id="type"
                  label="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  error={!!getErrorMessage("type")}
                  helperText={getErrorMessage("type")}
                />
                <TextField
                  id="value"
                  label="Harga modal/pc"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  error={!!getErrorMessage("value")}
                  helperText={getErrorMessage("value")}
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

export default BarangEdit;
