import React from "react";

const Header = () => {
  return (
        <nav className="absolute top-0 z-30 flex flex-wrap items-center justify-between w-full px-4 py-2 mt-6 mb-4 shadow-none lg:flex-nowrap lg:justify-start">
            <div className="container flex items-center justify-between py-0 flex-wrap-inherit">
                <a className="py-1.75 ml-4 mr-4 font-bold text-white text-sm whitespace-nowrap lg:ml-0" href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html" target="_blank"> Argon Dashboard 2 </a>
                <button navbar-trigger className="px-3 py-1 ml-2 leading-none transition-all ease-in-out bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg lg:hidden" type="button" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                    <span bar1 className="w-5.5 rounded-xs duration-350 relative my-0 mx-auto block h-px bg-white transition-all"></span>
                    <span bar2 className="w-5.5 rounded-xs mt-1.75 duration-350 relative my-0 mx-auto block h-px bg-white transition-all"></span>
                    <span bar3 className="w-5.5 rounded-xs mt-1.75 duration-350 relative my-0 mx-auto block h-px bg-white transition-all"></span>
                </span>
                </button>
                <div navbar-menu className="items-center flex-grow transition-all ease duration-350 lg-max:bg-white lg-max:max-h-0 lg-max:overflow-hidden basis-full rounded-2xl lg:flex lg:basis-auto">
                <ul className="flex flex-col pl-0 mx-auto mb-0 list-none lg-max:py-2 lg:flex-row xl:ml-auto">
                    <li>
                    <a className="flex items-center px-4 py-2 mr-2 font-normal text-white transition-all ease-in-out duration-250 lg-max:opacity-0 lg-max:text-slate-700 text-sm lg:px-2 lg:hover:text-white/75" aria-current="page" href="../pages/dashboard.html">
                        <i className="mr-1 text-white lg-max:text-slate-700 fa fa-chart-pie opacity-60"></i>
                        Dashboard
                    </a>
                    </li>
                    <li>
                    <a className="block px-4 py-2 mr-2 font-normal text-white transition-all ease-in-out duration-250 lg-max:opacity-0 lg-max:text-slate-700 text-sm lg:px-2 lg:hover:text-white/75" href="../pages/profile.html">
                        <i className="mr-1 text-white lg-max:text-slate-700 fa fa-user opacity-60"></i>
                        Profile
                    </a>
                    </li>
                    <li>
                    <a className="block px-4 py-2 mr-2 font-normal text-white transition-all ease-in-out duration-250 lg-max:opacity-0 lg-max:text-slate-700 text-sm lg:px-2 lg:hover:text-white/75" >
                        <i className="mr-1 text-white lg-max:text-slate-700 fas fa-user-circle opacity-60"></i>
                        Sign Up
                    </a>
                    </li>
                    <li>
                    <a className="block px-4 py-2 mr-2 font-normal text-white transition-all ease-in-out duration-250 lg-max:opacity-0 lg-max:text-slate-700 text-sm lg:px-2 lg:hover:text-white/75" >
                        <i className="mr-1 text-white lg-max:text-slate-700 fas fa-key opacity-60"></i>
                        Sign In
                    </a>
                    </li>
                </ul>
                
                </div>
            </div>
        </nav>
    );
};

export default Header;
