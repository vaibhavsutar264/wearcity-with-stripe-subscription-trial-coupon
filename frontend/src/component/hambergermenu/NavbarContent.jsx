import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useAnimation, motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const topBottomVariants = {
//    visible: { y: 0, opacity: 1, transition: { delay: 1, duration: 1.5 } },
//    hidden: { y: -50, opacity: 0 },
// };

const NavbarContent = () => {
//    const controls = useAnimation();
//    const [ref, inView] = useInView();
//    useEffect(() => {
//       if (inView) {
//          controls.start("visible");
//       }
//    }, [controls, inView]);
   return (
    //   <motion.div
    //      ref={ref}
    //      animate={controls}
    //      initial="hidden"
    //      variants={topBottomVariants}
    //      className="nav-menu col-12"
    //   >
      <div className="nav-menu col-12">
         <div className="nav-menu-inner-container-1">
            <div className="nav-link-wrapper">
               <Link to="/" className="nav-link">
                  <strong>HOME</strong>
               </Link>
               <Link to="/products" className="nav-link">
                  <strong>PRODUCTS</strong>
               </Link>
               <Link to="/about" className="nav-link">
                  <strong>ABOUT US</strong>
               </Link>
               <Link to="/contact" className="nav-link">
                  <strong>CONTACT US</strong>
               </Link>
               <Link to="/search" className="nav-link">
                  <strong>SEARCH</strong>
               </Link>
               <Link to="/cart" className="nav-link">
                  <strong>CART</strong>
               </Link>
               <Link to="/login" className="nav-link">
                  <strong>PROFILE</strong>
               </Link>
            </div>
         </div>
      {/* </motion.div> */}
      </div>
   );
};

export default NavbarContent;
