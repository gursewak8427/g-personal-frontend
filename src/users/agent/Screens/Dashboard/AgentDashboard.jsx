import { Navigate, Route, Routes } from "react-router-dom"
import Footer from "../../common/Footer/AgentFooter";
import Header from "../../common/Header/AgentHeader";
import Navbar from "../../common/Header/AgentNavbar";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import { getToken } from "../../../../helper/auth";
import axios from "axios";

const AgentDashboard = ({ children, heading_title }) => {
    const [state, setState] = useState({
        isWait: true,
        agentPending: true,
        token: getToken("agent")
    })
    useEffect(() => {
        const config = { headers: { "Authorization": `Bearer ${state.token}` } }
        axios.get(process.env.REACT_APP_NODE_URL + "/agent/verifyToken", config).then(res => {
            setState({
                ...state,
                isWait: false,
                agentPending: false,
            })
        }).catch(err => {
            setState({
                ...state,
                isWait: false,
                agentPending: true,
            })
            console.log(err.response.data)
        })
    }, [])

    if (state.isWait) {
        return "Waiting is in progress..."
    } else {
        if (state.agentPending) {
            return <Navigate to="/agent/profile" replace />
        }
    }


    return (
        <>
            <Header />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <Navbar heading_title={heading_title} />
                <div className="container-fluid py-4">
                    <div style={{ minHeight: "85vh" }}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </main>
            <Helmet>
                <script src="/assets/js/core/popper.min.js"></script>
                <script src="/assets/js/core/bootstrap.min.js"></script>
                {/* <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script> */}
                <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
                <script src="/assets/js/plugins/chartjs.min.js"></script>
                <script src="/assets/js/soft-ui-dashboard.js" type="text/javascript" />
            </Helmet>
        </>
    );
}

export default AgentDashboard;
