"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Car,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";

type VehicleStatus = "Active" | "Maintenance" | "Inactive";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  status: VehicleStatus;
  mileage: string;
  driver: string;
}

interface VehicleFormData {
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  status: VehicleStatus;
  mileage: string;
  driver: string;
}

const emptyForm: VehicleFormData = {
  make: "",
  model: "",
  year: "",
  licensePlate: "",
  vin: "",
  status: "Active",
  mileage: "",
  driver: "",
};

const initialVehicles: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Hilux",
    year: "2022",
    licensePlate: "BAT 4521",
    vin: "JT1BR32E9Y0123456",
    status: "Active",
    mileage: "34,210",
    driver: "Mumba Chanda",
  },
  {
    id: "2",
    make: "Ford",
    model: "Transit",
    year: "2020",
    licensePlate: "ALB 9012",
    vin: "1FTBW2CM5LKA12345",
    status: "Maintenance",
    mileage: "78,540",
    driver: "Unassigned",
  },
  {
    id: "3",
    make: "Nissan",
    model: "Navara",
    year: "2023",
    licensePlate: "BAG 3387",
    vin: "5N1AN0NU4KN123456",
    status: "Active",
    mileage: "12,860",
    driver: "Joseph Banda",
  },
  {
    id: "4",
    make: "Isuzu",
    model: "D-Max",
    year: "2019",
    licensePlate: "ALA 7754",
    vin: "MPATFS86JKT012345",
    status: "Inactive",
    mileage: "102,330",
    driver: "Unassigned",
  },
];

const statusStyles: Record<VehicleStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  Maintenance: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Inactive: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
};

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<VehicleFormData>(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredVehicles = vehicles.filter((v) => {
    const q = search.toLowerCase();
    return (
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.licensePlate.toLowerCase().includes(q) ||
      v.driver.toLowerCase().includes(q)
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

    if (!formData.make || !formData.model || !formData.licensePlate) {
      setError("Make, model, and license plate are required.");
      return;
    }

    // Hook up to your "create vehicle" API call here
    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      ...formData,
      driver: formData.driver || "Unassigned",
      mileage: formData.mileage || "0",
    };
    setVehicles((prev) => [newVehicle, ...prev]);
    closeModal();
  };

  const handleDelete = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your fleet and track vehicle status.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition self-start sm:self-auto"
          >
            <Plus size={17} />
            Add Vehicle
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
            placeholder="Search by make, model, plate, driver..."
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
                  <th className="px-5 py-3">License Plate</th>
                  <th className="px-5 py-3">Driver</th>
                  <th className="px-5 py-3">Mileage</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50/60 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <Car size={16} className="text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-xs text-gray-400">
                            {vehicle.year} &middot; {vehicle.vin}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {vehicle.licensePlate}
                    </td>
                    <td className="px-5 py-3.5 text-gray-700">{vehicle.driver}</td>
                    <td className="px-5 py-3.5 text-gray-700">
                      {vehicle.mileage} km
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[vehicle.status]}`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right relative">
                      <Link
                          href={`/details/${vehicle.id}`}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                          <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredVehicles.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No vehicles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Add Vehicle</h2>
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
                    htmlFor="make"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Make<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="Toyota"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Model<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Hilux"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Year
                  </label>
                  <input
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2023"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="licensePlate"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    License Plate<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    placeholder="BAT 4521"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="vin"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  VIN
                </label>
                <input
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                  placeholder="JT1BR32E9Y0123456"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="mileage"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Mileage (km)
                  </label>
                  <input
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
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
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="driver"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Assigned Driver
                </label>
                <input
                  id="driver"
                  name="driver"
                  value={formData.driver}
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
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;