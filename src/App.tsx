import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { reportToErrorService } from "./utils/errorServices";
import store from "./redux/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider
        router={AppRouter}
        onError={(error, info) => {
          const { location, errorInfo } = info;
          // استدعاء الدالة هنا مباشرة
          reportToErrorService(error, location, errorInfo);
        }}
      />
    </Provider>
  );
}

export default App;
