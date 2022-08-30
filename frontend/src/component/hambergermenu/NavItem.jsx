import React from "react";
import {Link} from "react-router-dom";
import NavbarContent from "./NavbarContent";

const NavItem = ({ href, text, active }) => {
   return (
      <Link to={href}>
         <div
            className={`
          nav__link ${active ? "active" : ""}
          `}
         >
         <NavbarContent />

         </div>
      </Link>
   );
};

export default NavItem;
