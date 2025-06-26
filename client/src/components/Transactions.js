// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           "http://localhost:5050/api/plaid/transactions",
//           {}, // no need for access_token
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTransactions(response.data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   if (loading) return <p>Loading transactions...</p>;

//   return (
//     <div className="transactions-list">
//       <h3>📄 Recent Transactions</h3>
//       {transactions.length === 0 ? (
//         <p>No transactions found.</p>
//       ) : (
//         <div className="transactions-scroll-container">
//           <ul>
//             {transactions.map((txn, index) => (
//               <li key={index} className={`transaction-item ${txn.type}`}>
//                 <span className="transaction-description">{txn.date}</span>
//                 <span className="transaction-description">{txn.name}</span>
//                 <span className="transaction-amount">
//                   ${txn.amount.toFixed(2)}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Transactions;
