"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Receipt,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type TransactionType =
  | "Trip revenue"
  | "Fuel refill"
  | "Maintenance"
  | "Insurance"
  | "Other";

interface Transaction {
  id: string;
  vehicle: string;
  type: TransactionType;
  amount: number;
  positive: boolean;
  date: string;
  note: string;
}

interface TransactionFormData {
  vehicle: string;
  type: TransactionType;
  amount: string;
  direction: "Income" | "Expense";
  date: string;
  note: string;
}

const emptyForm: TransactionFormData = {
  vehicle: "",
  type: "Trip revenue",
  amount: "",
  direction: "Income",
  date: "",
  note: "",
};

const initialTransactions: Transaction[] = [
  {
    id: "1",
    vehicle: "Toyota Hilux — ZM 4021",
    type: "Trip revenue",
    amount: 850,
    positive: true,
    date: "Today, 10:24 AM",
    note: "Lusaka to Kabwe delivery run",
  },
  {
    id: "2",
    vehicle: "Isuzu D-Max — ZM 1187",
    type: "Fuel refill",
    amount: -420,
    positive: false,
    date: "Today, 8:02 AM",
    note: "Full tank at Puma, Great East Rd",
  },
  {
    id: "3",
    vehicle: "Toyota Coaster — ZM 7734",
    type: "Maintenance",
    amount: -1200,
    positive: false,
    date: "Yesterday, 4:41 PM",
    note: "Brake pad replacement",
  },
  {
    id: "4",
    vehicle: "Nissan Navara — ZM 5502",
    type: "Trip revenue",
    amount: 640,
    positive: true,
    date: "Yesterday, 1:15 PM",
    note: "Ndola client pickup",
  },
  {
    id: "5",
    vehicle: "Toyota Hilux — ZM 4021",
    type: "Trip revenue",
    amount: 910,
    positive: true,
    date: "Mon, 9:30 AM",
    note: "Chirundu border haul",
  },
];

const typeStyles: Record<TransactionType, string> = {
  "Trip revenue": "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  "Fuel refill": "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Maintenance: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
  Insurance: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
  Other: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
};

const TransactionsPage = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TransactionFormData>(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.vehicle.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q) ||
      t.note.toLowerCase().includes(q)
    );
  });

  const totalIn = transactions
    .filter((t) => t.positive)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOut = transactions
    .filter((t) => !t.positive)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const net = totalIn - totalOut;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyForm);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.vehicle || !formData.amount) {
      setError("Vehicle and amount are required.");
      return;
    }

    const numericAmount = Math.abs(Number(formData.amount));
    if (Number.isNaN(numericAmount) || numericAmount === 0) {
      setError("Please enter a valid amount.");
      return;
    }

    // Hook up to your "create transaction" API call here
    const isIncome = formData.direction === "Income";
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      vehicle: formData.vehicle,
      type: formData.type,
      amount: isIncome ? numericAmount : -numericAmount,
      positive: isIncome,
      date: formData.date || "Just now",
      note: formData.note,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track income and expenses across your fleet.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition self-start sm:self-auto"
          >
            <Plus size={17} />
            Add Transaction
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium mb-1.5">
              <ArrowUpRight size={14} />
              Total Income
            </div>
            <div className="text-xl font-bold text-gray-900">
              K{totalIn.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-medium mb-1.5">
              <ArrowDownRight size={14} />
              Total Expenses
            </div>
            <div className="text-xl font-bold text-gray-900">
              K{totalOut.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mb-1.5">
              <Receipt size={14} />
              Net Cash Flow
            </div>
            <div
              className={`text-xl font-bold ${net >= 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {net >= 0 ? "+" : "-"}K{Math.abs(net).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vehicle, type, note..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Note</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/60 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            t.positive ? "bg-emerald-50" : "bg-rose-50"
                          }`}
                        >
                          {t.positive ? (
                            <ArrowUpRight size={16} className="text-emerald-600" />
                          ) : (
                            <ArrowDownRight size={16} className="text-rose-600" />
                          )}
                        </div>
                        <div className="font-medium text-gray-900">
                          {t.vehicle}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${typeStyles[t.type]}`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 max-w-[220px] truncate">
                      {t.note || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{t.date}</td>
                    <td
                      className={`px-5 py-3.5 text-right font-medium ${
                        t.positive ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {t.positive ? "+" : "-"}K{Math.abs(t.amount).toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right relative">
                      <button
                        onClick={() =>
                          setOpenMenuId((id) => (id === t.id ? null : t.id))
                        }
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition"
                        aria-label="Open actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === t.id && (
                        <div className="absolute right-5 top-11 z-10 w-36 rounded-lg border border-gray-200 bg-white shadow-lg py-1 text-left">
                          <button
                            onClick={() => setOpenMenuId(null)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Transaction
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm text-rose-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="vehicle"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Vehicle<span className="text-rose-500">*</span>
                </label>
                <input
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  placeholder="Toyota Hilux — ZM 4021"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  >
                    <option value="Trip revenue">Trip revenue</option>
                    <option value="Fuel refill">Fuel refill</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="direction"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Direction
                  </label>
                  <select
                    id="direction"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Amount (K)<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="850"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Short description of this transaction"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2.5 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;