import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/MyAccountPage.css";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const MyAccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowSidebar(true); // always show on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchuser = localStorage.getItem("user");
    if (fetchuser) {
      const fetcheduser = JSON.parse(fetchuser);
      setUser({ name: fetcheduser.name, email: fetcheduser.email });
    }
  }, []);

  return (
    <div className="app-layout">
      {isMobile && (
        <button
          className="mobile-toggle-button"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          ☰
        </button>
      )}

      <Sidebar
        isMobile={isMobile}
        isVisible={showSidebar}
        setIsVisible={setShowSidebar}
      />
      <main className="account-content">
        <h1 className="account-title">👤 My Account</h1>

        <section className="account-info-card">
          <h2>Account Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </section>

        <section className="update-password-section">
          <UpdatePasswordForm />
        </section>
      </main>
    </div>
  );
};

export default MyAccountPage;
