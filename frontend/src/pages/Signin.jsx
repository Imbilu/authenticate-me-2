import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    signInFail,
    signInStart,
    signInSuccess,
} from "../store/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateForm = () => {
        return formData.email && formData.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            dispatch(signInFail({ message: "Please fill in all fields." }));
            return;
        }
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log(res);
            let data;
            if (res.ok) {
                data = await res.json();
                dispatch(signInSuccess(data));
                navigate("/");
            } else {
                dispatch(
                    signInFail({ message: res.statusText || "Sign in failed." })
                );
            }
        } catch (error) {
            dispatch(
                signInFail({
                    message: error.message || "Something went wrong!",
                })
            );
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
            <div>
                <p className="text-red-700 mt-5">
                    {error ? error.message || "Something went wrong!" : ""}
                </p>
            </div>
        </div>
    );
}
