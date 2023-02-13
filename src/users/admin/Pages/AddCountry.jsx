import { Switch } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { getCookie, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./AddCountry.css";
import { useDropzone } from 'react-dropzone'

// web-socket
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3006";
console.log("COnnecting")
var socket = socketIOClient(ENDPOINT);

const AddCountry = () => {
    const [state, setState] = useState({
        countryName: "",
        countryFlag: "",
        isWait: false,
        list: []
    })

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_NODE_URL + "/admin/countries").then(response => {
                console.log(response)
                if (response.data.status == "1") {
                    setState({
                        ...state,
                        list: response.data.details.list,
                    })
                }
            })
    }, [])

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    }

    const uploadData = async () => {
        try {
            const fd = new FormData();
            fd.append('country', state.countryName);
            fd.append('image', state.countryFlag);
            let response = await axios
                .post(process.env.REACT_APP_NODE_URL + "/admin/addcountry", fd)

            console.log(response)

            if (response.data.status == "1") {
                setState({
                    ...state,
                    list: [...state.list, response.data.details.newCountry],
                    countryName: "",
                    countryFlag: "",
                })
            }
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div heading_title={"Add Country"}>
                <>
                    <div className="row addCountryPage flex flex-row">
                        <div className="shadow-lg w-5/12 mx-auto my-4 p-2">
                            <div className="card-body">
                                <label>Country</label>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                                        name="countryName"
                                        placeholder="Enter Country Name"
                                        value={state.countryName}
                                        onChange={handleChange} />
                                </div>
                                <label>Flag</label>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        name="countryFlag"
                                        onChange={handleFileChange} />
                                </div>
                                <button type="button" className="btn bg-gradient-primary w-100 ml-2 mt-4 text-white px-2 py-1 rounded mb-0" onClick={uploadData}>Upload</button>
                            </div>
                        </div>
                        <div className="mx-auto w-5/12 my-4 p-2">
                            <div class="flex flex-col">
                                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full">
                                                <thead class="bg-white border-b">
                                                    <tr>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            #
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Country
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Flag
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        state.list.map((country, index) => {
                                                            return <tr class="bg-gray-100 border-b">
                                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {country.countryName.toUpperCase()}
                                                                </td>
                                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    <img width={100} src={process.env.REACT_APP_NODE_URL + "/uploads/agent/" + country.countryFlag} alt="" />
                                                                </td>
                                                            </tr>
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}

export default AddCountry;