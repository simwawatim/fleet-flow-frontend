"use client";

import { useState } from "react";
import {
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe2,
  Lock,
  Pencil,
  Check,
  X,
} from "lucide-react";

interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
}

const initialProfile: ProfileData = {
  first_name: "Nandi",
  last_name: "Mwewa",
  username: "nandi.mwewa",
  email: "nandi.mwewa@example.com",
  phoneNumber: "+260 97 123 4567",
  city: "Lusaka",
  country: "Zambia",
};

const ProfilePageComp = () => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [formData, setFormData] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = () => {
    setFormData(profile);
    setIsEditing(true);
    setError(null);
    setSaved(false);
  };

  const cancelEditing = () => {
    setFormData(profile);
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.first_name || !formData.last_name || !formData.email) {
      setError("First name, last name, and email are required.");
      return;
    }

    // Hook up to your "update profile" API call here
    setProfile(formData);
    setIsEditing(false);
    setSaved(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and account details.
          </p>
        </div>

        {saved && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm text-emerald-700">
            <Check size={16} />
            Profile updated successfully.
          </div>
        )}

        {/* Profile card */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {/* Cover + avatar */}
          <div className="relative h-28 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600">
            <div className="absolute -bottom-10 left-6">
              <div className="relative w-20 h-20 rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center">
                  <User size={30} className="text-indigo-600" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white transition"
                  aria-label="Change photo"
                >
                  <Camera size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-14 px-6 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-sm text-gray-500">@{profile.username}</p>
              </div>
              {!isEditing && (
                <button
                  onClick={startEditing}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium px-3.5 py-2 hover:bg-gray-50 transition"
                >
                  <Pencil size={14} />
                  Edit Profile
                </button>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm text-rose-600">
                {error}
              </div>
            )}

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <p className="text-sm text-gray-900">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone Number</p>
                    <p className="text-sm text-gray-900">{profile.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">City</p>
                    <p className="text-sm text-gray-900">{profile.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 size={16} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Country</p>
                    <p className="text-sm text-gray-900">{profile.country}</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      First Name<span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Last Name<span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email<span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2.5 hover:bg-gray-50 transition"
                  >
                    <X size={15} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2.5 transition"
                  >
                    <Check size={15} />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security section */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Lock size={16} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Password</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Last changed some time ago.
                </p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center rounded-lg border border-gray-300 text-gray-700 text-sm font-medium px-3.5 py-2 hover:bg-gray-50 transition"
            >
              Change Password
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComp;