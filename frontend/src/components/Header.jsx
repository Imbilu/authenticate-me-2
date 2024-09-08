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
                                src="data:image/png;base64,
            iVBORw0KGgoAAAANSUhEUgAAALAAAACUCAMAAAAEVFNMAAAAMFBMVEXk5ueutLfp6uu+w8WrsbTHy821ur3h4+SorrLKztC5vsHe4OLr7e7b3t/S1dfV2Nr5rpp2AAAEJklEQVR4nO2c25KkIAxAJVxFkf//20Xty3Q72w0EE6bK8zbzdCoVQ4DQw3BxcXFxcXFxcXFxcXFx8cexCW6HLGCY4jJquaLHJU7pP/0CELT0Qj0RRo4TdOoMgzZCKPFK+tssXYZ50u5d9o5T48St9wZYfYjti7IYuRVfmBfzSXdLDR9mbs0n8pvuFmXNrXknfA3vzdj3kckx0zelhQkdlIuYq7sp8xtHV+CbjCO3b0l8NwKrbyjVTXnM6Wuzv7efxnxpPGfV33f46jEsZR/cg4UpxlOdblqlmXr7qoTYjHmSorxCPI1ZQlwd4CQsGbI4VH5xuzH98gG+PsAJ+hBPKF9hqDtN0ChfochrsUcKS+JCEXG+CWLhEZfCqaOgbYwtogjvKEkrbJC+yZh01z9hVo0dR+lbupP7VZh0sdPYFE4pMRJWYpBoXyE0pTBy2digbCfmBr7CUwrjUzj1P5fw2cJ0vn8wwg18ST86wLcSxMK4Dd0O6bbury3NQ+2p2g9oO3jUocRNmHSPZNG+wpE28Bbf/VAWiaHBV+do73JhwQbYER/9oHeh1Ifa2D0H+Zk2LMgkJr9gBJwv7THKJowKMf3hZQIVYY6LL0Q/QXwSeMNW95jKc/hiFg+mGYTa4xSme8XVuConmBJiEy4f71iFJ8YxmoqmzZFujQ4UXx3wJfAOFBpz+yaKqrGj7yEOlFwo9eC73uJmGqteRlzTkpejrExkHwu8AUF+b4Sc5Ky/Bxb1LcjcM4xvrAPw/3VWyuj+JvdhGv2vykr5patseGKDVm+T+8oJzTse+hkAu2wHAEasBxdGjnbuM7hPIBlOIcYY7DD3l7kHIDHfga6Fk5wNcX2H5L1JeO+350hh6Ex7FZ3Cor1wK+r1m9v+lXI5hsn28MIHIAVVrq4fFw6lVmu9BF7n9XWXN+LrIvewFsbIOLC9mDlW3Sxt5xf64VYYohYVtjtOySVQfolzWoWzOsr/hzllNJkyTPL4zq/CWXiaI8zgq1PhHSdOz2aIMrcmZKH8aE8MM1jZIBdejZU5LzGsbhrdh7M5qVuOraP7MHYn5EUqDSfpbsrNCwacFt67cuM5QY0fN/iCa/j8EqYWEzPfUM3eVEE4OR0eyo3SAntJW2Dc4qwQ0OP5Jcb464+Z0reBMWl8WxhT+yKN8YMyNcb1E4OAfNFVa6xrd6kNhtPqjGtXkDPbnc9UnXeSF4gndR+eZfOtm3xtMtNcTfkYXvUz9kYUJ0WD92coSitF9u3macKFo461vxPQDrcUBZivpD0oeuaBnFNsQtFsW4MHiXgKQtzkuRwalV+LubqeN7KXO5Y2+Eh+R1E6eHQWJrdpa/DmoQ25q11gXpbvqMwRIfR4eyuyf9Khg2VuJ7ef4G58nuQJW6k6IbONt/sPmXZA7m8MQjfk+fbNP0nUOaYuq8XQAAAAAElFTkSuQmCC"
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
