import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/loader/Loader";
import './utils/chartConfig'
import { Provider } from 'react-redux'
import { store, useAppSelector } from "./store/store";
import "./App.css"


function App() {
  const loader = useAppSelector(state => state.globalSlice.loader.isShowLoader)

  return (
    <>
      <Loader />
      <BrowserRouter>
        {/* <LoaderContextProvider> */}
          {/* <Provider store={store}> */}
          <AppRouter />
          {/* </Provider> */}
        {/* </LoaderContextProvider> */}

        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
          transition={Slide}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
