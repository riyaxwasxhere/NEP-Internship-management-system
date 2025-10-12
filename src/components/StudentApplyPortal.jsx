import { createPortal } from "react-dom";
import { applyToInternship } from "../supabase/api";
import { useAuth } from "../hooks/useAuth";

function StudentApplyPortal({
  isOpen,
  isClose,
  jobTitle,
  company,
  internshipId,
}) {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault;
    const result = await applyToInternship(internshipId, user.id);
    if (result.success) {
      alert("Applied Successfully");
    } else {
      console.log(result.error);
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-1000">
      <div className="flex flex-col gap-5 bg-white p-5 rounded-2xl w-[95%] sm:w-[60%] md:w-[40%]">
        <h1 className="font-bold text-2xl text-center">{jobTitle}</h1>
        <p className="text-s text-gray-500 text-center">{company}</p>

        <div>
          <form onSubmit={handleSubmit} action="">
            <p className="p-2 w-full mt-5 font-medium text-center text-lg">
              Upload Your Resume
            </p>
            <input type="file" className="p-2 w-full mt-1" />
          </form>

          <div className="flex justify-center gap-5">
            <button
              onClick={handleSubmit}
              className="font-medium text-center bg-blue-500 text-white px-7 p-2 mt-5 rounded-md"
            >
              Submit
            </button>
            <button
              onClick={isClose}
              className="px-7 p-2 mt-5 bg-gray-100 font-medium text-center rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default StudentApplyPortal;
