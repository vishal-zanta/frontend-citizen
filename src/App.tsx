import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

// Page imports
import PortalHome from "./pages/PortalHome";
import CitizenDashboard from "./pages/citizen/dashboard";
import RaiseComplaint from "./pages/citizen/raise-complaint";
import TrackComplaint from "./pages/citizen/track-complaint";
import CitizenFeedback from "./pages/citizen/citizen-feedback";
import CitizenSettings from "./pages/citizen/CitizenSettings";
import Login from "./pages/Login";
import PageNotFound from "./lib/PageNotFound";
import { getProfile } from "./api/auth.api";
import FullScreenLoader from "./components/FullScreenLoader";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};
const AdminProtectedRoute = ({ children }) => {
  const token =
    localStorage.getItem("usertoken") || sessionStorage.getItem("usertoken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["auth-profile"],
    queryFn: getProfile,
    retry: false,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error || !data) {
    localStorage.removeItem("usertoken");
    sessionStorage.removeItem("usertoken");
    return <Navigate to="/" replace state={{ redirect: false }} />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <PortalHome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "citizen",
        element: (
          <AdminProtectedRoute>
            <Outlet />
          </AdminProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <CitizenDashboard />,
          },
          {
            path: "raise",
            element: <RaiseComplaint role="citizen" />,
          },
          {
            path: "track",
            element: <TrackComplaint role="citizen" />,
          },
          {
            path: "feedback",
            element: <CitizenFeedback />,
          },
          {
            path: "settings",
            element: <CitizenSettings />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <RouterProvider router={router} />
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
