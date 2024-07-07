import { User } from "@/src/types/user";
import React, { createContext } from "react";

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
