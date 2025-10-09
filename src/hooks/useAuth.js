import { createContext, useContext } from "react";
// Create AuthContext
export const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
