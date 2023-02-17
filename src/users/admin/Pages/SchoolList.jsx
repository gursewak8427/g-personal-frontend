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
        schoolNamesList: [],
        countryNamesList: [],
        adminToken: getToken("admin"),
        totalPages: 0,
        currentPage: 1,
        country: "",
        searchItem: "",
        first: true,
        baseUrl : ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        // get school name and id list
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getschoolnameidandcountrieslist", {}).then(res => {
            console.log({ responseSchools: res })
            getPaginationData(1, res.data.schoolNamesList, res.data.countryNameList)
            setState({
                ...state,
                isWaiting: false,
            })
        }).catch(err => {
            console.log(err.response.data)
            // alert(err.response.data.message)
        })
    }, [])

    const getPaginationData = (page, schoolsList, countryList) => {
        setState({
            ...state,
            isWaiting: true,
        })
        let country = document.getElementById("country").value
        let searchItem = document.getElementById("searchItem").value

        const config = { headers: { "Authorization": `Bearer ${state.adminToken}` } }
        let data = { currentPage: page, country, searchItem }
        axios.post(process.env.REACT_APP_NODE_URL + "/admin/getschools", data, config).then(res => {
            console.log(res)
            state.first ?
                setState({
                    ...state,
                    schools: res.data.details.schools,
                    totalPages: res.data.details.totalPages,
                    currentPage: res.data.details.currentPage,
                    schoolNamesList: schoolsList,
                    countryNamesList: countryList,
                    isWaiting: false,
                    first: false,
                    baseUrl : res.data.details.baseUrl
                }) :

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

    const handleChange = e => {
        getPaginationData(1)
    }

    return (
        <>
            <div heading_title={"Schools List"}>
                <>
                    <div className="row min-height-vh-100">
                        <div className="row p-45">
                            <div className="col-12 mt-4">
                                <div className="headerr d-flex align-items-end justify-content-end">
                                    {/* <button className="btn AddDataBtn">Add</button> */}
                                    {/* <button className="btn AddDataBtn" onClick={()=>navigate("/admin/addschools")}>Import</button> */}
                                </div>
                                <div className="schoolFilters mb-4">
                                    <div className="left">
                                        <div className="filter-group">
                                            <select className="uppercase border-2 border-black form-control p-2" name="country" id="country" onChange={handleChange}>
                                                <option value="" selected>-- Select Country --</option>
                                                <option value="">All</option>
                                                {
                                                    state.countryNamesList.map(country => {
                                                        return <option className="uppercase" value={country.countryName}>{country.countryName}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="filter-group">
                                            <input className="form-control border-2 border-black p-2" type="text" placeholder="SEARCH" id="searchItem" name="searchItem" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>

                                {
                                    state.isWaiting ?
                                        <>
                                            <center className="mt-4">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </center>
                                        </> : <div className="card mb-4">
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <div className="table-responsive p-0 dashbord-table ">
                                                    <table className="table mb-0 w-full">
                                                        <thead>
                                                            <tr>
                                                                <th className="p-2 border-2 text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Sr.</th>
                                                                <th className="border-2  p-2 text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Country Logo</th>
                                                                <th className="border-2 p-2 text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School Logo</th>
                                                                <th className="border-2  p-2 text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School Name</th>
                                                                <th className="border-2  p-2 text-left text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Country</th>
                                                                <th className="border-2  p-2 align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Programs</th>
                                                                {/* <th className="border-2  p-2 align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Registred</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                state.schools.map((school, index) => {
                                                                    return <tr>
                                                                        <td className="border-2 p-2">
                                                                            <p className="text-xs font-weight-bold mb-0">{index + 1}</p>
                                                                        </td>
                                                                        <td className="border-2 p-2">
                                                                            <div className="mr-2">
                                                                                <img width={60} src={state.baseUrl + school?.countryDetail[0].countryFlag} className="avatar avatar-sm me-3" alt="user1" />
                                                                            </div>
                                                                        </td>
                                                                        <td className="border-2 p-2">
                                                                            <div className="mr-2">
                                                                                <img width={60} src={state.baseUrl + school?.schoolDetail[0].schoolLogo} className="avatar avatar-sm me-3" alt="user1" />
                                                                            </div>
                                                                        </td>
                                                                        <td className="border-2 p-2">
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <h6 className="mb-0 text-sm hover-underline" onClick={() => navigate("/d/admin/programs/" + school._id)}>{school.school_name}</h6>
                                                                                <p className="text-xs text-secondary mb-0">{school.school_location}</p>
                                                                            </div>
                                                                        </td>
                                                                        <td className="border-2 p-2 capitalize">
                                                                            {school.country}
                                                                        </td>
                                                                        <td className="p-2 border-2 align-middle text-center">
                                                                            <span className="text-secondary text-xs font-weight-bold">{school.school_programs.length}</span>
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
                                }



                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default SchoolList;