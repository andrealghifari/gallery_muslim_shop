import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../services/api";
import SidebarMenu from "../../components/SidebarMenu";

const SupplierIndex = () => {
  const location = useLocation();
  const [checkUser, setCheckUser] = useState({});
  const [alert, setAlert] = useState(false);
  const [rows, setRows] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setCheckUser(JSON.parse(Cookies.get("user")));
    fetchDataSupplier();
  }, []);

  useEffect(() => {
    setColumns([
      { field: "name", headerName: "Supplier Name", width: 150 },
      { field: "location", headerName: "Location", width: 150 },
      { field: "phone_number", headerName: "Phone Number", width: 150 },
      {
        field: "action",
        headerName: "Action",
        renderCell: (params) =>
          checkUser.role == "Admin" ? (
            <div>
              <IconButton
                color="primary"
                component={Link}
                to={`/supplier/edit/${params.row.id}`}
              >
                <EditIcon></EditIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={() => deleteData(params.row.id)}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </div>
          ) : (
            <div style={{ fontStyle: "italic" }}>Disabled</div>
          ),
      },
    ]);
  }, [checkUser]);

  useEffect(() => {
    if (
      (location.state && location.state.createdSupplier) ||
      (location.state && location.state.updatedSupplier)
    ) {
      setAlert(true);
      const timer = setTimeout(() => {
        setAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if (deleted) {
      setDeleted(true);
      const timer = setTimeout(() => {
        setDeleted(false);
      }, 5000);
      //cleanup timer
      return () => clearTimeout(timer);
    }
  }, [deleted]);

  const fetchDataSupplier = async () => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    await api
      .get("api/supplier")
      .then((response) => {
        setRows(response.data.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
        <GridToolbarExport csvOptions={{ fileName: "Data Suppliers" }} />
      </GridToolbarContainer>
    );
  };
  const deleteData = async (id) => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    if (token) {
      await api
        .delete(`/api/supplier/${id}`)
        .then((response) => {
          setDeleted(true);
          setDeletedMessage(response.data.message);
          fetchDataSupplier();
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="container mb-5 mt-5 wrapper-authenticated">
      <div className="row">
        <SidebarMenu />
        <div className="card card-dashboard border-0 shadow-lg rounded">
          <div className="card-header">
            <span>Data Supplier</span>
          </div>
          <div className="card-body">
            {alert && (
              <Snackbar open>
                <Alert
                  variant="filled"
                  severity={location.state.createdSupplier ? "success" : "info"}
                >
                  {location.state.createdSupplier ||
                    location.state.updatedSupplier}
                </Alert>
              </Snackbar>
            )}
            {deleted && (
              <Snackbar open>
                <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
                  {deletedMessage}
                </Alert>
              </Snackbar>
            )}
            {}
            <div className="info-wrapper">
              <div className="btn-wrapper">
                <Link
                  to={"/supplier/create"}
                  className="btn btn-success btn-sm"
                >
                  Create
                </Link>
              </div>
            </div>
            <Box sx={{ width: 580, height: 350 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                slots={{ toolbar: CustomToolbar }}
              />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierIndex;
