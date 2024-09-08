import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <h1 className="font-bold">Auth App</h1>
                <ul className="flex gap-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>

                    <NavLink to="/profile">
                        {currentUser ? (
                            <img
                                src={currentUser.profilePic}
                                alt="profile"
                                className="h-7 w-7 rounded-full object-cover"
                            />
                        ) : (
                            <li>Sign In</li>
                        )}
                    </NavLink>
                </ul>
            </div>
        </div>
    );
}
