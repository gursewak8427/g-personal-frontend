import { Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";
import "./Manage.css";

const Manage = () => {
    const [state, setState] = useState({
        isWaiting: true,
        agents: [],
        students: [],
        totalPages: 0,
        currentPage: 1,
        filterActive: false,
    })

    const toggleFilteredBox = () => setState({ ...state, filterActive: !state.filterActive })

    useEffect(() => {
        getPaginationData(1);
    }, [])


    const getPaginationData = (page) => {
        // get all agents
        let data = { currentPage: page }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getagents", data).then(res => {
            console.log(res)
            // authenticate with token
            // redirect
            setState({
                ...state,
                isWaiting: false,
                agents: res.data.details.agents,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    const Sidebar = () => {
        return (
            <>
                <div className="sidebar">
                    hello
                </div>
            </>
        )
    }

    const toggleStatus = (agentId) => {
        let data = { agentId }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/togglestatus", data).then(res => {
            console.log(res)
            // authenticate with token
            // redirect
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    return (
        <>
            <Dashboard heading_title={"Manage"}>
                <>
                    <div className="row px-4">
                        <div className="col-12">
                            <div className="card mb-4 mt-4">
                                <div className="card-body px-0 pt-0 pb-2">
                                    <div className="table-responsive p-0">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                                    <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</th>
                                                    <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Approved</th>
                                                    <th className="text-secondary opacity-7" />
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    state.agents.map((agent, index) => {
                                                        return <tr>
                                                            <td>
                                                                <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                                                {/* <p className="text-xs text-secondary mb-0"><b>ID:</b> {agent._id}</p> */}
                                                            </td>
                                                            <td>
                                                                <div className="d-flex px-2 py-1">
                                                                    <div>
                                                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" className="avatar avatar-sm me-3" alt="user1" />
                                                                    </div>
                                                                    <div className="d-flex flex-column justify-content-center">
                                                                        <h6 className="mb-0 text-sm">{agent.first_name}</h6>
                                                                        <p className="text-xs text-secondary mb-0">{agent.username}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle text-center">
                                                                <span className="text-secondary text-xs font-weight-bold">{agent.phone}</span>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                {
                                                                    agent.status == "APPROVED" ?
                                                                        <Switch color="secondary" defaultChecked onClick={() => toggleStatus(agent._id)} /> :
                                                                        agent.status == "UN_APPROVED" ?
                                                                            <Switch color="secondary" onClick={() => toggleStatus(agent._id)} /> : ""
                                                                }

                                                                {/* <span className="badge badge-sm bg-gradient-success">Online</span> */}
                                                            </td>

                                                            <td className="align-middle">
                                                                <Link to={"/admin/agent_students/" + agent._id} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                    Students
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="card-footer pb-0">
                                    {/* pagination is here */}
                                    <div className="pagination">
                                        <div className="pages">
                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel="next"
                                                onPageChange={(event) => {
                                                    getPaginationData(event.selected + 1)
                                                }}
                                                pageRangeDisplayed={2}
                                                pageCount={state.totalPages}
                                                previousLabel="prev"
                                                renderOnZeroPageCount={null}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {<Sidebar />}
                </>
            </Dashboard>
        </>
    )
}

export default Manage;