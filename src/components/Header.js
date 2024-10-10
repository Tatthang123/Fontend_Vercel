import React from "react";
import Navigation from "./Navigation";
// import LaunchButton from "./LaunchButton";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <Link className="flex items-center" to="/">
        <Camera className="mr-2" />
        <span className="font-bold text-xl">ASuper</span>
      </Link>
      {/* <div></div> */}
      <Navigation />
      {/* <LaunchButton /> */}
    </header>
  );
};

export default Header;
