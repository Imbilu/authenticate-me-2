import React from "react";

export default function Home() {
    return (
        <div className="px-4 py-12 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-slate-700">
                Welcome to my Auth App!
            </h1>
            <p className="mb-4  text-slate-700">
                This is a fullstack authentication app built with an express
                server in the backend and connected to a MongoDB database. The
                frontend is built using React and the redux toolkit for state
                management. AUthentication is implemented using JSON Web token.
                The app also has google OAuth allowing users to sign up and log
                in with their google accounts.
            </p>
        </div>
    );
}
