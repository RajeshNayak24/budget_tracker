const plaid = require("plaid");
require("dotenv").config();
const PlaidToken = require("../models/plaidTokenModel");

const client = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
      },
    },
  })
);

exports.createLinkToken = async (req, res) => {
  console.log("🔒 JWT payload:", req.user);
  console.log("🔒 JWT payload userId:", req.user.id);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "No user info in token" });
  }
  try {
    const response = await client.linkTokenCreate({
      user: {
        client_user_id: req.user.id,
      },
      client_name: "Budget Tracker",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    });

    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error(
      "Error creating link token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to create link token" });
  }
};

exports.exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  const userId = req.user.id;

  try {
    console.log("🧪 Received body:", req.body);
    const response = await client.itemPublicTokenExchange({
      public_token,
    });

    const access_token = response.data.access_token;
    const item_id = response.data.item_id;

    const existingToken = await PlaidToken.findOne({ userId });
    if (existingToken) {
      existingToken.access_token = access_token;
      existingToken.item_id = item_id;
      await existingToken.save();
    } else {
      3;
      await PlaidToken.create({
        userId,
        access_token,
        item_id,
      });
    }

    res.json({ access_token, item_id });
  } catch (error) {
    console.error(
      "Error exchanging public token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to exchange token" });
  }
};

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const plaidToken = await PlaidToken.findOne({ userId });

    if (!plaidToken) {
      return res.status(404).json({ error: "Access token not found" });
    }

    const today = new Date();
    const start = new Date(
      today.getFullYear(),
      today.getMonth() - 2,
      today.getDate()
    );
    const end = today;

    const response = await client.transactionsGet({
      access_token: plaidToken.access_token,
      start_date: start.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0],
      options: { count: 50 },
    });

    res.json(response.data.transactions);
  } catch (error) {
    console.error(
      "Error fetching transactions:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};
