import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Modal({ name, rollNo, internship, duration, logbookEntries }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-blue-600 text-white">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Credits</DialogTitle>
            <DialogDescription>
                <div>
                    <p>Assign NEP credits for verified internship completion</p>
                    <p className="my-2 font-semibold text-black">Student Details</p>
                </div>
                <div className="border-1 rounded bg-gray-100 p-3 text-black">
                    <p><strong className="font-semibold">Name:</strong> {name}</p>
                    <p><strong className="font-semibold ">Roll No:</strong> {rollNo}</p>
                    <p><strong className="font-semibold ">Internship:</strong> {internship}</p>
                    <p><strong className="font-semibold ">Duration:</strong> {duration}</p>
                    <p><strong className="font-semibold ">Logbook Entries:</strong> {logbookEntries}</p>
                </div>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="credit">Credit Points *</Label>
              <Input className="border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600" id="credit" name="credit" placeholder="Enter credits points" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="remark">Remark (optional)</Label>
              <textarea className="p-2 h-20 rounded border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 focus-visible:outline-none" id="remark" name="remark" placeholder="Add remark or feedback"  />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-400" >Assignn Credits</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
