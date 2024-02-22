import { Navigate } from "react-router-dom";

export default function privateRoutes() {
  // Function to check if a user is signed in
  // If the user is signed in, return the private routes
  
  // If the user is not signed in, navigate to the login page
  return <Navigate to="/login" />;
}
