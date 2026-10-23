import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserdata } from "../redux/userSlice";

import SideBar from "../components/SideBar";
import ChatArea from "../components/ChatArea";
import Artifact from "../components/Artifact";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserdata(data));
      return true;
    } catch (error) {
      console.error("Backend login failed:", error);
      setLoginError(
        error.response?.data?.message ||
          "Authentication failed. Please try again."
      );
      return false;
    }
  };

  const googleLogin = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const success = await handleLogin(token);

      // Keep the backend and Redux authentication states consistent.
      if (!success) {
        await auth.signOut();
      }
    } catch (error) {
      console.error("Google login failed:", error);

      setLoginError(
        error.code === "auth/popup-closed-by-user"
          ? "Sign-in was cancelled. Try again."
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#101110] text-[#F3F3EA] selection:bg-[#D7FF38] selection:text-black">
      {/* Main application */}
      <SideBar />
      <ChatArea />
      <Artifact />

      {/* Authentication overlay */}
      {!userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#101110]/95 p-4 sm:p-6">
          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(#D7FF38 1px, transparent 1px), linear-gradient(90deg, #D7FF38 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Login card */}
          <div className="relative w-full max-w-[440px] border-2 border-[#D7FF38] bg-[#171915] shadow-[8px_8px_0px_#D7FF38]">
            {/* Top status bar */}
            <div className="flex items-center justify-between border-b-2 border-[#41443B] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 bg-[#D7FF38]" />
                <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#D7FF38] sm:text-xs">
                  ORQIVA / AI
                </span>
              </div>

              <span className="font-mono text-[10px] tracking-wider text-[#A6AA9B]">
                AUTH_001
              </span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Brand mark */}
              <div className="mb-7 flex h-14 w-14 items-center justify-center border-2 border-[#D7FF38] bg-[#D7FF38]">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  className="h-9 w-9"
                  aria-hidden="true"
                >
                  <path
                    d="M20 3L37 20L20 37L3 20L20 3Z"
                    stroke="#101110"
                    strokeWidth="3"
                  />
                  <path
                    d="M20 11L29 20L20 29L11 20L20 11Z"
                    fill="#101110"
                  />
                </svg>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D7FF38]">
                  Your AI workspace
                </p>

                <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl">
                  THINK
                  <br />
                  <span className="text-[#D7FF38]">BEYOND.</span>
                </h1>

                <p className="mt-5 max-w-sm text-sm leading-6 text-[#A6AA9B]">
                  One interface. Multiple intelligent agents. Authenticate to
                  access your conversations, tools, and generated artifacts.
                </p>
              </div>

              {/* Feature indicators */}
              <div className="mb-7 grid grid-cols-3 gap-2">
                {[
                  { label: "CHAT", code: "01" },
                  { label: "CODE", code: "02" },
                  { label: "CREATE", code: "03" },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="border border-[#41443B] bg-[#101110] p-3"
                  >
                    <p className="mb-2 font-mono text-[10px] text-[#D7FF38]">
                      /{item.code}
                    </p>
                    <p className="text-[10px] font-bold tracking-widest text-[#F3F3EA] sm:text-xs">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Google authentication */}
              <button
                type="button"
                onClick={googleLogin}
                disabled={isLoggingIn}
                className="group flex w-full items-center justify-between gap-3 border-2 border-[#D7FF38] bg-[#D7FF38] px-4 py-4 text-left font-bold text-[#101110] transition-all duration-150 hover:-translate-y-1 hover:bg-[#E5FF78] hover:shadow-[4px_4px_0px_#F3F3EA] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <span className="flex items-center gap-3 text-sm sm:text-base">
                  <FcGoogle size={21} />
                  {isLoggingIn ? "AUTHENTICATING..." : "CONTINUE WITH GOOGLE"}
                </span>

                <span className="text-xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

              {/* Error message */}
              {loginError && (
                <div
                  role="alert"
                  className="mt-4 border-2 border-red-500 bg-red-950/40 p-3 font-mono text-xs leading-5 text-red-300"
                >
                  ERROR: {loginError}
                </div>
              )}

              {/* Footer */}
              <div className="mt-6 flex items-start justify-between gap-3 border-t border-[#41443B] pt-4">
                <p className="font-mono text-[9px] leading-5 tracking-wider text-[#777B70] sm:text-[10px]">
                  SECURE ACCESS
                  <br />
                  GOOGLE IDENTITY
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="h-2 w-2 animate-pulse bg-[#D7FF38]" />
                  <span className="font-mono text-[9px] tracking-wider text-[#A6AA9B] sm:text-[10px]">
                    SYSTEM READY
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="h-1.5 bg-[#D7FF38]" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;