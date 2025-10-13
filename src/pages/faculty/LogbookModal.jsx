import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const EntryCard = ({ entry }) => {
  const isApproved = entry.verified;
  const statusText = isApproved ? "Approved" : "Pending";
  const statusClasses = isApproved
    ? "bg-green-600 text-white" 
    : "bg-amber-500 text-white";

  return (
    <div className="p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold text-gray-800">
          {entry.date}
        </div>
        <span
          className={`px-3 py-1 rounded text-xs font-medium uppercase ${statusClasses}`}
        >
          {statusText}
        </span>
      </div>
      <p className="mt-1 text-gray-600">
        {entry.description}
      </p>
    </div>
  );
};

export default function LogbookModal({ student, internship, entries }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" mt-2 border border-gray-200 text-gray-700 hover:bg-blue-600 cursor-pointer hover:text-white "
        >
          <span className="md:mr-2">👁</span> View All Entries
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-2 border-b border-gray-100">
          <DialogTitle className="text-xl font-bold text-gray-900">
            All Logbook Entries - {student.full_name}
          </DialogTitle>
          <p className="text-base font-normal text-gray-600 -mt-1">
            {internship.title}
          </p>
        </DialogHeader>
        <div className="p-6 pt-3 max-h-[70vh] overflow-y-auto">
          {entries.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No entries found yet.</p>
          ) : (
            entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}