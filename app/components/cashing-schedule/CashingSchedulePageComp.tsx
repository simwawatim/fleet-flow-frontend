"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Wallet,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  CalendarClock,
} from "lucide-react";

type DueDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface CashingSchedule {
  id: number;
  weeklyCashingAmount: string;
  monthlyCashingAmount: string;
  yearlyCashingAmount: string;
  dueDay: DueDay;
  createdAt: string;
  updatedAt: string;
  driver: number;
  vehicle: number;
}

interface CashingFormData {
  weeklyCashingAmount: string;
  monthlyCashingAmount: string;
  yearlyCashingAmount: string;
  dueDay: DueDay;
  driver: string;
  vehicle: string;
}

const emptyForm: CashingFormData = {
  weeklyCashingAmount: "",
  monthlyCashingAmount: "",
  yearlyCashingAmount: "",
  dueDay: "Monday",
  driver: "",
  vehicle: "",
};

const driverNames: Record<number, string> = {
  0: "Mumba Chanda",
  1: "Joseph Banda",
  2: "Grace Mulenga",
  3: "Kelvin Zulu",
};

const vehicleNames: Record<number, string> = {
  0: "Toyota Hilux — ZM 4021",
  1: "Isuzu D-Max — ZM 1187",
  2: "Toyota Coaster — ZM 7734",
  3: "Nissan Navara — ZM 5502",
};

const initialSchedules: CashingSchedule[] = [
  {
    id: 0,
    weeklyCashingAmount: "-666.93",
    monthlyCashingAmount: "383.20",
    yearlyCashingAmount: "0.00",
    dueDay: "Monday",
    createdAt: "2026-07-14T09:54:19.635Z",
    updatedAt: "2026-07-14T09:54:19.635Z",
    driver: 0,
    vehicle: 0,
  },
  {
    id: 1,
    weeklyCashingAmount: "1250.00",
    monthlyCashingAmount: "5000.00",
    yearlyCashingAmount: "60000.00",
    dueDay: "Friday",
    createdAt: "2026-07-10T08:12:00.000Z",
    updatedAt: "2026-07-12T14:30:00.000Z",
    driver: 1,
    vehicle: 3,
  },
  {
    id: 2,
    weeklyCashingAmount: "-320.50",
    monthlyCashingAmount: "-1100.00",
    yearlyCashingAmount: "-8400.00",
    dueDay: "Wednesday",
    createdAt: "2026-06-28T11:00:00.000Z",
    updatedAt: "2026-07-05T09:45:00.000Z",
    driver: 2,
    vehicle: 2,
  },
];

