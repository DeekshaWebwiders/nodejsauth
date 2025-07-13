import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0" aria-expanded="false">
            <div className="h-19">
                <i className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden" sidenav-close></i>
                <Link className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" to="/dashboard">
                    <img src="../assets/img/logo-ct-dark.png" className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
                    <img src="../assets/img/logo-ct.png" className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
                    <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">Dashboard</span>
                </Link>
            </div>

            <div className="px-4">
                {/* Edit Profile link */}
                <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 mt-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700"
                >
                    <i className="fas fa-user mr-2"></i>
                   Edit  Profile
                </Link>

                
            </div>
        </aside>
    );
};

export default Sidebar;
