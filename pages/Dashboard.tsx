import { User } from "firebase/auth";
import { userAgent } from "next/server";
import { useContext } from "react";
import { AuthContext } from "../src/Context/AuthContext";

interface AuthContextType  {
    user?: User
}

export default function Dashboard() {
  const context: AuthContextType = useContext(AuthContext);
  const { user } = context;
  return <div>{user?.email}</div>;
}
