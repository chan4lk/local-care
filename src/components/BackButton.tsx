import { useNavigate } from "react-router-dom";

export const Back = () => {
  const navigate = useNavigate();
  const back = () => navigate("/");
  return (
    <button
      onClick={back}
      type="button"
       className='bg-secondary border-secondary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-black hover:bg-[#0BB489] hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
      
      <svg
        className="w-5 h-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>Go Back</span>
    </button>
  );
};
