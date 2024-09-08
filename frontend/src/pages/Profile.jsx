import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="p-3 max-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <img
                    src={user && user.profilePic}
                    alt="profile picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover bg-gray-300"
                />
                <input
                    defaultValue={user && user.username}
                    type="text"
                    placeholder="Username"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    defaultValue={user && user.email}
                    type="text"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div>
                <span className="text-red-500 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
