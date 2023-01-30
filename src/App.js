import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./common/ProtectedRoute";
import { getToken } from "./helper/auth";
import Home from "./Home";
import Header from "./users/admin/common/Header/Header";
import AddSchools from "./users/admin/Pages/AddSchools";
import AdminSubStudents from "./users/admin/Pages/AdminSubStudents";
import DashboardPage from "./users/admin/Pages/DashboardPage";
import Login from "./users/admin/Pages/Login";
import Manage from "./users/admin/Pages/Manage";
import StudentList from "./users/admin/Pages/StudentList";
import AgentAddStudent from "./users/agent/Pages/AgentAddStudent";
import AgentGetStudent from "./users/agent/Pages/AgentGetStudent";
import AgentLogin from "./users/agent/Pages/AgentLogin";
import AgentProfile from "./users/agent/Pages/AgentProfile";
import AgentRegister from "./users/agent/Pages/AgentRegister";
import AgentDashboard from "./users/agent/Screens/Dashboard/AgentDashboard";
import StudentConfirm from "./users/student/common/StudentConfirm";
import StudentLogin from "./users/student/Pages/StudentLogin";
import StudentRegister from "./users/student/Pages/StudentRegister";
import StudentDashboard from "./users/student/Screens/Dashboard/StudentDashboard";

// web-socket
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3006";
// console.log("COnnecting")
// const socket = socketIOClient(ENDPOINT);


const App = () => {
  const [state, setState] = useState({
    wait: true,
    tokenAdmin: false,
    tokenAgent: false,
    tokenStudent: false,
  })


  // useEffect(() => {
  //   socket.on("FromAPI", data => {
  //     console.log(data)
  //   });
  // }, []);

  useEffect(() => {
    let tokenAdmin = getToken("admin");
    let tokenAgent = getToken("agent");
    let tokenStudent = getToken("student");
    setState({
      ...state,
      wait: false,
      tokenAdmin,
      tokenAgent,
      tokenStudent,
    })
  }, [])

  const a = 10;
  const addScriptFile = (src) => {
    const script = document.createElement('script');

    script.src = src;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }

  useEffect(() => {
    // addScriptFile("./assets/js/soft-ui-dashboard.min.js?v=1.0.7")
    // addScriptFile("/assets/js/core/popper.min.js")
  }, [a]);

  if (state.wait) {
    return "Loading..."
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* admin routes */}
        <Route path="/admin" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><StudentList /></ProtectedRoute>} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/manage" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><Manage /></ProtectedRoute>} />
        <Route path="/admin/addschools" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><AddSchools /></ProtectedRoute>} />
        <Route path="/admin/agent_students/:agentId" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><AdminSubStudents /></ProtectedRoute>} />

        {/* agent routes */}
        <Route path="/agent" element={<ProtectedRoute token={state.tokenAgent} role={"agent"}><AgentDashboard /></ProtectedRoute>} />
        <Route path="/agent/dashboard" element={<ProtectedRoute token={state.tokenAgent} role={"agent"}><AgentDashboard /></ProtectedRoute>} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/register" element={<AgentRegister />} />
        <Route path="/agent/addstudent" element={<AgentAddStudent />} />
        <Route path="/agent/getstudents" element={<AgentGetStudent />} />
        <Route path="/agent/profile" element={<AgentProfile />} />

        {/* student routes */}
        <Route path="/student" element={<ProtectedRoute token={state.tokenStudent} role={"student"}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/dashboard" element={<ProtectedRoute token={state.tokenStudent} role={"student"}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/student/confirm/:token" element={<StudentConfirm />} />

      </Routes>
    </>
  );
}

export default App;
