"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLoggedIn = localStorage.getItem('username');
 

  useEffect(() => {
    const signinStatus = localStorage.getItem("signin");
    if (signinStatus) {
      setIsLoggedIn(JSON.parse(signinStatus) === true);
    }
    
  }, []);
  return (
    <div className="navbar-container">
      <Link className="links" href="/">
        Home
      </Link>
      <Link className="links" href="/about">
        About
      </Link>
      {isLoggedIn && (
        <Link className="links" href="/addblogs">
          Add Blog
        </Link>
      )}
      <Link className="links" href="/getblogs">
        Get Blogs
      </Link>
      {isLoggedIn && (
        <Link className="links" href="/myblogs">
        My Blogs
      </Link>
      )}
      {!isLoggedIn && (
        <Link className="links" href="/signin">
          Sign In
        </Link>
      )}
       {isLoggedIn && (
         <h3 className="ml-[20px] py-[10px] px-[40px]">Hello {userLoggedIn}</h3>
      )}
    </div>
  );
}
