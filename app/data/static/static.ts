import {
  Car,
  LayoutDashboard,
  Receipt,
  Fuel,
  Wrench,
  FileBarChart,
  Settings,
  User,
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/home" },
  { label: "Vehicles", icon: Car, href: "/vehicles" },
  { label: "Transactions", icon: Receipt, href: "/transactions" },
  { label: "Drivers", icon: User, href: "/drivers" },
  { label: "Cashing Schedule", icon: Settings, href: "/cashing-schedule" },
];

export const recentTransactions = [
  { id: 1, vehicle: "Toyota Hilux — ZM 4021", type: "Trip revenue", amount: 850, positive: true, date: "Today, 10:24 AM" },
  { id: 2, vehicle: "Isuzu D-Max — ZM 1187", type: "Fuel refill", amount: -420, positive: false, date: "Today, 8:02 AM" },
  { id: 3, vehicle: "Toyota Coaster — ZM 7734", type: "Maintenance", amount: -1200, positive: false, date: "Yesterday, 4:41 PM" },
  { id: 4, vehicle: "Nissan Navara — ZM 5502", type: "Trip revenue", amount: 640, positive: true, date: "Yesterday, 1:15 PM" },
  { id: 5, vehicle: "Toyota Hilux — ZM 4021", type: "Trip revenue", amount: 910, positive: true, date: "Mon, 9:30 AM" },
];

export const vehicles = [
  { id: 1, name: "Toyota Hilux", plate: "ZM 4021", status: "On trip", cashFlow: 4820 },
  { id: 2, name: "Isuzu D-Max", plate: "ZM 1187", status: "Idle", cashFlow: -650 },
  { id: 3, name: "Toyota Coaster", plate: "ZM 7734", status: "Maintenance", cashFlow: -1200 },
  { id: 4, name: "Nissan Navara", plate: "ZM 5502", status: "On trip", cashFlow: 3110 },
];

export const statusStyles: Record<string, string> = {
  "On trip": "bg-emerald-50 text-emerald-600",
  Idle: "bg-gray-100 text-gray-600",
  Maintenance: "bg-amber-50 text-amber-600",
};