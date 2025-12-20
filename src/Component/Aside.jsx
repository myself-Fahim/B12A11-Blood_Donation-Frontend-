import React, { useContext } from "react";
import { NavLink } from "react-router";
import AuthContext from "../AuthProvider/AuthContext";

const Aside = () => {

    const { role } = useContext(AuthContext)
    return (
        <div className="h-screen">
            <div className="drawer lg:drawer-open h-screen">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

                {/* Drawer content (empty area for mobile button) */}
                <div className="lg:hidden fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-50">
                    <label
                        htmlFor="my-drawer-3"
                        className="btn drawer-button rounded-none rounded-r-lg bg-blue-100"
                        style={{ transform: "translateY(-50%) rotate(90deg)", transformOrigin: "left center" }}
                    >
                        Open
                    </label>
                </div>

                <div className="drawer-side h-screen">
                    <label
                        htmlFor="my-drawer-3"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    {/* IMPORTANT: use h-screen (not min-h-full) */}
                    <ul className="menu bg-red-950 text-white h-screen w-80 p-4 overflow-y-auto">
                        <h1 className="text-3xl font-bold mb-8">{String(role).toUpperCase()} PANEL</h1>

                        <div className="flex flex-col">
                            <NavLink to="/dashboard" end className="text-xl font-bold mb-3 py-2 px-2">
                                Home
                            </NavLink>
                            <NavLink to="/dashboard/Profile" className="text-xl font-bold py-2 px-2 mb-3">
                                Profile
                            </NavLink>
                            {
                                role == 'donor' && <NavLink to="/dashboard/request" className="text-xl font-bold py-2 px-2 mb-3">
                                    Add Request
                                </NavLink>
                            }
                            {
                                role == 'donor' && <NavLink to="/dashboard/mydonation" className="text-xl font-bold py-2 px-2 mb-5">
                                    My Donation
                                </NavLink>
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Aside;
