import React, { createContext, useState, useContext } from "react";

export const checkPermissionManual = (validPermissions: string[], permission?: string | string[]): boolean => {
  if (validPermissions.includes("ALL")) return true;
  if (!permission) return false;
  if (Array.isArray(permission)) {
    return permission.some((p) => validPermissions.includes(p));
  }
  return validPermissions.includes(permission);
};

interface AuthContextType {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  hasPermission: (permission?: string | string[]) => boolean;
}

const authContext = createContext<AuthContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<any>(null);

  const hasPermission = (permission?: string | string[]) => {
    const validPermissions = profile?.role?.permissions || [];
    return checkPermissionManual(validPermissions, permission);
  };

  return (
    <authContext.Provider value={{ profile, setProfile, hasPermission }}>
      {children}
    </authContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
