import { Route, Routes } from "react-router-dom"
import Footer from "../../common/Footer/StudentFooter";
import Header from "../../common/Header/StudentHeader";
import Navbar from "../../common/Header/StudentNavbar";
import { Helmet } from "react-helmet";
import StudentHeader from "../../common/Header/StudentHeader";
import StudentNavbar from "../../common/Header/StudentNavbar";
import StudentFooter from "../../common/Footer/StudentFooter";
import StudentEmailConfirmationReminder from "../../common/StudentEmailConfirmationReminder";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../../helper/auth";

const StudentDashboard = ({ children }) => {
    const [state, setState] = useState({
        isEmailVerified: true,
        isWait: true,
        token: getToken("student")
    })

    useEffect(() => {
        const config = { headers: { "Authorization": `Bearer ${state.token}` } }
        axios.get(process.env.REACT_APP_NODE_URL + "/student/get_email_verification", config).then(res => {
            // window.location.href = "/student/"
            if (res.data.status == "1") {
                setState({
                    ...state,
                    isEmailVerified: true,
                    isWait: false,
                })
            } else {
                setState({
                    ...state,
                    isEmailVerified: false,
                    isWait: false,
                })
            }
        }).catch(err => {
            setState({
                ...state,
                isWait: false,
            })
            console.log(err.response.data)
        })

    }, [])

    return (
        <>
            {
                !state.isEmailVerified ? <StudentEmailConfirmationReminder /> : ""
            }
            <StudentHeader />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                <StudentNavbar />
                <div className="container-fluid py-4">
                    {children}
                    <StudentFooter />
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

export default StudentDashboard;
