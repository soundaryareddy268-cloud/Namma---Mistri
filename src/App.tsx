/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "./screens/LoginScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { Dashboard } from "./screens/Dashboard";
import { useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/welcome" replace /> : 
                <LoginScreen onLogin={() => setIsAuthenticated(true)} />
              } 
            />
            <Route 
              path="/welcome" 
              element={
                isAuthenticated ? 
                <WelcomeScreen /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                isAuthenticated ? 
                <Dashboard onLogout={() => setIsAuthenticated(false)} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

