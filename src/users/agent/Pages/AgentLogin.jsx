import axios from "axios";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AgentAuthScreen from "../Screens/Authentication/AgentAuthScreen";

const AgentLogin = () => {
    const [state, setState] = useState({
        username: "",
        password: "",
        submitProcessing: false,
    })

    const RegisterNow = async () => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { username, password } = state;

        if (username == "" || password == "") return alert("All fields are required")


        const data = { username, password }
        const config = { 'content-type': 'application/json' }
        axios.post(process.env.REACT_APP_NODE_URL + "/agent/login", data).then(res => {
            console.log(res)
            authenticate(res, "agent", () => {
                // alert(res.data.message)
                console.log("Token added as agent_token")
                window.location.href = "/agent/"
            })
            // authenticate with token
            // redirect
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
        })
    }

    const handleInput = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <AgentAuthScreen>
                <>
                    <div className="row min-height-vh-100">
                        <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto mh-100vh">
                            <div className="card card-plain mt-8">
                                <div className="card-header pb-0 text-left bg-transparent">
                                    <h3 className="font-weight-bolder text-info text-gradient">Agent Login</h3>
                                    <p className="mb-0">Enter your username and password to sign in</p>
                                </div>
                                <div className="card-body">
                                    <label>Username</label>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Username" aria-label="Email" aria-describedby="username-addon" name="username" onChange={handleInput} />
                                    </div>
                                    <label>Password</label>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" name="password" onChange={handleInput} />
                                    </div>
                                    {/* <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                        </div> */}
                                    <div className="text-center">
                                        <button type="button" onClick={RegisterNow} className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                                    </div>
                                </div>
                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                    <p className="mb-4 text-sm mx-auto">
                                        Don't have an account?
                                        <Link to={"/agent/register"} className="text-info text-gradient font-weight-bold"> Register</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: 'url("../assets/img/curved-images/curved6.jpg")' }} />
                            </div>
                        </div>
                    </div>
                </>
            </AgentAuthScreen>
        </>
    )
}

export default AgentLogin;