import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const userId = 5; // Example user ID

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`/users/${userId}`}>User Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;