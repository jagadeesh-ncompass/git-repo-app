import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const Navigate = useNavigate();
  const [repo, setrepo] = useState([]);

  const logout = async (event) => {
    Navigate("/", { replace: true });
  };

  const fetchRepo = () => {
    const getToken = localStorage.getItem("token");
    fetch("http://localhost:3000/repositories", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setrepo(data.data);
      });
  };

  useEffect(() => {
    fetchRepo();
  }, []);

  return (
    <>
      <br></br>
      <div>
        <h1>User's Details</h1>
      </div>
      <div>
        <br></br>
        <br></br>
        <table id="table">
          <thead>
            <tr className="table-row">
              <th>Id</th>
              <th>Repository Name</th>
              <th>No of Contributors</th>
              <th>URL of Repositories</th>
              <th>User's Email</th>
            </tr>
          </thead>
          <tbody>
            {repo.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.repository_name}</td>
                  <td>{e.contributors}</td>
                  <td>{e.repository_url}</td>
                  <td>{e.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
        <br></br>
        <div className="button-container">
          <button className="btn" onClick={logout}>
            LOG OUT
          </button>
        </div>
      </div>
    </>
  );
}
