import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import Header from "../Home/Header";
import "./HambergerMenu.css"
// import data from "./data/data.json";

const MENU_LIST = [
   {
      text: "content will shown here in a while",
      href: "/Home",
   },
];
const Navbar = () => {
   const [navActive, setNavActive] = useState(false);
   const [activeIdx, setActiveIdx] = useState(0);
   return (
      <header>
         <nav className="navbar-main container">
            <Header/>
            <div
               onClick={() => setNavActive(!navActive)}
               className="nav__menu-bar"
            >
               <div></div>
               <div></div>
               <div></div>
            </div>
            <div className={`${navActive ? "active" : ""} nav__menu-list`}>
               {MENU_LIST.map((menu, idx) => {
                  // here menu means item in MENU_LIST
                  return (
                     <div className="navbar-content-part"
                        onClick={() => {
                           setActiveIdx(idx);
                           setNavActive(false);
                        }}
                        key={menu.text}
                     >
                        <NavItem {...menu} />
                        {/* ...menu means MENU_LIST item */}
                     </div>
                  );
               })}
            </div>
         </nav>
      </header>
   );
};

export default Navbar;