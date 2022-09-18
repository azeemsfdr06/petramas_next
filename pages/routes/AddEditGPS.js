import { useEffect, useState } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Input, IconButton, getListItemSecondaryActionClassesUtilityClass } from '@mui/material'
import { getRouteNames, getVehileNames, getClientNames, saveGPSPanel, uploadImage, editGPS } from '../../services/api/apiManager'
import swal from 'sweetalert';
import moment from 'moment';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { getGridLocalization } from '@mui/x-data-grid/utils/getGridLocalization';
// import { WindowSharp } from '@mui/icons-material';
// import { hydrateColumnsWidth } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils';
// import Button from '@mui/material'



const AddEditGPS = ({ type, setType, toEdit, setToEdit, user }) => {
    const [routeList, setRouteList] = useState([])
    const [vehicleList, setVehicleList] = useState([]);
    const [clientList, setClientList] = useState([]);

    const [loading, setLoading] = useState(true)
    const [client, setClient] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [route, setRoute] = useState("");
    const [image, setImage] = useState("");

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [date, setDate] = useState(Date());
    const [locationName, setLocationName]  = useState(null);

    const getCurrentLongLat = async () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }
    useEffect(() => {
        if (type == "Edit") {
            setVehicle(toEdit.vehicle_id)
            setRoute(toEdit.route_id)
            setClient(toEdit.client_id)
            setLatitude(toEdit.latitude)
            setLongitude(toEdit.longitude)
            setDate(toEdit.timestamp)
            setLocationName(toEdit.location_name)
        } else {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            });
        }
        vehiclePickerList()
        clientPickerList()
        routePickerList()
        setLoading(false)

    }, [])
    const onSubmit = async () => {
        if (type == "Edit") {
            if (image != "") {
                console.log(image)
                const gpsData = new FormData();
                gpsData.append("file", image);
                await uploadImage(gpsData).then(async (path) => {
                    console.log("path", path)
                    let data = {
                        "GPS_id": toEdit.id,
                        "driver_id": user.id,
                        "vehicle_id": vehicle,
                        "route_id": route,
                        "client_id": client,
                        "path": path.data,
                        "location_name":locationName
                    }
                    await editGPS(data).then((res) => {
                        console.log("EDIT GPS RES", "WITH NEW IMAGE", data)
                        if (res.status == 200) {
                            swal({
                                title: "Edited!",
                                text: "You Edited The GPS!",
                                icon: "success",
                                buttons: true,
                                dangerMode: true,
                            })
                                .then((willDelete) => {
                                    window.location.reload();
                                });
                        }
                        else { swal("Failed!", "Error while Editing GPS", "error"); }
                    })
                }).catch((err) => console.log("UPLOADIMAGEFILE", err))
            } else {
                let data = {
                    "GPS_id": toEdit.id,
                    "driver_id": user.id,
                    "vehicle_id": vehicle,
                    "route_id": route,
                    "client_id": client,
                    "longitude": longitude,
                    "latitude": latitude,
                    "path": toEdit.photo,
                    "location_name":locationName
                }
                editGPS(data).then((res) => {
                    console.log("EDIT GPS RES", "WITH PREVIOUS IMAGE")
                    if (res.status == 200)
                        swal({
                            title: "Edited!",
                            text: "You Edited The GPS!",
                            icon: "success",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                window.location.reload();
                            });
                    else
                        swal("Failed!", "Error while Editing GPS", "error");
                })
            }

        } else {
            saveImage()
        }
    }
    const saveImage = async () => {
        const gpsData = new FormData();
        gpsData.append("driver_id", user && user.id)
        gpsData.append("vehicle_id", vehicle)
        gpsData.append("client_id", client)
        gpsData.append("route_id", route)
        gpsData.append("longitude", longitude)
        gpsData.append("latitude", latitude)
        gpsData.append("file", image);
        gpsData.append("location_name", locationName)
        await saveGPSPanel(gpsData).then((resData) => {
            if (resData.status == 200) {
                swal({
                    title: "Saved!",
                    text: "You Saved The GPS!",
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        window.location.reload();
                    });

            } else {
                swal("Failed To Save!", "Error While Saving The GPS!", "error");
            }
        })
    }
    const routePickerList = async () => {
        await getRouteNames().then((response) => {
            setRouteList(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const vehiclePickerList = async () => {
        await getVehileNames().then((response) => {
            setVehicleList(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const clientPickerList = async () => {
        await getClientNames().then((response) => {
            setClientList(response.data)
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleOnClick = () => {
        setType("")
        setToEdit(null)
    }
    return (
        <>  {console.log(toEdit)}
            <div className='container row justify-between mb-10 mt-5'><h1 className='col-6'
            >{type} GPS</h1> <Button className='col-3' variant="outlined" onClick={handleOnClick}>Close</Button></div>
            <form onSubmit={(event) => {
                event.preventDefault()
                onSubmit()
            }} className='shadow-md shadow-black p-5 mb-5 ml-2 mr-2 h-full justify-between align-middle'> {!loading &&
                <><div className='container justify-evenly row'>
                    <FormControl className='col-4'>
                        <InputLabel className='ml-2 mr-2' id="demo-simple-select-label">Client</InputLabel>
                        <Select
                            className='ml-2 mr-2'
                            required={true}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={client}
                            label="client"
                            onChange={(event) => setClient(event.target.value)}
                        >
                            {clientList.length > 0 && clientList.map((item) => {
                                return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl >
                    <FormControl className='col-4'>
                        <InputLabel className='ml-2 mr-2' id="demo-simple-select-label">Route</InputLabel>
                        <Select
                            className='ml-2 mr-2'
                            required={true}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={route}
                            label="route"
                            onChange={(event) => setRoute(event.target.value)}
                        >
                            {routeList.length > 0 && routeList.map((item) => {
                                return (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className='col-4'>
                        <InputLabel className='ml-2 mr-2' id="demo-simple-select-label">Vehicle</InputLabel>
                        <Select
                            className='ml-2 mr-2'
                            required={true}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={vehicle}
                            label="vehicle"
                            onChange={(event) => setVehicle(event.target.value)}

                        >
                            {vehicleList.length > 0 && vehicleList.map((item) => {
                                return (<MenuItem selected={true} key={item.id} value={item.id}>{item.name}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                    <div className='p-2'>
                        <FormControl className='col-4 mt-3'>
                            <TextField
                                className='ml-2 mr-2'
                                label="Location"
                                value={locationName}
                                onChange={(event)=>setLocationName(event.target.value)}
                                ></TextField>
                            
                        </FormControl>
                        <FormControl className='col-4 mt-3'>
                            <Input
                                className='h-14 border-2 ml-2 mr-2'
                                type="file"
                                label="file"
                                required={type == "Edit" ? false : true}
                                onChange={(event) => {
                                    console.log(event.target.files[0])
                                    setImage(event.target.files[0])
                                }}
                            />
                        </FormControl>
                        <FormControl className='col-3 mt-3'>
                            <TextField
                                className='ml-2 mr-2'
                                label="Date"
                                value={`${moment(date).format('LLL')}`}></TextField>
                        </FormControl>
                        <FormControl className='col-1 mt-3 '><IconButton color="primary" onClick={()=>setDate(Date())}><CalendarTodayIcon /></IconButton></FormControl>
                    </div>

                </div>

                </>
                }
                <div className='container align-self-end justify-center align-items-center row mt-16'>
                    <Button type="submit" variant="contained" className="col-2" >submit</Button>
                </div>
            </form>
        </>
    )
}
export default AddEditGPS
