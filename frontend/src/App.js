import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Signin';
import Profile from './pages/Profile';
import ForgotPassword  from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import EmailVerification from './pages/EmailVerification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BeforeLoginLayout from "./layouts/BeforeLogin/Layout";
import AfterLoginLayout from "./layouts/AfterLogin/Layout";
import AuthRoute from './routes/AuthRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <AuthRoute
              element={<Signup />}
              layout={BeforeLoginLayout}
              isProtected={false}
              redirectPath="/dashboard"
            />
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute
              element={<Login />}
              layout={BeforeLoginLayout}
              isProtected={false}
              redirectPath="/dashboard"
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRoute
              element={<Dashboard />}
              layout={AfterLoginLayout}
              isProtected={true}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/verify-email"
          element={
            <AuthRoute
              element={<VerifyEmail />}
              isProtected={false} 
              redirectPath="/"
            />
          }
        />

         <Route
          path="/email-verification"
          element={
            <EmailVerification />
          }
        />

        <Route
          path="/profile"
          element={
            <AuthRoute
              element={<Profile />}
              layout={AfterLoginLayout}
              isProtected={true}
              redirectPath="/"
            />
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
          layout={AfterLoginLayout}
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
