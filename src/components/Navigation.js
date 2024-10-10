import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { clearToken } from "../redux/feature/authSlice";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, email, username } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    "Products",
    "Community",
    "Pricing",
    "Learn",
    "Contact Sales",
  ];

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("accessToken");
    dispatch(clearToken()); // Gọi action để xóa token trong Redux store
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="hidden md:flex space-x-4 items-center">
      {navItems.map((item) => (
        <a key={item} href="#" className="text-gray-600 hover:text-gray-900">
          {item}
        </a>
      ))}

      {email && userId ? (
        <>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="User Avatar"
              />
            </button>

            {isDropdownOpen && (
              <div
                className="z-50 absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {username}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {email}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout} // Gọi hàm handleLogout khi nhấn vào "Sign out"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <button onClick={handleLoginClick} className="text-gray-600 hover:text-gray-900">
          Login
        </button>
      )}
    </nav>
  );
};

export default Navigation;
