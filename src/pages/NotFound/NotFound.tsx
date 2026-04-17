import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      
      {/* Image */}
      <img
        src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png"
        alt="404"
        className="w-64 mb-6 rounded-md w-[600px] h-[300px]"
      />

      {/* Heading */}
      {/* <h1 className="text-5xl font-bold text-gray-800">404</h1> */}

      {/* Sub text */}
      <p className="text-lg text-gray-600 mt-2">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          variant="contained"
          onClick={() => navigate("/")}
        >
           Back To Home
        </Button>

        {/* <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          Go Home
        </Button> */}
      </div>
    </div>
  );
}