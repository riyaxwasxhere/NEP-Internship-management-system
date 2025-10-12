function StudentEntryCard({ date, jobTitle, description, verified }) {
  return (
    <div className="border-1 rounded-md p-3 mt-5 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-xl text-black">{date}</h3>
        <div
          className={`${
            verified ? "bg-green-500" : "bg-amber-500"
          } rounded-full px-3 py-1 text-white text-s font-bold self-start`}
        >
          {verified ? "verified" : "pending"}
        </div>
      </div>
      <p>{jobTitle}</p>
      <p className="mt-2 text-black">{description}</p>
    </div>
  );
}

export default StudentEntryCard;
