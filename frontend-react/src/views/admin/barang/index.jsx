import { Link, useLocation } from "react-router-dom";
import SidebarMenu from "../../../components/SidebarMenu";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import Cookies from "js-cookie";
import {format} from "date-fns";
//React Material UI Libs
import { IconButton, Box, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BarangIndex = () => {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [alert, setAlert] = useState(false);
  //Get data barang
  useEffect(() => {
    fetchDataBarangs();
  }, []);

  //Get update or crete barang wiped out
  useEffect(() => {
    if (
      (location.state && location.state.updatedBarang) ||
      (location.state && location.state.createdBarang)
    ) {
      setAlert(true);
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  //Delete barang wiped out
  useEffect(() => {
    if (deleted) {
      setDeleted(true);
      const timer = setTimeout(() => {
        setDeleted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [deleted]);
  const formatRupiah = (amount) => {
 
    if (amount == null) amount = 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  const [columns] = useState([
    { field: "name", headerName: "Nama Barang", width: 150 , headerAlign : "center", align : "center"},
    { field: "type", headerName: "Tipe Barang", width: 150 , headerAlign : "center", align : "center"},
    { field: "quantity", headerName: "Jumlah Stock", width: 150 , headerAlign : "center", align : "right"},
    {
      field: "value",
      headerName: "Harga Jual / Modal",
      width: 150,
      valueFormatter: (value) => {
        return formatRupiah(value);
      }, headerAlign : "center", align : "right"
    },
    { field: "supplier_code", headerName: "Supplier Code", width: 150 , headerAlign : "center", align : "center"},
    { field: "created_at", headerName: "Supplied Date", width: 150 , headerAlign : "center", align : "center",
      valueFormatter : (value) => {
        return format(new Date(value), "yyyy-MM-dd hh:mm a") 
      }
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign : "center",
      align : "center",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton
            component={Link}
            to={`/admin/barang/edit/${params.row.id}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteData(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ]);
  const deleteData = async (id) => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;

    if (token) {
      await api.delete(`/api/admin/barang/${id}`).then((response) => {
        fetchDataBarangs();
        setDeleted(true);
        setDeletedMessage(response.data.message);
      });
    } else {
      console.error("Token is not available");
    }
  };

  const fetchDataBarangs = async () => {
    const token = Cookies.get("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = token;
      await api
        .get("/api/admin/barang")
        .then((response) => {
          setRows(response.data.data);
        })
        .catch((error) => {
          console.error(error.response);
        });
    } else {
      console.error("Token is invalid");
    }
  };
  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        <div className="card card-dashboard border-0 rounded shadow-lg">
          <div className="card-header">
            <span>Data Lengkap Barang</span>
          </div>

          <div className="card-body">
            {deleted && (
              <Snackbar open>
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                  {deletedMessage}
                </Alert>
              </Snackbar>
            )}
            <div className="info-wrapper">
              <div className="btn-wrapper">
                <Link
                  to={"/admin/barang/create"}
                  className="btn btn-sm btn-success rounded"
                >
                  Create
                </Link>
              </div>

              {alert && (
                <div>
                  {location.state && (
                    <Snackbar open>
                      <Alert
                        severity={
                          location.state.createdBarang ? "success" : "info"
                        }
                        sx={{ width: "100%" }}
                        variant="filled"
                      >
                        {location.state.updatedBarang ||
                          location.state.createdBarang}
                      </Alert>
                    </Snackbar>
                  )}
                </div>
              )}
            </div>
            <Box sx={{ height: 400, width: 580 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangIndex;
