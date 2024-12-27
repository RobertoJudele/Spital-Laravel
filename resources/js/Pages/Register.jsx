// import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Register() {
    const navigate = useNavigate();
    const { token, setToken } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        console.log("Response:", res);

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            console.log("Token:", data.token);
            setToken(data.token);
            navigate("/login");
        }
    }

    return (
        <div className="mx-auto mt-44 rounded-lg bg-slate-300 p-8 max-w-sm">
            <h1 className="title">Create an account</h1>
            <div className="flex flex-col justify-center items-center">
                <form onSubmit={handleRegister} className="m-4">
                    <div className="pb-4">
                        <label for="email">Name</label>
                        <input
                            value={formData.name}
                            className="shadow border rounded-md"
                            type="text"
                            placeholder="John Doe"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                        ></input>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="pb-4">
                        <label for="email">Email</label>
                        <input
                            value={formData.email}
                            className="shadow border rounded-md"
                            type="text"
                            placeholder="example@gmail.com"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        ></input>
                        {errors.email && (
                            <p className="error">{errors.email}</p>
                        )}
                    </div>
                    <div className="pb-4">
                        <label>Password</label>
                        <input
                            value={formData.password}
                            className="shadow border rounded-md"
                            type="password"
                            placeholder="password"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        ></input>
                        {errors.password && (
                                <p className="error">{errors.password}</p>
                            ) &&
                            formData.password.length < 1}
                    </div>
                    <div>
                        <label>Password confrmation</label>
                        <input
                            value={formData.password_confirmation}
                            className="shadow border rounded-md"
                            type="password"
                            placeholder="password confirmation"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password_confirmation: e.target.value,
                                });
                            }}
                        ></input>
                        {errors.password && (
                                <p className="error">{errors.password}</p>
                            ) &&
                            formData.password_confirmation.length < 1}
                        {errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                    </div>
                </form>
                <div>
                    <button
                        onClick={handleRegister}
                        className="bg-blue-500 py-2 px-4 mr-4 rounded-md"
                    >
                        Create account
                    </button>
                </div>
                <Link href="/login" className="text-sm pt-4">
                    Already have an account? Log in here
                </Link>
            </div>
        </div>
    );
}
export default Register;
