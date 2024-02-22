import { Navigate } from "react-router-dom";

export default function AdminRoutes() {
  // Function to check if a user is signed in && if a user is an admin
  // If the user is signed in and is an admin, return the admin routes
  // If the user is signed in and is not an admin, navigate to the home page
  // If the user is not signed in, navigate to the login page
  return <Navigate to="/login" />;
}
