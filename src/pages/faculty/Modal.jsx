import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Modal({
  name,
  rollNo,
  internship,
  duration,
  logbookEntries,
  onSubmit,
}) {
  const [credit, setCredit] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credit) {
      alert("Please enter credit points!");
      return;
    }
    onSubmit(credit, remark);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white">
          Assign Credit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Assign Credits</DialogTitle>
            <DialogDescription>
              <p>Assign NEP credits for verified internship completion</p>
              <div className="border rounded bg-gray-100 p-3 text-black mt-3">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Roll No:</strong> {rollNo}</p>
                <p><strong>Internship:</strong> {internship}</p>
                <p><strong>Duration:</strong> {duration}</p>
                <p><strong>Logbook Entries:</strong> {logbookEntries}</p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="credit">Credit Points *</Label>
              <Input
                id="credit"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                placeholder="Enter credit points"
                className="border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="remark">Remark (optional)</Label>
              <textarea
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="p-2 h-20 rounded border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                placeholder="Add remark or feedback"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-500">
              Assign Credits
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
