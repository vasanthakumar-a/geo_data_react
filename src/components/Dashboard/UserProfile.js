import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import FileUploadCard from "../Shapes/FileUploadCard";

const UserProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  function handleClick() {
    let dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.className.includes("block")) {
      dropdownMenu.classList.add("hidden");
      dropdownMenu.classList.remove("block");
    } else {
      dropdownMenu.classList.add("block");
      dropdownMenu.classList.remove("hidden");
    }
  }

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      setUser(null);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <div>
      <Dialog
        header="File Upload"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <FileUploadCard visbleFalse={() => setVisible(false)}/>
      </Dialog>
      <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <a href="/">
            <h1>Geo Data App</h1>
          </a>

          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="/">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="/"
                  className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
                >
                  <i className="pi pi-home pr-2"></i>Home
                </a>
              </li>
              {user && (
                <>
                  <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <button
                      onClick={() => {
                        setVisible(true);
                      }}
                      className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                    >
                      <i className="pi pi-upload pr-2"></i>File Upload
                    </button>
                  </li>
                  <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <button
                      onClick={() => {
                        navigate("/new");
                      }}
                      className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                    >
                      <i className="pi pi-pencil pr-2"></i>Custom Draw
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex max-lg:ml-auto space-x-3">
            {user ? (
              <>
                <div className="relative font-[sans-serif] w-max mx-auto">
                  <div
                    className="flex flex-wrap items-center justify-center gap-4 cursor-pointer"
                    id="dropdownToggle"
                    onClick={handleClick}
                  >
                    <img
                      src="https://readymadeui.com/team-1.webp"
                      className="w-12 h-12 rounded-full"
                      alt="no_image"
                    />
                    <div>
                      <p className="text-[15px] text-gray-800 font-bold">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                    </div>
                  </div>

                  <ul
                    id="dropdownMenu"
                    className="absolute hidden shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto"
                  >
                    <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                      <i className="pi pi-sign-out pr-3"></i>
                      Settings
                    </li>
                    <li className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                      <i className="pi pi-user-plus pr-3"></i>
                      Profile Edit
                    </li>
                    <li
                      className="flex items-center py-3 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer"
                      onClick={() => {
                        logoutMutation.mutate();
                      }}
                    >
                      <i className="pi pi-sign-out pr-3"></i>
                      Logout
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </button>
              </>
            )}

            <button id="toggleOpen" className="lg:hidden">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default UserProfile;
