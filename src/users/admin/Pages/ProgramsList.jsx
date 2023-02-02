import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Switch } from "@mui/material";
import { Navigate, redirect, useParams } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";

const ProgramsList = (props) => {
    const [state, setState] = useState({
        isWaiting: false,
        school_programs: { school_programs: [] },
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
        wait: true,
        activeIndex: null,
    })
    const { id } = useParams()

    useEffect(() => {
        getPaginationData(1);
    }, [])

    const getPaginationData = (page) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page, schoolId: id }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getprograms", data, config).then(res => {
            console.log({ res })
            setState({
                ...state,
                school_programs: res.data.details.school_programs,
                school: res.data.details.school,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    const toggleActiveIndex = (index) => {
        setState({
            ...state,
            activeIndex: index == state.activeIndex ? null : index
        })
    }

    const monthsArray = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const changeProgramIntakeStatus = (sId, pId, index) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { sId, pId, index }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/toggleIntakeStatus", data, config).then(res => {
            console.log({ res })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }
    return (
        <>
            <Dashboard heading_title={"Program List"}>
                <>
                    <div className="row min-height-vh-100">
                        <div className="row p-45">
                            <div className="col-12">
                                <div className="card mb-4 mt-4">
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Program</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Duration</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                                        {/* <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th> */}
                                                        <th className="text-secondary opacity-7" />
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        state.school_programs.school_programs.map((program, index) => {
                                                            return <tr>
                                                                <td>{index + 1}</td>
                                                                <td className="max-width">
                                                                    <div className="">
                                                                        <div><b>{program.program_name}</b></div>
                                                                        <div><small>Intake: {program.intake_id}</small></div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">{program.duration}</td>
                                                                <td className="text-center statusCell">
                                                                    <span className={`${state.activeIndex == index ? "btn active" : "btn"}`} onClick={() => toggleActiveIndex(index)}>Status</span>
                                                                    <div className={`${state.activeIndex == index ? "statusBox active" : "statusBox"}`}>
                                                                        <ul>
                                                                            {
                                                                                program.status.split(",").map((status, index) => {
                                                                                    if (status == "1") {
                                                                                        return <li onClick={() => changeProgramIntakeStatus(id, program.program_name, index)} className={`${index + 1 == program.status.split(",").length ? "border-0" : ""}`}><span>{monthsArray[program.intake_id.split(",")[index]]}</span><span> <Switch color="primary" defaultChecked onClick={() => null} /> </span></li>
                                                                                    } else {
                                                                                        return <li onClick={() => changeProgramIntakeStatus(id, program.program_name, index)} classname={`${index + 1 == program.status.split(",").length ? "border-0" : ""}`}><span>January</span><span><Switch color="primary" onClick={() => null} /> </span></li>
                                                                                    }
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td className="align-middle d-flex">
                                                                    <div className="tableIcons">
                                                                        <i className="fa fa-edit"></i>
                                                                    </div>
                                                                    <div className="tableIcons">
                                                                        <i class="fa-solid fa-trash-can"></i>
                                                                    </div>
                                                                    {/* <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                        <b>Programs</b>
                                                                    </a> */}
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
                    </div>
                </>
            </Dashboard>
        </>
    )
}

export default ProgramsList;