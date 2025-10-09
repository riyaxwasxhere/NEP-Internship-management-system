function StudentReview() {
  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl text-black">
        Submit for Faculty Review
      </h2>
      <p>
        Once you've completed your internship, submit all entries for final
        faculty approval
      </p>

      <p className="mt-5">Total entries: 3 | Approved: 2 | Pending: 1</p>
      <button className="p-2 mt-3 bg-blue-600 font-medium text-white rounded-md">
        Submit for Final Review
      </button>
    </div>
  );
}

export default StudentReview;
