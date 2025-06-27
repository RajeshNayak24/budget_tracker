import React from "react";
import { PlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import '../styles/LinkBank.css'

const PlaidLinkButton = ({ token, onSuccess }) => {
  console.log("we are in PlaidLinkButton");
  const navigate=useNavigate()
  return (
    <>
      <button
        className="close-btn"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        &times;
      </button>
      <PlaidLink
        token={token}
        onSuccess={(public_token, metadata) => {
          console.log("✅ Plaid public_token:", public_token);
          console.log("📊 Metadata:", metadata);
          onSuccess(public_token);
        }}
        onExit={(err, metadata) => {
          console.warn("❌ Link exited", err, metadata);
        }}
      className="connectbank">
        Connect your Bank
      </PlaidLink>
    </>
  );
};

export default PlaidLinkButton;
