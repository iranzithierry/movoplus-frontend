"use client";
import { User } from "@/api";
import React, { createContext, useContext } from "react";

const DefaultProps = { user: null, accessToken: null };

export interface AuthContextType {
  user: User | null;
  accessToken: string | null | undefined;
}

const AuthContext = createContext<AuthContextType>(DefaultProps);

export const AuthProvider: React.FC<{ children: React.ReactNode, user: User | null, accessToken: string | null | undefined }> = ({ children, user, accessToken }) => {
  return (
    <AuthContext.Provider value={{ user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};