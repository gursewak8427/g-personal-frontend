import { Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, Navigate, redirect } from "react-router-dom";
import { getCookie, setCookie } from "../../../helper/auth";
import Papa from "papaparse";
import Dashboard from "../Screens/Dashboard/Dashboard";
// import "./AddSchools.css";

// web-socket
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3006";
console.log("COnnecting")
var socket = socketIOClient(ENDPOINT);
// if (!getCookie("socket")) {
// } else {
//     var socketId = getCookie("socket")
//     var socket = socketIOClient(ENDPOINT, {
//         query: {
//             socketId: socketId
//         }
//     });
//     console.log("Tryping to connect with old ID", socketId)
// }

const AddSchools = () => {
    const [state, setState] = useState({
        progress: 0,
        csv_attachment: "",
        csvData: [],
        isUploadingStart: false,
        fileUploadedStatus: false,

        // requiredColumns: [],
        requiredColumns: [0, 1, 2, 3, 4, 5, 14, 15, 16],
    })
    var visitedSchools = [];
    var errorFieds = 0

    // socket.on("Connected", data => {
    //     console.log({ data })
    //     setCookie("socket", data.socketId)
    // });

    const handleFileUpload = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        });
    }

    // new api one by one row data will send to api
    // const uploadData = async () => {
    //     // upload_status_
    //     let headers = state.csvData[0]; // these are splitted fields of header
    //     let totalData = state.csvData[1]; // these are list of rows and fields are qomma separated
    //     setState({
    //         ...state,
    //         isDataUploadingStart: true,
    //     })
    //     let totalUploadedFiles = 0;
    //     let totalErrorFiles = 0;


    //     let res = await axios.post("http://localhost:3006/admin/uploadcsv", , config)

    //     totalData.map(async (rowData, index) => {
    //         const config = {
    //             onUploadProgress: progressEvent => {
    //                 let progress = (progressEvent.loaded / progressEvent.total) * 100;
    //                 document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
    //                 document.getElementById(`uploadStatus_${index}`).innerText = `${progress}%`
    //             }
    //         }


    //         const changeState = () => {
    //             let progressDiv = document.getElementById("progressDiv");
    //             let progressInput = document.getElementById("progressInput");
    //             let ProgressBarAnimation = document.getElementById("ProgressBarAnimation");

    //             if (index + 1 == totalData.length) {
    //                 console.log([totalUploadedFiles, totalErrorFiles])
    //                 setState({
    //                     ...state,
    //                     uploadedFilesCount: totalUploadedFiles,
    //                     failedFilesCount: totalErrorFiles,
    //                     isDataUploadingStart: true,
    //                 })
    //                 progressDiv.innerText = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10)
    //                 ProgressBarAnimation.style.width = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) + "%"
    //                 if (parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) == 100) {
    //                     ProgressBarAnimation.classList.add("bg-success")
    //                     ProgressBarAnimation.classList.remove("progress-bar-animated")
    //                 }
    //                 progressInput.value = parseInt(progressInput.value) + 1
    //             } else {
    //                 progressDiv.innerText = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10)
    //                 ProgressBarAnimation.style.width = parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) + "%"
    //                 if (parseInt((parseInt(progressInput.value) + 1) * 100 / state.totalFilesCount, 10) == 100) {
    //                     ProgressBarAnimation.classList.add("bg-success")
    //                     ProgressBarAnimation.classList.remove("progress-bar-animated")
    //                 }
    //                 progressInput.value = parseInt(progressInput.value) + 1
    //             }
    //         }
    //         try {
    //             let res = await axios.post("http://localhost:3006/admin/uploadcsv", {}, config)

    //             totalUploadedFiles++;
    //             document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
    //             document.getElementById(`uploadStatus_${index}`).classList.remove("errorUploading")
    //             document.getElementById(`uploadStatus_${index}`).innerText = "Uploaded"

    //             // changeState()
    //         } catch (error) {
    //             console.log("error", error)
    //             document.getElementById(`uploadStatus_${index}`).classList.add("errorUploading")
    //             document.getElementById(`uploadStatus_${index}`).classList.remove("successUploading")
    //             document.getElementById(`uploadStatus_${index}`).innerText = "Failed"
    //             totalErrorFiles++;

    //             // changeState()
    //         }
    //     })

    // }

    // old api
    const uploadData = async () => {
        if (errorFieds != 0) {
            alert(`Failed: Invalid ${errorFieds} Rows.`);
            return;
        }
        if (state.csv_attachment == "") {
            alert("Please upload the file")
            return;
        }
        setState({
            ...state,
            isUploadingStart: true,
        })
        const fd = new FormData();
        fd.append('csv_attachment', state.csv_attachment);

        try {
            let ProgressBarAnimation = document.getElementById("ProgressBarAnimation");
            let progressInput = document.getElementById("progressInput");
            const config = {
                onUploadProgress: progressEvent => {
                    let progress = (progressEvent.loaded / progressEvent.total) * 100;
                    console.log(progress)
                    // document.getElementById(`uploadStatus_${index}`).classList.add("successUploading")
                    // document.getElementById(`uploadStatus_${index}`).innerText = `${progress}%`

                    // ProgressBarAnimation.style.width = progress + "%"
                    // ProgressBarAnimation.innerText = parseInt(progress, 10) + "%"
                    // if (progress == 100) {
                    //     ProgressBarAnimation.classList.add("bg-success")
                    //     ProgressBarAnimation.classList.remove("progress-bar-animated")
                    // } else {
                    //     ProgressBarAnimation.classList.remove("bg-success")
                    //     ProgressBarAnimation.classList.add("progress-bar-animated")
                    // }
                }
            }


            let response = await axios
                .post("http://localhost:3006/admin/uploadcsv", fd, config)

            console.log(response)

            socket.emit("upload_csv_websocket_custom_validation", response.data)
            // socket.emit("upload_csv_websocket", response.data)

            var complete = 0;
            var total = 0;
            var result = [0, 0, 0] // uploaded, updated, failed
            socket.on("FromAPI", data => {
                if (data.total) {
                    total = data.total
                }
                if (data.index != undefined || data.index != null) {
                    let index = data.index
                    complete++;
                    let progress = complete * 100 / total
                    ProgressBarAnimation.style.width = progress + "%"
                    ProgressBarAnimation.innerText = `(${complete}-${total}) ${parseInt(progress, 10)}%` // show percentage
                    if (progress == 100) {
                        ProgressBarAnimation.classList.add("bg-success")
                        ProgressBarAnimation.classList.remove("progress-bar-animated")
                    } else {
                        ProgressBarAnimation.classList.remove("bg-success")
                        ProgressBarAnimation.classList.add("progress-bar-animated")
                    }
                    if (data.message == "Uploaded") {
                        result[0] = result[0] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-success")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-danger")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-primary")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Uploaded"
                    }
                    if (data.message == "Updated") {
                        result[1] = result[1] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-danger")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-success")
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-primary")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Updated"
                    }
                    if (data.message == "Failed") {
                        result[2] = result[2] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-danger")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-success")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-primary")
                        document.getElementById(`uploadStatus_${index}`).innerText = "Failed"
                        console.log({ data })
                        document.getElementById(`uploadStatus_${index}`).setAttribute("title", data.details)
                    }
                    if (data.message == "--") {
                        result[2] = result[2] + 1
                        document.getElementById(`uploadStatus_${index}`).classList.add("text-danger")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-success")
                        document.getElementById(`uploadStatus_${index}`).classList.remove("text-primary")
                        document.getElementById(`uploadStatus_${index}`).innerText = "--"
                        console.log({ data })
                        document.getElementById(`uploadStatus_${index}`).setAttribute("title", data.details)
                    }

                    document.getElementById(`uploadedCount`).innerText = result[0]
                    document.getElementById(`updatedCount`).innerText = result[1]
                    document.getElementById(`failedCount`).innerText = result[2]
                    document.getElementById(`totalCount`).innerText = complete

                    if (total == index + 1) {
                        setState({
                            ...state,
                            isUploadingStart: false,
                        })
                    }
                }
                // console.log({ complete })
            });
            // var results = response.data.details.results;
            // console.log({ results })
            // if (results) {
            //     results.map((item, index) => {
            //         document.getElementById(`uploadStatus_${index}`).innerText = item
            //         if (item == "Updated") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-info")
            //         }
            //         if (item == "Failed") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-danger")
            //         }
            //         if (item == "Uploaded") {
            //             document.getElementById(`uploadStatus_${index}`).classList.add("text-success")
            //         }
            //     })
            // }

        } catch (error) {
            console.log(error);
        }

    }



    const openFile = () => {
        errorFieds = 0
        visitedSchools = [] // again empty visibleSchoolsList
        Papa.parse(state.csv_attachment, {
            complete: function (results) {
                // setFull Screen
                document.getElementsByTagName("aside")[0].classList.add("hide_now")
                document.getElementsByTagName("main")[0].classList.add("full_screen")
                setState({
                    ...state,
                    csvData: [results.data[0], results.data.splice(1)],
                    fileUploadedStatus: true,
                })
            }
        }
        )
    }

    const datamodel = () => {

    }


    return (
        <>
            <Dashboard heading_title={"Add Schools"}>
                <>
                    <div className="row uploadCSVbox">
                        {state.fileUploadedStatus ? <></> : <div className="form d-flex flex-column align-items-center m-3">
                            <h4>Upload CSV File</h4>
                            <div className="container col-6">
                                <input type="hidden" name="progressInput" id="progressInput" value={0} />
                                <div className="form-group m-2">
                                    <input
                                        type="file"
                                        name="csv_attachment"
                                        className="form-control mb-1"
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                <div className="form-group m-2 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={openFile}>Open</button>
                                </div>

                            </div>
                        </div>}
                        {
                            state.fileUploadedStatus ?
                                <div className="tableData">
                                    <label className="d-flex align-items-center justify-content-between" htmlFor="">
                                        <b><span className="m-1">School Details {errorFieds}</span></b>

                                        <div className="d-flex align-items-center justify-content-center">
                                            <div className="d-flex flex-direction-column m-2">
                                                <p className="m-0 p-1"><span className="text-secondary"><b>Updated</b> : </span><span id="updatedCount">0</span></p>
                                                <p className="m-0 p-1"><span className="text-secondary"><b>Uploaded</b> : </span><span id="uploadedCount">0</span></p>
                                                <p className="m-0 p-1"><span className="text-secondary"><b>Failed</b> : </span><span id="failedCount">0</span></p>
                                                <p className="m-0 p-1"><span className="text-secondary"><b>Total</b> : </span><span id="totalCount">0</span></p>
                                            </div>

                                            <button className="btn btn-secondary m-0" onClick={state.isUploadingStart ? null : uploadData}>
                                                {
                                                    state.isUploadingStart ?
                                                        <div class="spinner-border spinner-border-sm" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div> : <>Upload</>
                                                }
                                            </button>
                                            <button className="btn btn-warning m-2" onClick={_ => {
                                                if (window.confirm("Are you want to close")) {
                                                    setState({
                                                        ...state,
                                                        csvData: [[], []],
                                                        fileUploadedStatus: false,
                                                        isUploadingStart: false,
                                                    })
                                                    document.getElementsByTagName("aside")[0].classList.remove("hide_now")
                                                    document.getElementsByTagName("main")[0].classList.remove("full_screen")
                                                }
                                            }}>
                                                Close
                                            </button>
                                        </div>
                                    </label>
                                    {
                                        true ?
                                            <div className="progress m-2">
                                                <div id="ProgressBarAnimation" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "0%", height: "100%" }}>0%</div>
                                            </div> : <> </>
                                    }
                                    <table className="table schoolList">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                {
                                                    state.csvData[0].map((item, index) => {
                                                        if (state.requiredColumns.includes(index)) {
                                                            return <th scope="col" className="span.text-danger">{item}</th>
                                                        }
                                                        return <><th scope="col">{item}</th></>;

                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                state.fileUploadedStatus ? state.csvData[1].map((schoolDataArr, index) => {
                                                    // console.log(schoolDataArr[0])
                                                    if (schoolDataArr.length == 1 && schoolDataArr[0] == '') return;

                                                    let isNew = false;
                                                    if (visitedSchools.includes(schoolDataArr[0])) {

                                                    } else {
                                                        isNew = true;
                                                        visitedSchools.push(schoolDataArr[0])
                                                    }



                                                    return <tr>
                                                        <td id={`uploadStatus_${index}`}></td>
                                                        {
                                                            schoolDataArr.map((item, index) => {
                                                                if (state.requiredColumns.includes(index) && item == "") {
                                                                    if (isNew && index > 6) {
                                                                        return <td title={item}>{item}</td>
                                                                    }
                                                                    errorFieds++;
                                                                    return <td className="required_missing">{item}</td>
                                                                }
                                                                return <td title={item}>{item}</td>
                                                            })
                                                        }
                                                    </tr>

                                                }) : <></>
                                            }
                                        </tbody>
                                    </table>
                                </div> : <></>
                        }
                    </div>
                </>
            </Dashboard>
        </>
    )
}

export default AddSchools;