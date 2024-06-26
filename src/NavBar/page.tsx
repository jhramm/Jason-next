import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <div className="navbar-container">
      <Link className="links" href="/">
        Home
      </Link>
      <Link className="links" href="/about">
        About
      </Link>
      <Link className="links" href="/recipes">
        Recipes
      </Link>
      <Link className="links" href="/addblogs">
        Add Blog
      </Link>
      <Link className="links" href="/getblogs">
        Get Blogs
      </Link>
    </div>
  );
}
