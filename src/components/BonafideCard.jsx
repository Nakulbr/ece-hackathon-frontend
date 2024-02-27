import React from "react";
import axiosConfig from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import "./BonafideCard.css";

const BonafideCard = ({ bonafideData, refreshData }) => {
  // Add refreshData prop
  const { request, tutorInfo } = bonafideData;
  const user = useSelector((state) => state.user.user);

  const handleAccept = async () => {
    try {
      const response = await axiosConfig.put("/acceptRequest", {
        requestId: request._id,
      });
      if (response.status === 200) {
        alert(response.data.message);
        refreshData(); // Invoke refreshData callback after successful action
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axiosConfig.put("/rejectRequest", {
        requestId: request._id,
      });
      if (response.status === 200) {
        alert(response.data.message);
        refreshData(); // Invoke refreshData callback after successful action
      }
    } catch (error) {
      alert(error);
    }
  };

  const getPDF = async () => {
    try {
      const response = await axiosConfig.get(`/getBonafide/${request._id}`, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "bonafide.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error downloading PDF");
    }
  };

  return (
    <div className="bonafide-card-container">
      <div className="bonafide-card">
        <div className="bonafide-details">
          <div>
            <strong>Student ID:</strong> {request.studentId}
          </div>
          <div>
            <strong>Reason:</strong> {request.reason}
          </div>
          {request.tutorVerify != null && (
            <div>
              <strong>Tutor Responsible:</strong> {request.tutorVerify}
            </div>
          )}
          <div>
            <strong>Tutor Approved:</strong>{" "}
            {request.tutorApproved == null
              ? "Pending"
              : request.tutorApproved
              ? "Approved"
              : "Not Approved"}
          </div>
          <div>
            <strong>Admin Approved:</strong>{" "}
            {request.adminApproved == null
              ? "Pending"
              : request.adminApproved
              ? "Approved"
              : "Not Approved"}
          </div>
          <div>
            <strong>Created At:</strong>{" "}
            {new Date(request.createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Updated At:</strong>{" "}
            {new Date(request.updatedAt).toLocaleString()}
          </div>
          {tutorInfo && (
            <div className="tutor-info">
              <h3>Tutor Info</h3>
              <hr />
              <div>
                <strong>Name:</strong> {tutorInfo.name}
              </div>
              <div>
                <strong>Department:</strong> {tutorInfo.department}
              </div>
              <div>
                <strong>Mail:</strong> {tutorInfo.mail}
              </div>
            </div>
          )}
        </div>
        {!user || user !== "student" ? (
          <div className="actions">
            <button className="accept-btn" onClick={handleAccept}>
              Accept
            </button>
            <button className="reject-btn" onClick={handleReject}>
              Reject
            </button>
            {user === "admin" && (
              <button
                className="get-pdf-btn"
                onClick={getPDF}
                disabled={
                  request.tutorApproved != true || request.adminApproved != true
                }
              >
                Get PDF
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BonafideCard;
