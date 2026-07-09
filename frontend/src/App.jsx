import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmailCenterPage from "./pages/EmailCenter";
import Settings from "./pages/settings";

// Temporary until we build Analytics
function Analytics() {
  return (
    <div className="ml-64 p-10 text-white">
      <h1 className="text-4xl font-bold">
        📊 Analytics
      </h1>

      <p className="text-slate-400 mt-3">
        Coming Soon...
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/emails"
          element={<EmailCenterPage />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;