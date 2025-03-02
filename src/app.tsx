import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./app.css";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import TermsAndConditionsPage from "./pages/terms-and-conditions-page";
import PrivacyPolicyPage from "./pages/privacy-policy-page";
import ContactUsPage from "./pages/contact-us-page";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PreferencesPage from "./pages/preferences-page";
import VerifyPage from "./pages/verify-page";

function App() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    authDomain: import.meta.env.VITE_GOOGLE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_GOOGLE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_GOOGLE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_GOOGLE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_GOOGLE_APP_ID,
    measurementId: import.meta.env.VITE_GOOGLE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/preferences" element={<PreferencesPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
