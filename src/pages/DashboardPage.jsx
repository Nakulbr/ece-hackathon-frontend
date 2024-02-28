import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import BonafideCard from "../components/BonafideCard";
import "./DashboardPage.css";
import axiosConfig from "../utils/axiosConfig";
import Form from "../components/Form";

const DashboardPage = () => {
  const user = useSelector((state) => state.user.user);

  const [search, setSearch] = useState({
    studentId: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const [bonafideData, setBonafideData] = useState([]);

  const getStudentData = async () => {
    try {
      const response = await axiosConfig.post("/getReports", search);
      if (response.status == 200) {
        setBonafideData(response.data.bonafideRequests);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosConfig.get("/getReports");
        if (response.status == 200) {
          setBonafideData(response.data.bonafideRequests);
        }
      } catch (error) {
        console.log(error);
        setBonafideData([]);
      }
    };
    if (user === "student") {
      getData();
    }
  }, [isOpen]);

  const refreshData = async () => {
    await getStudentData();
  };

  // Redirect to login if user is not authenticated
  if (!user) window.location.pathname = "/login";

  return (
    <div className="dashboard-container">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="dashboard-header">
        {user !== "student" && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) =>
                setSearch({
                  studentId: e.target.value,
                })
              }
            />
            <button onClick={getStudentData}>Search</button>
          </div>
        )}
        {user === "student" && (
          <button className="request-button" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Cancel Request" : "Create New Request"}
          </button>
        )}
      </div>
      {isOpen && <Form />}

      <hr />

      <div className="bonafide-cards-container">
        {bonafideData.length == 0 ? (
          <div>
            <h1>No Bonafide Found</h1>
          </div>
        ) : (
          bonafideData.map((data) => (
            <BonafideCard
              bonafideData={data}
              key={data.request._id}
              refreshData={refreshData}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
