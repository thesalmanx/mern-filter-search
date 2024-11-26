import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const headerStyle = {
    padding: "20px",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  };

  return (
    <>
      <header style={headerStyle}>
        <h1>Welcome to Salman's Database</h1>
      </header>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/form" style={linkStyle}>
          Add Person
        </Link>
      </nav>
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </>
  );
}
