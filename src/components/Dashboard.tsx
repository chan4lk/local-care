import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();
    const goToNew = () => navigate(`/new`);
    const goToExisting = () => navigate(`/existing`);
    return (
        <div className="flex flex-wrap justify-center">
            {/* <h1 className="text-3xl font-bold mb-4">Welcome to Localcare!</h1> */}
            {/* Card 1 */}
            <div
                className="w-1/2 p-4 bg-white rounded shadow-md m-4 cursor-pointer"
                onClick={goToNew}
            >
                <h2 className="text-lg font-bold">New Patient</h2>
                <p className="text-sm">Create a new record.</p>
            </div>

            {/* Card 2 */}
            <div
                className="w-1/2 p-4 bg-white rounded shadow-md m-4 cursor-pointer"
                onClick={goToExisting}
            >
                <h2 className="text-lg font-bold">Existing Patient.</h2>{" "}
                <p className="text-sm">Update existing record.</p>
            </div>
        </div>
    );
};