const dueDayOptions: DueDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatAmount = (value: string) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  const sign = num < 0 ? "-" : "";
  return `${sign}K${Math.abs(num).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CashingSchedulePageComp = () => {
  const [schedules, setSchedules] = useState<CashingSchedule[]>(initialSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CashingFormData>(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const filteredSchedules = schedules.filter((s) => {
    const q = search.toLowerCase();
    const driverName = driverNames[s.driver] ?? `Driver #${s.driver}`;
    const vehicleName = vehicleNames[s.vehicle] ?? `Vehicle #${s.vehicle}`;
    return (
      driverName.toLowerCase().includes(q) ||
      vehicleName.toLowerCase().includes(q) ||
      s.dueDay.toLowerCase().includes(q)
    );
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    if (!formData.driver || !formData.vehicle) {
      setError("Driver and vehicle are required.");
      return;
    }
    if (!formData.weeklyCashingAmount) {
      setError("Weekly cashing amount is required.");
      return;
    }

    // Hook up to your "create cashing schedule" API call here
    const now = new Date().toISOString();
    const newSchedule: CashingSchedule = {
      id: schedules.length ? Math.max(...schedules.map((s) => s.id)) + 1 : 0,
      weeklyCashingAmount: formData.weeklyCashingAmount,
      monthlyCashingAmount: formData.monthlyCashingAmount || "0.00",
      yearlyCashingAmount: formData.yearlyCashingAmount || "0.00",
      dueDay: formData.dueDay,
      createdAt: now,
      updatedAt: now,
      driver: Number(formData.driver),
      vehicle: Number(formData.vehicle),
    };
    setSchedules((prev) => [newSchedule, ...prev]);
    closeModal();
  };

  const handleDelete = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cashing Schedule</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track expected cash-in targets per driver and vehicle.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition self-start sm:self-auto"
          >
            <Plus size={17} />
            Add Schedule
          </button>
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
            placeholder="Search by driver, vehicle, due day..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="px-5 py-3">Driver / Vehicle</th>
                  <th className="px-5 py-3">Due Day</th>
                  <th className="px-5 py-3 text-right">Weekly</th>
                  <th className="px-5 py-3 text-right">Monthly</th>
                  <th className="px-5 py-3 text-right">Yearly</th>
                  <th className="px-5 py-3">Last Updated</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSchedules.map((s) => {
                  const weeklyNum = Number(s.weeklyCashingAmount);
                  const monthlyNum = Number(s.monthlyCashingAmount);
                  const yearlyNum = Number(s.yearlyCashingAmount);

                  return (
                    <tr key={s.id} className="hover:bg-gray-50/60 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                            <Wallet size={16} className="text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {driverNames[s.driver] ?? `Driver #${s.driver}`}
                            </div>
                            <div className="text-xs text-gray-400">
                              {vehicleNames[s.vehicle] ?? `Vehicle #${s.vehicle}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-200 px-2.5 py-1 text-xs font-medium">
                          <CalendarClock size={12} />
                          {s.dueDay}
                        </span>
                      </td>
                      <td
                        className={`px-5 py-3.5 text-right font-medium ${
                          weeklyNum < 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {formatAmount(s.weeklyCashingAmount)}
                      </td>
                      <td
                        className={`px-5 py-3.5 text-right font-medium ${
                          monthlyNum < 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {formatAmount(s.monthlyCashingAmount)}
                      </td>
                      <td
                        className={`px-5 py-3.5 text-right font-medium ${
                          yearlyNum < 0 ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {formatAmount(s.yearlyCashingAmount)}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {formatDate(s.updatedAt)}
                      </td>
                      <td className="px-5 py-3.5 text-right relative">
                        <button
                          onClick={() =>
                            setOpenMenuId((id) => (id === s.id ? null : s.id))
                          }
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition"
                          aria-label="Open actions"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenuId === s.id && (
                          <div className="absolute right-5 top-11 z-10 w-36 rounded-lg border border-gray-200 bg-white shadow-lg py-1 text-left">
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredSchedules.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No cashing schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Cashing Schedule
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="driver"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Driver<span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="driver"
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  >
                    <option value="">Select driver</option>
                    {Object.entries(driverNames).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="vehicle"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Vehicle<span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  >
                    <option value="">Select vehicle</option>
                    {Object.entries(vehicleNames).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="weeklyCashingAmount"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Weekly Cashing Amount (K)<span className="text-rose-500">*</span>
                </label>
                <input
                  id="weeklyCashingAmount"
                  name="weeklyCashingAmount"
                  type="number"
                  step="0.01"
                  value={formData.weeklyCashingAmount}
                  onChange={handleChange}
                  placeholder="1250.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="monthlyCashingAmount"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Monthly (K)
                  </label>
                  <input
                    id="monthlyCashingAmount"
                    name="monthlyCashingAmount"
                    type="number"
                    step="0.01"
                    value={formData.monthlyCashingAmount}
                    onChange={handleChange}
                    placeholder="5000.00"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yearlyCashingAmount"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Yearly (K)
                  </label>
                  <input
                    id="yearlyCashingAmount"
                    name="yearlyCashingAmount"
                    type="number"
                    step="0.01"
                    value={formData.yearlyCashingAmount}
                    onChange={handleChange}
                    placeholder="60000.00"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="dueDay"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Due Day
                </label>
                <select
                  id="dueDay"
                  name="dueDay"
                  value={formData.dueDay}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                >
                  {dueDayOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
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
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashingSchedulePageComp;