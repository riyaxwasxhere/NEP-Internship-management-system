function StudentCreditGuidelines() {
  return (
    <div className="border-1 rounded-md mt-5 p-5 bg-white">
      <h2 className="font-medium text-2xl">NEP Credit Guidelines</h2>
      <p className="text-s text-gray-500">
        Understanding how internship credits are assigned
      </p>
      <ol className="mt-5">
        <li className="mt-3">
          <span className="font-bold text-s">1 month internship:</span> 2 NEP
          credits (subject to faculty approval)
        </li>
        <li className="mt-3">
          <span className="font-bold text-s">Minimum duration:</span>At least 4
          weeks of documented work required
        </li>
        <li className="mt-3">
          <span className="font-bold text-s">Logbook requirement:</span>Regular
          entries and final faculty approval mandatory
        </li>
        <li className="mt-3">
          <span className="font-bold text-s">Maximum credits:</span> Up to 10
          credits per academic year from internships
        </li>
      </ol>
    </div>
  );
}

export default StudentCreditGuidelines;
