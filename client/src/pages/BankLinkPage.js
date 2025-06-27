import React, { useEffect, useState } from "react";
import PlaidLinkButton from "../components/PlaidLinkButton";
import axios from "axios";
import "../styles/LinkBank.css";

const BankLinkPage = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("we are in the  createLinkToken BankLinkPage!");
        console.log("createLinkToken:", token);
        const response = await axios.post(
          "http://localhost:5050/api/plaid/create-link-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLinkToken(response.data.link_token);
        console.log("🔗 link_token:", response.data.link_token);
      } catch (err) {
        console.error("Error fetching link token:", err);
      }
    };
    createLinkToken();
  }, []);

  const handleSucess = async (publicToken) => {
    const token = localStorage.getItem("token");
    try {
      console.log("we are in the BankLinkPage exchanging token!", publicToken);
      console.log("Sending body:", { public_token: publicToken });
      const response = await axios.post(
        "http://localhost:5050/api/plaid/exchange-token",
        {
          public_token: publicToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("🎉Access token saved:", response.data);
    } catch (err) {
      console.error("Error exchanging token:", err);
    }
  };

  return (
    <>
      <div className="linkbank-layout">
        <h2>🏦 Connect Your Bank Account</h2>
        <div className="linkToken">
          {linkToken ? (
            <PlaidLinkButton token={linkToken} onSuccess={handleSucess} />
          ) : (
            <div className="spinner"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default BankLinkPage;
