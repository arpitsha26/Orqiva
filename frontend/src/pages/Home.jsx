import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Home() {
  
  const {userData}=useSelector(state=>state.user)
  console.log(userData)

  const dispatch=useDispatch()


  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data))
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();

    console.log(token);

    await handleLogin(token);

    console.log(data);
  };

  return (
  <main
    className={`
      relative h-screen w-full overflow-hidden
      transition-colors duration-300
      ${dark ? "bg-[#090B10] text-white" : "bg-white text-slate-900"}
    `}
  >
    {/* HEADER — ALWAYS SHOW */}
    <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-6 sm:px-8 lg:px-10">

      {/* Logo */}
      <img
        src="/orqiva-full-logo.svg"
        alt="Orqiva AI"
        className={`
          h-12 w-auto sm:h-14
          transition-all duration-300
          ${dark ? "brightness-0 invert" : ""}
        `}
      />

      {/* Theme Toggle — ALWAYS SHOW */}
      <button
        type="button"
        onClick={() => setDark((value) => !value)}
        aria-label="Toggle theme"
        className={`
          flex h-10 w-10 items-center justify-center
          rounded-full border text-lg
          transition-all duration-300
          ${
            dark
              ? "border-white/10 bg-white/10 hover:bg-white/15"
              : "border-slate-200 bg-white shadow-sm hover:bg-slate-50"
          }
        `}
      >
        {dark ? "☾" : "☀"}
      </button>
    </header>

    {/* USER LOGGED IN */}
    {userData ? (
      <div
        className={`
          h-screen w-full
          ${dark ? "bg-[#090B10]" : "bg-white"}
        `}
      />
    ) : (
      <>
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`
              absolute -left-40 -top-40
              h-[450px] w-[450px]
              rounded-full blur-3xl
              ${
                dark
                  ? "bg-blue-950/30"
                  : "bg-blue-100/50"
              }
            `}
          />

          <div
            className={`
              absolute -bottom-40 -right-40
              h-[450px] w-[450px]
              rounded-full blur-3xl
              ${
                dark
                  ? "bg-blue-950/20"
                  : "bg-slate-100"
              }
            `}
          />
        </div>

        {/* LOGIN PAGE */}
        <section className="relative z-10 flex h-screen items-center px-6 pt-16 sm:px-10 lg:px-16">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">

            {/* LEFT — LOGIN */}
            <div className="flex justify-center lg:justify-start">
              <div
                className={`
                  w-full max-w-[420px]
                  rounded-[28px]
                  border
                  p-7 sm:p-9
                  transition-all duration-300
                  ${
                    dark
                      ? "border-white/10 bg-[#11141A] shadow-[0_25px_80px_rgba(0,0,0,.4)]"
                      : "border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,.08)]"
                  }
                `}
              >

                {/* Logo + Heading */}
                <div className="flex items-center gap-4">
                  <img
                    src="/orqiva-icon.svg"
                    alt="Orqiva AI"
                    className={`
                      h-12 w-12 shrink-0
                      ${dark ? "brightness-0 invert" : ""}
                    `}
                  />

                  <div>
                    <h1 className="text-[25px] font-semibold tracking-[-0.035em]">
                      Welcome to Orqiva AI
                    </h1>

                    <p
                      className={`
                        mt-1 text-sm leading-5
                        ${dark ? "text-slate-400" : "text-slate-500"}
                      `}
                    >
                      Your multi-agent chatbot platform.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8 flex items-center gap-3">
                  <div
                    className={`
                      h-px flex-1
                      ${dark ? "bg-white/10" : "bg-slate-200"}
                    `}
                  />

                  <span
                    className={`
                      text-[11px]
                      ${dark ? "text-slate-500" : "text-slate-400"}
                    `}
                  >
                    SIGN IN
                  </span>

                  <div
                    className={`
                      h-px flex-1
                      ${dark ? "bg-white/10" : "bg-slate-200"}
                    `}
                  />
                </div>

                {/* Google Login */}
                <button
                  type="button"
                  onClick={googleLogin}
                  className={`
                    group flex h-[52px] w-full
                    items-center justify-center
                    gap-3 rounded-xl
                    border text-sm font-medium
                    transition-all duration-200
                    hover:-translate-y-[1px]
                    active:translate-y-0
                    ${
                      dark
                        ? "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                        : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:shadow-md"
                    }
                  `}
                >
                  <FcGoogle size={20} />

                  <span>Continue with Google</span>

                  <span
                    className={`
                      ml-1 transition-transform duration-200
                      group-hover:translate-x-1
                      ${dark ? "text-slate-500" : "text-slate-300"}
                    `}
                  >
                    →
                  </span>
                </button>

              </div>
            </div>

            {/* RIGHT — MULTI AGENT SVG */}
            <div className="hidden h-[560px] items-center justify-center lg:flex">
              <img
                src="/orqiva-multi-agent.svg"
                alt="Orqiva AI Multi-Agent"
                className={`
                  h-auto w-full max-w-[540px]
                  transition-all duration-500
                  ${dark ? "brightness-[0.9]" : ""}
                `}
              />
            </div>

          </div>
        </section>
      </>
    )}
  </main>
);
}

export default Home;