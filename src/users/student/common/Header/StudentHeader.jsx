import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from "react";

const StudentHeader = () => {
    const [active, setActive] = useState("Dashboard");

    const sidebarItems = [
        {
            label: "Dashboard",
            icon: <DashboardIcon />,
        },
        {
            label: "Students",
            icon: <DashboardIcon />,
        },
    ]
    return (
        <>
            <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
                <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                    <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html " target="_blank">
                        <img src="../assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" />
                        <span className="ms-1 font-weight-bold">
                            <span>STUDENT</span>
                        </span>
                    </a>
                </div>
                <hr className="horizontal dark mt-0" />
                <div className="w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        {
                            sidebarItems.map(item => {
                                return <li className="nav-item">
                                    <a className={active == item.label ? "nav-link active" : "nav-link"} href="../pages/dashboard.html">
                                        <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                            {item.icon}
                                        </div>
                                        <span className="nav-link-text ms-1">{item.label}</span>
                                    </a>
                                </li>
                            })
                        }
                        {/* header line */}
                        {/* <li className="nav-item mt-3">
                            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default StudentHeader;