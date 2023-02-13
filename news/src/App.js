import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./common/ProtectedRoute";
import { getToken } from "./helper/auth";
import axios from "axios";



// import WHome from "./users/website/Pages/WHome";
// import WEligible from "./users/website/Pages/WEligible";
// import WSearch from "./users/website/Pages/WSearch";

// web-socket
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3006";
// console.log("COnnecting")
// const socket = socketIOClient(ENDPOINT);


const App = () => {
  const roleFromUrl = window.location.href.split("/")[4]
  const [state, setState] = useState({
    wait: false,
    // tokenAdmin: false,
  })


  // useEffect(() => {
  //   socket.on("FromAPI", data => {
  //     console.log(data)
  //   });
  // }, []);

  // useEffect(() => {
  //   let tokenAdmin = getToken("admin");
  //   let tokenAgent = getToken("agent");
  //   let tokenStudent = getToken("student");

  //   // get Permissions
  //   var myToken;
  //   if (roleFromUrl == "admin") {
  //     myToken = tokenAdmin;
  //   }
  //   const config = { headers: { "Authorization": `Bearer ${myToken}` } }
  //   axios.post(process.env.REACT_APP_NODE_URL + "/admin/verifyToken", {}, config).then(res => {
  //     console.log({ res })
  //     if (res.data.status == "0") {
  //       setState({
  //         ...state,
  //         wait: false,
  //         currentPermissions: "ALLOW",
  //         tokenAdmin,
  //         tokenAgent,
  //         tokenStudent,
  //       })
  //       return;
  //     }
  //     if (res.data.details.userData.role != "ADMIN") {
  //       setState({
  //         ...state,
  //         currentPermissions: res.data.details.userData.permissions,
  //         wait: false,
  //         tokenAdmin,
  //         tokenAgent,
  //         tokenStudent,
  //       })
  //       return;
  //     }

  //     setState({
  //       ...state,
  //       currentPermissions: "ALLOW",
  //       wait: false,
  //       tokenAdmin,
  //       tokenAgent,
  //       tokenStudent,
  //     })
  //     return;
  //   }).catch(err => {
  //     console.log(err.response.data)
  //   })
  // }, [])

  if (state.wait) {
    return (
      <center className="bg-white flex h-screen items-center justify-center">
        <img width={"500px"} src="https://miro.medium.com/max/1400/1*Gvgic29bgoiGVLmI6AVbUg.gif" />
      </center>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<>Hello world</>/* Layout*/}>
          {/* home page */}
          {/* <Route index element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
          <Route path="category" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
          <Route path="news" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"student_list"}><StudentList /></ProtectedRoute>} />
          <Route path="contact" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"csv_programs"}><Manage /></ProtectedRoute>} />
          <Route path="policy" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><AdminAgentProfile /></ProtectedRoute>} />
          <Route path="search" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"sp_list"}><SchoolList /></ProtectedRoute>} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
