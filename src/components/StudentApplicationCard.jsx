function StudentApplicationCard({ title, company, status, statusColor }) {
  return (
    <div className="border-1 rounded-md p-3 mt-5 bg-white">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-lg">{title}</h3>
        <div
          className={`${statusColor} rounded-full px-3 py-1 text-white text-s font-bold self-start`}
        >
          {status}
        </div>
      </div>
      <p className="text-s text-gray-500">{company}</p>
    </div>
  );
}

export default StudentApplicationCard;
