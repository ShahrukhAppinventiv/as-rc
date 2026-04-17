import { Outlet } from "react-router-dom";

export const AuthLayouts = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
    //   <div className="bg-white w-full max-w-md rounded-md shadow-lg p-8">
    //     <Outlet />
    //   </div>
    // </div>
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">

          <div className="text-5xl font-bold mb-4">
            Kulud
          </div>

        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-50">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <Outlet />
        </div>

      </div>

    </div>
  );
};