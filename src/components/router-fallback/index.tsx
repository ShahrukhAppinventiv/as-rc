const RouterFallback = ({ error }: any) => {
  return (
    <div className="bg-gray-100 w-full p-6">
      
      <div className="w-full min-h-[70vh] bg-white rounded-2xl shadow-md 
                      flex flex-col items-center justify-center text-center px-6">
        
        <div className="mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
            alt="Error Illustration"
            className="w-28 h-28 mx-auto opacity-90"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h2>

        <p className="text-gray-500 max-w-xl">
          {error?.message || "We couldn’t load this section right now. Please try again later."}
        </p>

      </div>

    </div>
  );
};

export default RouterFallback;