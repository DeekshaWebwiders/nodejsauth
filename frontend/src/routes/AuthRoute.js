import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * AuthRoute is a reusable wrapper for route protection and layout management.
 *
 * Props:
 * - element: The component (page) to render
 * - layout: The layout component to wrap the element with
 * - isProtected: Boolean flag to indicate if the route requires authentication
 * - redirectPath: Optional custom redirect path
 *
 * Behavior:
 * - If the route is protected and user is not authenticated, redirect to login
 * - If user is authenticated but email is not verified, redirect to /verify-email
 * - If the route is guest-only and user is already authenticated, redirect to dashboard
 * - Otherwise, render the layout with the provided component inside
 */
const AuthRoute = ({
  element: Component,
  layout: Layout,
  isProtected,
  redirectPath,
}) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!localStorage.getItem("token");

  // Protected route: block if not logged in
  if (isProtected && !isAuthenticated) {
    return <Navigate to={redirectPath || '/'} />;
  }

  //  If route is protected and user is authenticated but email is not verified
  if (isProtected && isAuthenticated && !storedUser?.email_verified) {
    return <Navigate to="/verify-email" />;
  }

  //  If route is guest-only and user is authenticated and email IS verified
  if (!isProtected && isAuthenticated && storedUser?.email_verified) {
    return <Navigate to={redirectPath || '/dashboard'} />;
  }

  return Layout ? <Layout>{Component}</Layout> : Component;

};


export default AuthRoute;
