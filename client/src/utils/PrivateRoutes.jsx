import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, allowedRoles }) => {
  const location = useLocation(); // For redirecting to the attempted URL after login
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  try {
    // Decode the token manually using atob
    const decoded = JSON.parse(atob(token.split(".")[1]));

    // Check if the role from the decoded token is in the allowed roles for the route
    // eslint-disable-next-line react/prop-types
    if (!allowedRoles.includes(decoded.role)) {
      console.warn("Unauthorized access: role not allowed");
      return <Navigate to="/" />;
    }

    // If the token is valid and user is authorized, render the child component
    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
