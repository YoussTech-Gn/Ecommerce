import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import store from "./redux/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;
