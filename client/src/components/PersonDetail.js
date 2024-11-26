import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PersonDetail() {
  const params = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3030/api/persons/${params.urlName}`)
      .then((res) => res.json())
      .then((per) => setPerson(per));
  }, [params.urlName]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      {person ? (
        <>
          <h3>{person.first_name} {person.last_name}</h3>
          <p><strong>Email:</strong> {person.email}</p>
          <p><strong>Gender:</strong> {person.gender}</p>
          <p><strong>Age:</strong> {person.age}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
