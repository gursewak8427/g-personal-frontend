import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AuthScreen from "../Screens/Authentication/StudentAuthScreen";

const StudentRegister = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        submitProcessing: false,
    })

    const RegisterNow = async (values) => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { email, password, confirmPassword, firstName, lastName, phone } = values;
        if (password != confirmPassword) return alert("Both passwords should be same")
        const data = { email, password, firstName, lastName, phone }
        const config = { 'content-type': 'application/json' }

        axios.post(process.env.REACT_APP_NODE_URL + "/student/register", data).then(res => {
            window.location.href = "/student/login"
        }).catch(err => {
            console.log(err.response.data)
            if (err.response.data.name == "ValidationError") {
                let errors = err.response.data.details.error
                let msg = ""
                for (const key in errors) {
                    msg += errors[key] += "\n"
                    console.log([key, errors[key]])
                }
                alert(msg)
                return;
            }
            alert(err.response.data.message)
        })
    }

    const ValidationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("First Name is required"),
        lastName: Yup.string()
            .required("Last Name is required"),
        phone: Yup.string()
            .min(10, "Phone must be 10 character at minimum")
            .required("Phone is required"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters at minimum")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .min(6, "Confirm Password must be 6 characters at minimum")
            .required("Confirm Password is required")
    });

    return (
        <>
            <AuthScreen>
                <>
                    <div className="row min-height-vh-100">
                        <div className="col-xl-5 col-lg-5 col-md-6 d-flex flex-column mx-auto mh-100vh">
                            <div className="card card-plain formdata">
                                <div className="card-header pb-0 text-left bg-transparent">
                                    <h3 className="font-weight-bolder text-info text-gradient">Student Register</h3>
                                </div>

                                <div className="card-body">
                                    <Formik
                                        initialValues={{ email: "", password: "", firstName: "", lastName: "", phone: "", confirmPassword: "" }}
                                        validationSchema={ValidationSchema}
                                        onSubmit={(values) => {
                                            console.log(values)
                                            RegisterNow(values);
                                            // alert("Form is validated and in this block api call should be made...");
                                        }
                                        }
                                    >
                                        {({ touched, errors, isSubmitting, values }) => {
                                            { console.log({ touched, errors, isSubmitting, values }) }
                                            return <Form>
                                                <div className="row">
                                                    <div className="mb-2 col-6">
                                                        <label>First Name</label>
                                                        <Field type="text" className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`} placeholder="firstName" aria-label="firstName" aria-describedby="firstName-addon" name="firstName" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="firstName"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-2 col-6">
                                                        <label>Last Name</label>
                                                        <Field type="text" className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`} placeholder="lastName" aria-label="lastName" aria-describedby="lastName-addon" name="lastName" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="lastName"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">

                                                    <div className="mb-2 col-6">
                                                        <label>Phone</label>
                                                        <Field type="text" className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`} placeholder="Phone" aria-label="Phone" aria-describedby="phone-addon" name="phone" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="phone"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>

                                                    <div className="mb-2 col-6">
                                                        <label>Email</label>
                                                        <Field type="email" className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`} placeholder="Email" aria-label="Email" aria-describedby="email-addon" name="email" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="email"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-2">
                                                    <label>Password</label>
                                                    <Field type="password" className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`} placeholder="Password" aria-label="Password" aria-describedby="password-addon" name="password" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="password"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label>Confrim password</label>
                                                    <Field type="password" className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`} placeholder="confirmPassword" aria-label="confirmPassword" aria-describedby="confirmPassword-addon" name="confirmPassword" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="confirmPassword"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Register</button>
                                                </div>
                                            </Form>
                                        }}
                                    </Formik>
                                </div>
                                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                    <p className="mb-4 text-sm mx-auto">
                                        Already have an account?
                                        <Link to="/student/login" className="text-info text-gradient font-weight-bold">Login</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="oblique position-fixed top-0 h-100 d-md-block d-none me-n8">
                                <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: 'url("../assets/img/curved-images/curved6.jpg")' }} />
                            </div>
                        </div>
                    </div>
                </>
            </AuthScreen>
        </>
    )
}

export default StudentRegister;