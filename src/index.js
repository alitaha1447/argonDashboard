import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor } from "app/store";
import { store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "../src/assets/css/argon-dashboard-react.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import EnquiryForm from "layouts/EnquiryForm";
// import FaceDetection from "layouts/FaceDetection";
import HumanFaceDetection from "layouts/HumanFaceDetection";
import Receipt from "layouts/receipt/Receipt";
import CourseViewer from "layouts/courseViewer/CourseViewer";
import CourseViewer2 from "layouts/courseViewer2/CourseViewer2";
import PrivateRoute from "PrivateRoute";
import PublicRoute from "PublicRoute";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const CLIENT_ID =
  "1040075619932-fqpccgaqf1497ndkeqv1jd77278qd7p2.apps.googleusercontent.com";

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/admin/*" element={<AdminLayout />} /> */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />
          {/* <Route path="/auth/*" element={<AuthLayout />} /> */}
          <Route
            path="/auth/*"
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          />

          <Route path="/enquiryForm" element={<EnquiryForm />} />
          {/* <Route path="/faceDetection" element={<FaceDetection />} /> */}
          <Route path="/humanFaceDetection" element={<HumanFaceDetection />} />
          <Route path="/courseViewer" element={<CourseViewer />} />
          <Route path="/courseViewer2" element={<CourseViewer2 />} />
          <Route path="/receiptForm" element={<Receipt />} />
          {/* <Route path="*" element={<Navigate to="/receiptForm" replace />} /> */}
          {/* <Route path="*" element={<Navigate to="/admin/index" replace />} /> */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
    {/* </GoogleOAuthProvider> */}
  </Provider>
  // <App />
);
