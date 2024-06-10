export const ReportHeader = () => {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full p-4 bg-blue-100 rounded-lg shadow-md hover:bg-green-100 transition duration-300 ease-in-out transform hover:text-blue-800 mb-8">
        <h2 className="text-2xl font-bold">
          Rosewood Dental & Medical Hospital
        </h2>
        <p className="text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};
