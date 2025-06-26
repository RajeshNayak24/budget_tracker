import React from "react";
import { PlaidLink } from "react-plaid-link";

const PlaidLinkButton = ({ token, onSuccess }) => {
  console.log("we are in PlaidLinkButton");
  return (
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
    >
      Connect your Bank
    </PlaidLink>
  );
};

export default PlaidLinkButton;
