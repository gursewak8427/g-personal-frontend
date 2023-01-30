import React from "react";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AgentAuthScreen from "../Screens/Authentication/AgentAuthScreen";
// import { Form, div, FormControl, FormLabel, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";


const AgentRegister = () => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        first_name: Yup.string()
            .required('First name is required'),
        last_name: Yup.string()
            .required('Last name is required'),
        street: Yup.string()
            .required('Street is required'),
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
        country: Yup.string()
            .required('Country is required'),
        postalcode: Yup.string()
            .required('Postal code is required'),
        phone: Yup.string()
            .required('Phone number is required')
    });

    const handleSubmit = (values) => {
        const config = { 'content-type': 'application/json' }
        axios.post(process.env.REACT_APP_NODE_URL + "/agent/register", values).then(res => {
            // redirect
            window.location.href = "/agent/"
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
        })
    };



    return (
        <>
            <AgentAuthScreen>
                <>   <div className="row min-height-vh-100">
                    <div className="col-xl-5 col-lg-5 col-md-6 d-flex flex-column mx-auto mh-100vh">
                        <div className="card card-plain formdata">
                            <div className="card-header pb-0 text-left bg-transparent">
                                <h3 className="font-weight-bolder text-info text-gradient">Agent Register</h3>
                            </div>

                            <div className="card-body">

                                <Formik
                                    initialValues={{
                                        email: '',
                                        first_name: '',
                                        last_name: '',
                                        street: '',
                                        city: '',
                                        state: '',
                                        country: '',
                                        postalcode: '',
                                        phone: ''
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ touched, errors, isSubmitting, values }) => (
                                        <Form>
                                            <div className="row">
                                                <div className="mb-2 col-6">
                                                    <label for="email">Email</label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="text-sm text-danger" />
                                                </div>
                                                <div className="mb-2 col-6">
                                                    <label for="first_name">First Name</label>
                                                    <Field
                                                        type="text"
                                                        name="first_name"
                                                        id="first_name"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="first_name" component="div" className="text-sm text-danger" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-2 col-6">
                                                    <label for="last_name">Last Name</label>
                                                    <Field
                                                        type="text"
                                                        name="last_name"
                                                        id="last_name"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="last_name" component="div" className="text-sm text-danger" />
                                                </div>
                                                <div className="mb-2 col-6">
                                                    <label for="street">Street</label>
                                                    <Field
                                                        type="text"
                                                        name="street"
                                                        id="street"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="street" component="div" className="text-sm text-danger" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-2 col-6">
                                                    <label for="city">City</label>
                                                    <Field
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="city" component="div" className="text-sm text-danger" />
                                                </div>
                                                <div className="mb-2 col-6">
                                                    <label for="state">State</label>
                                                    <Field
                                                        type="text"
                                                        name="state"
                                                        id="state"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="state" component="div" className="text-sm text-danger" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-2 col-6">
                                                    <label for="country">Country</label>
                                                    <Field
                                                        type="text"
                                                        name="country"
                                                        id="country"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="country" component="div" className="text-sm text-danger" />
                                                </div>
                                                <div className="mb-2 col-6">
                                                    <label for="postalcode">Postalcode</label>
                                                    <Field
                                                        type="number"
                                                        name="postalcode"
                                                        id="postalcode"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="postalcode" component="div" className="text-sm text-danger" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-2 col-6">
                                                    <label for="phone">Phone</label>
                                                    <Field
                                                        type="number"
                                                        name="phone"
                                                        id="phone"
                                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                    />
                                                    <ErrorMessage name="phone" component="div" className="text-sm text-danger" />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Register</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                <p className="mb-4 text-sm mx-auto">
                                    Already have an account?
                                    <Link to="/agent/login" className="text-info text-gradient font-weight-bold"> Login</Link>
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
            </AgentAuthScreen>
        </>
    )
}

export default AgentRegister;