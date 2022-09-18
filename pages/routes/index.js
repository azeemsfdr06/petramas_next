import react, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
// import { useStateValue } from '../../services/state/State';
import Layout from '../../components/Layout';
import { getSessionFromLocalStorage, Store } from '../../services/Store';
import { useState as UseState } from '@hookstate/core';
import { getGPS, dellGPS } from '../../services/api/apiManager';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip, IconButton } from '@mui/material';
import Listing from './Listing';
import moment from 'moment';
import { settings as s } from '../../services/settings'
import AddEditGPS from './AddEditGPS';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';


const Route = () => {
  const columns = [
    {
      field: "DNI",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >DNI</Typography>
      ),
    },
    {
      field: "Driver",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Driver</Typography>
      ),
    },
    {
      field: "Vehicle",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Vehicle</Typography>
      ),
    },
    {
      field: "Route",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Route</Typography>
      ),
    },
    {
      field: "Client",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Client</Typography>
      ),
    },
    {
      field: "location_name",
      width: 400,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >location</Typography>
      ),
    },
    {
      field: "timestamp",
      width: 200,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Date</Typography>
      ),
      renderCell: (params) => (
        <p>{moment(params.value).format("LLLL")}</p>
      ),
    },
    {
      field: "photo",
      width: 100,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Photo</Typography>
      ),
      renderCell: (params) => (
        // {console.log(s. +"/"+params.value)}
        <a href={s.baseUrl + "/" + params.value} target="_blank"> Open Image</a>
      ),
    },
    {
      field: "Action",
      width: 150,
      filter: true,
      sort: true,
      renderHeader: () => (
        <Typography >Action</Typography>
      ),
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton disabled={false}>
              <span
                onClick={() => {
                  console.log(params.row)
                  setToEdit(params.row)
                  setType("Edit")
                }}
                style={{ cursor: "pointer" }}
              >
                <EditIcon />
              </span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add">
            <IconButton disabled={false}>
              <span
                onClick={() => {
                  setToEdit(null)
                  setType("Add")
                }}
                style={{ cursor: "pointer" }}
              >
                <AddIcon />
              </span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton disabled={false}>
              <span
                onClick={() => {
                  swal({
                    title: "Delete!",
                    text: "DO You Want TO DELETE The GPS?",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if(willDelete)
                    {
                      swal({
                        title: "Deleted!",
                        text: "GPS DATA DELETED!",
                        icon: "success",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if(willDelete)
                        {
                          deleteGPS(params.row.id)
                        }
                      });
    
                    }
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </span>
            </IconButton>
          </Tooltip>
        </>

      ),
    },
  ];

  const state = UseState(Store);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = state.user.get();
  const [rows, setRows] = useState([]);
  const [toEdit, setToEdit] = useState(null);
  const [type, setType] = useState("");
  const routeList = async () => {
    await getGPS().then(async (response) => {
      setRoutes(response.data)
      setLoading(false)
      setRows(routes)
    }).catch((err) => {
      console.log(err)
    })
  }
  const deleteGPS = async (id)=>{
    console.log(id)
    await dellGPS({GPS_id:id}).then((res)=>{
      if(res.status == 200){
        swal("Deleted!", "Deleted The GPS", "Success");
        window.location.reload()
      }
    })
  }
  useEffect(() => {
    getSessionFromLocalStorage()
    routeList()
  }, [])

  return (
    <>
      {
        user &&
        <Layout user={user}>
          {
            type != "" &&
            <AddEditGPS
              type={type}
              setType={setType}
              toEdit={toEdit}
              setToEdit={setToEdit}
              user={user}
              
            />
          }

          {type == "" && !loading && <Listing
            rows={routes}
            columns={columns}
          >
          </Listing>
          }
        </Layout>
      }
    </>
  )
}

export default Route
