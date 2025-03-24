import "./App.css";

import { Entry } from "./pages/entry/Entry.page";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute } from "./components/private-route/PrivateRoute.comp";
import Home from "pages/dashboard/home/Home";
import { Settings } from "pages/dashboard/settings/Settings";
import Bots from "components/bots/bot";
import ChatbotWidget from "components/chatbot-widget/ChatbotWidget";
import { Training } from "pages/dashboard/training/Training";
import { Appearance } from "pages/dashboard/appearance/Appearance";
import { Installation } from "pages/dashboard/installation/Installation";
import { v5 as uuidv5 } from "uuid";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Entry />} />
          {/* <Route path="/" element={<EmojiPicker />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/bots"
            element={
              <PrivateRoute>
                <ChatbotWidget />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/training"
            element={
              <PrivateRoute>
                <Training />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings/appearance"
            element={
              <PrivateRoute>
                <Appearance />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings/installation"
            element={
              <PrivateRoute>
                <Installation />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
