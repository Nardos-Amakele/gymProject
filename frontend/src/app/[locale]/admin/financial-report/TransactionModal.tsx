'use client'
import React, { useState } from "react";
import axios from "axios";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

interface TransactionModalProps {
  transaction: any;
  closeModal: () => void;
  updateTransactions: (updatedTransaction: any, deleted?: boolean) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
    
  transaction,
  closeModal,
  updateTransactions,
}) => {
  const [editedTransaction, setEditedTransaction] = useState({
    ...transaction,
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    axios
      .patch(`http://localhost:5000/api/finance/${transaction.id}`, editedTransaction)
      .then((response) => {
        const updatedTransaction = response.data.transaction;
        updateTransactions(updatedTransaction); 
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating transaction:", error);
        setError("Failed to update the transaction. Please try again.");
      });
  };
    
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/finance/${transaction.id}`)
      .then(() => {
        updateTransactions(transaction, true);
        closeModal();
      })
      .catch((error) => {
        console.log(transaction.id);
        console.error("Error deleting transaction:", error);
        setError("Failed to delete the transaction. Please try again.");
      });
  };

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);



  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="p-6 bg-[#121212] rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-white">Edit Transaction</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex flex-col gap-2 mb-4 text-sm font-extralight text-white">
          <input
            type="text"
            name="name"
            value={editedTransaction.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
          />
          <input
            type="text"
            name="category"
            value={editedTransaction.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
          />
          <input
            type="number"
            name="amount"
            value={editedTransaction.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="px-3 py-2 rounded bg-[#1c1c1c] w-full focus:outline-none focus:ring-[0.5px] focus:ring-customBlue"
          />
          <div className="flex items-center gap-4 mt-2">
            <h2 className="text-sm font-extralight">Type:</h2>
            <label className="text-sm font-extralight flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Expense"
                checked={editedTransaction.type === "Expense"}
                onChange={handleInputChange}
                className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
              />
              Expense
            </label>
            <label className="text-sm font-extralight flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="Income"
                checked={editedTransaction.type === "Income"}
                onChange={handleInputChange}
                className="form-checkbox w-5 h-5 border-2 border-customBlue rounded text-customBlue"
              />
              Income
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded bg-gray-600 text-sm text-white font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsConfirmDeleteOpen(true)}
            className="px-4 py-2 rounded bg-red-600 text-sm text-white font-bold"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 rounded bg-customBlue text-sm text-black font-bold"
          >
            Save
          </button>
        </div>
      </div>

        <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={() => {
          handleDelete();
          setIsConfirmDeleteOpen(false);
        }}
        itemName={transaction.name}
      />

    </div>
  );
};

export default TransactionModal;
