import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
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
                />
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
                    Sign In
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Don't have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign Up</span>
                </Link>
            </div>
        </div>
    );
}
