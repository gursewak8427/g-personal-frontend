import React, { useState } from "react";
import Logo from "../images/logo.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Can from "../images/can.jpg";
import Russ from "../images/russ.jpg";
import Usa from "../images/usa.png";

export default function Header() {
  const [headerClassName, setHeaderClassName] = useState("");

  const handleScroll = (headerClassName) => {
    if (headerClassName !== "menuscroll" && window.pageYOffset >= 100) {
      setHeaderClassName("menuscroll");
    } else if (headerClassName === "menuscroll" && window.pageYOffset < 100) {
      setHeaderClassName("");
    }
  };

  React.useEffect(() => {
    window.onscroll = () => handleScroll(headerClassName);
  }, [headerClassName]);
  return (
    <div>
      <div
        className={
          headerClassName
            ? `${headerClassName}` + "header-part "
            : "header-part "
        }
        id="header_menu"
      >
        <div className="top-bar flex py-2 px-4 lg:px-0   border-b">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 items-center">
              <div className="my-3 lg:my-0">
                <a
                  className="mail-link text-center lg:text-left text-black  block text-sm tracking-widest"
                  href="mailto:info@learnglobal.com"
                >
                  <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
                  info@learnglobal.com
                </a>
              </div>
              <div className="flex items-center justify-center  gap-4 pl-4 mb-5 lg:mb-0">
                <Link to="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </Link>
                <Link to="#">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </Link>
              </div>

              <div>
                <div class="flex justify-center lg:justify-end ">
                  <div class="w-full lg:w-[80%]">
                    <input
                      type="search"
                      className="
        form-control
        text-center
        block
        w-100
        px-10
        py-1.5
        text-sm
        font-normal
        text-black
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded-full
        transition
        ease-in-out
        m-0
        lg:ml-auto
        focus:text-gray-700 focus:bg-white  focus:outline-none
      "
                      id="exampleSearch"
                      placeholder="Search Your Program ......."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav class="border-gray-200 px-2 sm:px-4 py-2.5 rounded light:bg-gray-800">
          <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="/" className="logo flex items-center">
              <img src={Logo} alt="Logo" width={"200px"} />
            </a>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                class="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul class="header-menus flex items-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    to="/"
                    class="block text-sm py-2 pr-4 pl-3   rounded md:bg-transparent text-gray-700 md:p-0 dark:text-dark"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    class="block text-sm py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Discover School
                  </a>
                </li>
                <li>
                  <Link
                    to={"/d/"}
                    class="block text-sm py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Login/Signup
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    class="block text-sm py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
                <li className="relative">
                  <a
                    href="#"
                    class="block text-sm py-2 pr-4 pl-3 hover:text-black  hover:bg-gray-50 md:hover:bg-transparent md:border-0  md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Country{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <ul className="head-sub-menus absolute">
                      <li>
                        <a className="flex items-center" href="#">
                          <img src={Can} alt="" />
                          canada
                        </a>
                      </li>
                      <li>
                        <a className="flex items-center" href="#">
                          <img src={Russ} alt="" />
                          russia
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={Usa} alt="" />
                          USA
                        </a>
                      </li>
                    </ul>
                  </a>
                </li>
                <li>
                  <button className="bg-[#059669] hover:bg-[#065f46] text-white py-2 px-4 rounded-full">
                    <Link
                      to={"/eligible"}
                      className="text-white hover:text-white "
                    >
                      Apply Now
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
