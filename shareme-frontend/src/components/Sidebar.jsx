import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../utils/data";

import logo from "../assets/logo.png";

const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    };

    return (
        <div className="hide-scrollbar flex h-full min-w-210 flex-col justify-between overflow-y-scroll bg-white">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="my-6 flex w-190 items-center gap-2 px-5 pt-1"
                    onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? isActiveStyle : isNotActiveStyle
                        }
                        onClick={handleCloseSidebar}>
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">
                        Discover cateogries
                    </h3>
                    {categories.slice(0, categories.length).map(category => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) =>
                                isActive ? isActiveStyle : isNotActiveStyle
                            }
                            onClick={handleCloseSidebar}
                            key={category.name}>
                            <img
                                src={category.image}
                                alt="category"
                                className="h-8 w-8 rounded-full shadow-sm"
                            />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="my-5 mx-3 mb-3 flex items-center gap-2 rounded-lg bg-white p-2 shadow-lg"
                    onClick={handleCloseSidebar}>
                    <img
                        src={user.image}
                        className="h-10 w-10 rounded-full"
                        alt="user-profile"
                    />
                    <p>{user.userName}</p>
                    <IoIosArrowForward />
                </Link>
            )}
        </div>
    );
};

export default Sidebar;
