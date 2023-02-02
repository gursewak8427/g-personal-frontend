import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import Dashboard from "../Screens/Dashboard/Dashboard";

const SchoolList = () => {
    const [state, setState] = useState({
        isWaiting: false,
        schools: [],
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
    })
    const navigate = useNavigate()

    useEffect(() => {
        getPaginationData(1);
    }, [])

    const getPaginationData = (page) => {
        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getschools", data, config).then(res => {
            console.log(res)
            setState({
                ...state,
                schools: res.data.details.schools,
                totalPages: res.data.details.totalPages,
                currentPage: res.data.details.currentPage,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }

    return (
        <>
            <Dashboard heading_title={"Schools List"}>
                <>
                    <div className="row min-height-vh-100">
                        <div className="row p-45">
                            <div className="col-12 mt-4">
                                <div className="headerr d-flex align-items-end justify-content-end">
                                    <button className="btn AddDataBtn">Add</button>
                                    <button className="btn AddDataBtn" onClick={()=>navigate("/admin/addschools")}>Import</button>
                                </div>
                                <div className="card mb-4">
                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Id</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Programs</th>
                                                        <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Founded</th>
                                                        {/* <th className="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th> */}
                                                        <th className="text-secondary opacity-7" />
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        state.schools.map((school, index) => {
                                                            return <tr>
                                                                <td >
                                                                    <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex px-2 py-1">
                                                                        <div>
                                                                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Ekya_Schools_logo.png" className="avatar avatar-sm me-3" alt="user1" />
                                                                        </div>
                                                                        <div className="d-flex flex-column justify-content-center">
                                                                            <h6 className="mb-0 text-sm hover-underline" onClick={() => navigate("/admin/programs/" + school._id)}>{school.school_name} ({school.type})</h6>
                                                                            <p className="text-xs text-secondary mb-0">{school.school_location}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {/* <td className="align-middle text-center text-sm">
                                                                    <span className="badge badge-sm bg-gradient-success">Online</span>
                                                                </td> */}
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{school.school_programs.length}</span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{school.founded}</span>
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

export default SchoolList;