import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Home() {
  const [persons, setPersons] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const genderFilter = searchParams.get("gender");
  const ageFilter = parseInt(searchParams.get("age"));

  const displayPersons = persons.filter((person) => {
    const genderCondition = genderFilter
      ? person.gender === genderFilter
      : true;

    const ageCondition = ageFilter ? person.age < ageFilter : true;

    return genderCondition && ageCondition;
  });

  useEffect(() => {
    fetch("http://localhost:3030/api/persons")
      .then((res) => res.json())
      .then((data) => setPersons(data));
  }, []);

  const personsElement = displayPersons.map((person) => {
    return (
      <Link
        to={`/persons/${person.urlName}`}
        key={person.id}
        style={{
          display: "block",
          padding: "15px",
          margin: "10px 0",
          border: "1px solid #ddd",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          textDecoration: "none",
          color: "#333",
        }}
      >
        <p style={{ fontWeight: "bold" }}>{person.first_name} {person.last_name}</p>
        <p>{person.email}</p>
        <p>{person.gender}</p>
        <p>{person.age} years old</p>
      </Link>
    );
  });

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterChange("gender", "Male")}
        >
          Males
        </button>
        <button
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterChange("gender", "Female")}
        >
          Female
        </button>
        <button
          style={{
            marginRight: "10px",
            padding: "10px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterChange("gender", null)}
        >
          Clear Gender Filter
        </button>
        <input
          type="number"
          placeholder="Age Filter"
          onChange={(e) => handleFilterChange("age", e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button
          style={{
            padding: "10px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterChange("age", null)}
        >
          Clear Age Filter
        </button>
      </div>
      {personsElement}
    </>
  );
}
