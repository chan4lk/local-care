import { Link } from "react-router-dom";

export const Dashboard = () => {
    return <div>
       <Link to={`new`}>New Patient</Link>
       <Link to={`existing`}>Existing Patient</Link>
    </div>
}