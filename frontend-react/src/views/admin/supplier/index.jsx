import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../../services/api";
import SidebarMenu from "../../../components/SidebarMenu";

const SupplierIndex = () => {
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    { field: "name", headerName: "Supplier Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    {field : "action", headerName : "Action", renderCell: (params) => (
      <div>
        <IconButton color="primary">
          <EditIcon></EditIcon>
        </IconButton>
        <IconButton color="error">
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </div>
    )}
  ]);
  useEffect(() => {
    fetchDataSupplier();
  }, []);
  const fetchDataSupplier = async () => {
    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = token;
    await api
      .get("api/admin/supplier")
      .then((response) => {
        console.log(response.data.data);
        setRows(response.data.data);
      })
      .catch((errors) => {
        console.error(errors);
      });
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarFilterButton/>
        <GridToolbarExport csvOptions={{ fileName: "Data Suppliers" }} />
      </GridToolbarContainer>
    );
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
            <div className="info-wrapper">
              <div className="btn-wrapper">
                <Link
                  to={"/admin/supplier/create"}
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
