import { IconButton, Typography } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import LogoutIcon from '@mui/icons-material/Logout';
import { clearSession } from "../services/Store";
import {useRouter} from "next/router";

const Layout = ({ children, user }) => {
  const router = useRouter();
  return (
    <>
      <div className="col-12 h-20 bg-blue-700 shadow-md shadow-black flex flex-row align-middle justify-end items-center"><div className="bg-yellow-200 rounded-full w-16 h-16 mr-2 shadow-md shadow-black flex justify-center items-center"><h2>{user.name[0]}</h2></div><div className="mr-5 justify-center"><Typography>{user && user.name}</Typography></div><div class="mb-2"><IconButton onClick={() => {
        clearSession()
        router.push("/").then(()=>{window.location.reload()})
      
      }} ><span><LogoutIcon /></span></IconButton></div></div>
      <div className="h-screen flex flex-row justify-start">
        < Sidebar />

        <div className="flex-1 ml-1 mr-1 text-black card mt-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
