import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-4">
      <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
          {/* Left side */}
          <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
              © {year}, made with <i className="fa fa-heart text-red-500"></i> by{" "}
              <a
                href="https://www.creative-tim.com"
                className="font-semibold text-slate-700 dark:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </div>
          </div>

          {/* Right side */}
          <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
            <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Creative Tim
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://creative-tim.com/blog"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-in-out text-slate-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
