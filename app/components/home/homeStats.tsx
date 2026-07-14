"use client";

import { Wallet, Car, Fuel, Wrench, TrendingUp, TrendingDown } from "lucide-react";
import { recentTransactions, vehicles, statusStyles } from "../../data/static/static";

const HomeContent = () => {
  return (
    <main className="flex-1 px-5 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with your fleet's cash flow today.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-400">Net cash flow</span>
          </div>
          <div className="text-xl font-bold text-gray-900">$18,420</div>
          <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1">
            <TrendingUp size={13} /> +9.6% this month
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Car className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-gray-400">Active vehicles</span>
          </div>
          <div className="text-xl font-bold text-gray-900">127</div>
          <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1">
            <TrendingUp size={13} /> +4 this month
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-gray-400">Fuel spend</span>
          </div>
          <div className="text-xl font-bold text-gray-900">$6,240</div>
          <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
            <TrendingDown size={13} /> +12% this month
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-rose-500" />
            <span className="text-xs text-gray-400">Maintenance cost</span>
          </div>
          <div className="text-xl font-bold text-gray-900">$2,980</div>
          <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1">
            <TrendingDown size={13} /> -6% this month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Revenue vs. expenses</h2>
              <p className="text-xs text-gray-400">Last 7 days</p>
            </div>
          </div>
          <div className="flex items-end gap-3 h-40">
            {[
              { rev: 65, exp: 40 },
              { rev: 80, exp: 55 },
              { rev: 45, exp: 30 },
              { rev: 90, exp: 60 },
              { rev: 70, exp: 50 },
              { rev: 95, exp: 45 },
              { rev: 60, exp: 35 },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex items-end gap-1 h-full">
                <div
                  className="flex-1 rounded-t-sm bg-indigo-500"
                  style={{ height: `${d.rev}%` }}
                />
                <div
                  className="flex-1 rounded-t-sm bg-amber-300"
                  style={{ height: `${d.exp}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-300" /> Expenses
            </span>
          </div>
        </div>

        {/* Vehicle list */}
        <div className="rounded-xl bg-white border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Fleet status</h2>
          <div className="space-y-3">
            {vehicles.map((v) => (
              <div key={v.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.plate}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyles[v.status]}`}
                  >
                    {v.status}
                  </span>
                  <p
                    className={`text-xs font-medium mt-1 ${
                      v.cashFlow >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {v.cashFlow >= 0 ? "+" : ""}${v.cashFlow.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="rounded-xl bg-white border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent transactions</h2>
        <div className="divide-y divide-gray-100">
          {recentTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">{t.vehicle}</p>
                <p className="text-xs text-gray-400">{t.type} · {t.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.positive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {t.positive ? "+" : "-"}${Math.abs(t.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomeContent;