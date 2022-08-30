import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container for-responsive-footer">
    <div className="flex-purpose">
      <div className="main">
        <div className="col1">
          <p className="heading">
            Platform
      </p>
          <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/Products">
            <li>Products</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          </ul>
        </div>

        <div className="col2">
          <p className="heading">Resources</p>
          <ul>
          <Link to="/search">
            <li>Search</li>
          </Link>
          <Link to="/">
            <li>FAQ</li>
          </Link>
          </ul>
        </div>

        <div className="col3">
          <p className="heading">Social Media</p>
          <Link to="/">
            <li>instagram</li>
          </Link>
          <Link to="/">
            <li>Facebook</li>
          </Link>
          {/* <a href="#">Contact</a> */}
        </div>
      </div>
      </div>

      {/* <div className="bottom">
        <p className="copyright">
          © 2020 wearcity. All rights reserved.
        </p>

        <div className="policy">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div> */}

    </div>
  );
};

export default Footer;
