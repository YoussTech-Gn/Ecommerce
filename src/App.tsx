import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./routes/AppRouter";
import { store, persistor } from "./redux/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={AppRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
