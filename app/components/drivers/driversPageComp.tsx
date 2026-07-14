"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  User,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  Phone,
  Eye,
} from "lucide-react";
import Link from "next/link";

type DriverStatus = "Active" | "On Leave" | "Suspended";

interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  assignedVehicle: string;
  status: DriverStatus;
}

interface DriverFormData {
  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  assignedVehicle: string;
  status: DriverStatus;
}

const emptyForm: DriverFormData = {
  name: "",
  phone: "",
  licenseNumber: "",
  licenseExpiry: "",
  assignedVehicle: "",
  status: "Active",
};

const initialDrivers: Driver[] = [
  {
    id: "1",
    name: "Mumba Chanda",
    phone: "+260 97 123 4567",
    licenseNumber: "DL-2201938",
    licenseExpiry: "2027-04-12",
    assignedVehicle: "Toyota Hilux — ZM 4021",
    status: "Active",
  },
  {
    id: "2",
    name: "Joseph Banda",
    phone: "+260 96 765 4321",
    licenseNumber: "DL-2200114",
    licenseExpiry: "2026-11-03",
    assignedVehicle: "Nissan Navara — ZM 5502",
    status: "Active",
  },
  {
    id: "3",
    name: "Grace Mulenga",
    phone: "+260 95 555 8890",
    licenseNumber: "DL-2199872",
    licenseExpiry: "2025-09-20",
    assignedVehicle: "Unassigned",
    status: "On Leave",
  },
  {
    id: "4",
    name: "Kelvin Zulu",
    phone: "+260 77 442 1190",
    licenseNumber: "DL-2198765",
    licenseExpiry: "2026-02-15",
    assignedVehicle: "Unassigned",
    status: "Suspended",
  },
];

const statusStyles: Record<DriverStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  "On Leave": "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Suspended: "bg-rose-50 text-rose-600 ring-1 ring-rose-200",
};

const DriversPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<DriverFormData>(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredDrivers = drivers.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.phone.toLowerCase().includes(q) ||
      d.licenseNumber.toLowerCase().includes(q) ||
      d.assignedVehicle.toLowerCase().includes(q)
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

    if (!formData.name || !formData.phone || !formData.licenseNumber) {
      setError("Name, phone, and license number are required.");
      return;
    }

    // Hook up to your "create driver" API call here
    const newDriver: Driver = {
      id: crypto.randomUUID(),
      ...formData,
      assignedVehicle: formData.assignedVehicle || "Unassigned",
    };
    setDrivers((prev) => [newDriver, ...prev]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage driver profiles, licenses, and vehicle assignments.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition self-start sm:self-auto"
          >
            <Plus size={17} />
            Add Driver
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
            placeholder="Search by name, phone, license, vehicle..."
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3">License No.</th>
                  <th className="px-5 py-3">License Expiry</th>
                  <th className="px-5 py-3">Assigned Vehicle</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50/60 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                          <User size={16} className="text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {driver.name}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Phone size={11} />
                            {driver.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {driver.licenseNumber}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {driver.licenseExpiry}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {driver.assignedVehicle}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[driver.status]}`}
                      >
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right relative">
                      <Link
                          href={`/details/${driver.id}`}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                          <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredDrivers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No drivers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Add Driver</h2>
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Full Name<span className="text-rose-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Mumba Chanda"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone Number<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+260 97 123 4567"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    License No.<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="DL-2201938"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="licenseExpiry"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    License Expiry
                  </label>
                  <input
                    id="licenseExpiry"
                    name="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="assignedVehicle"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Assigned Vehicle
                </label>
                <input
                  id="assignedVehicle"
                  name="assignedVehicle"
                  value={formData.assignedVehicle}
                  onChange={handleChange}
                  placeholder="Unassigned"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
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
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversPage;