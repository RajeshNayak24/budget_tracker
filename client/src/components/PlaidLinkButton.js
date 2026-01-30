import React from "react";
import { PlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import "../styles/LinkBank.css";
import { ImExit } from "react-icons/im";

const PlaidLinkButton = ({ token, onSuccess }) => {
  console.log("we are in PlaidLinkButton");
  const navigate = useNavigate();
  return (
    <>
      <button
        className="close-btn"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <ImExit />
      </button>
      <PlaidLink
        token={token}
        onSuccess={(public_token, metadata) => {
          onSuccess(public_token);
        }}
        onExit={(err, metadata) => {
          console.warn(" Link exited", err, metadata);
        }}
        className="connectbank"
      >
        Connect your Bank
      </PlaidLink>
    </>
  );
};

export default PlaidLinkButton;
