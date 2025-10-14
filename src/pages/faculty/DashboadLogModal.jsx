import React from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLogModal({ open, onClose, logbook, entries, loading, onVerify }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {logbook.students.full_name}'s Unverified Entries
        </h2>

        {loading ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p>No unverified entries.</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {entries.map((entry) => (
              <div key={entry.id} className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{entry.description}</p>
                  <p className="text-sm text-gray-500">{entry.date}</p>
                </div>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => onVerify(entry.id)}
                >
                  Accept
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 text-right">
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
