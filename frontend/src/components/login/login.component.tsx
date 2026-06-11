import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import { BookOpen, UsersRound, WandSparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import SSInput from "../ui-component/ss-input/ss-input";
import SSButton from "../ui-component/ss-button/ss-button";
import RedirectComponent from "../redirect.component";
import {
  useLoginUserMutation,
  useGoogleLoginMutation,
} from "../../redux/apis/auth.api";
import { storeUserInfo } from "../../services/auth.service";

type Inputs = {
  email: string;
  password: string;
};

const LoginComponent = () => {
  const [loginUser] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const [isBusy, setIsBusy] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsBusy(true);
    try {
      const res = await loginUser({ ...data }).unwrap();
      if (res.data.accessToken) {
        toast.success("User logged in successfully!");
        storeUserInfo({ accessToken: res.data.accessToken });
        setIsLoggedIn(true);
      }
    } catch {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    setIsBusy(true);
    try {
      const res = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();
      if (res.data.accessToken) {
        toast.success("User logged in successfully with Google!");
        storeUserInfo({ accessToken: res.data.accessToken });
        setIsLoggedIn(true);
      }
    } catch {
      toast.error("Failed to login with Google. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  if (isLoggedIn) {
    return <RedirectComponent defaultPath="/dashboard" />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4 text-slate-900 box-border dark:bg-[#0B1120] dark:text-slate-100 sm:p-8">
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-8 box-border lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-md flex-col justify-center gap-6 box-border"
        >
          <div className="hidden flex-col gap-5 lg:flex">
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
              Turns Ideas into
              <br />
              unforgettable stories
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              AI powered storytelling that helps you
              <br />
              create, connect &amp; inspire.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 rounded-2xl border border-gray-300 bg-slate-50 p-4 dark:bg-slate-800 dark:text-gray-400">
            <WandSparkles className="shrink-0 text-violet-600" />
            <div>
              <h2 className="font-bold">Smart writing</h2>
              <p>AI that understands your ideas</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 rounded-2xl border border-gray-300 bg-slate-50 p-4 dark:bg-slate-800 dark:text-gray-400">
            <BookOpen className="shrink-0 text-violet-600" />
            <div>
              <h2 className="font-bold">Endless Creativity</h2>
              <p>Stories that captivate and inspire</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 rounded-2xl border border-gray-300 bg-slate-50 p-4 dark:bg-slate-800 dark:text-gray-400">
            <UsersRound className="shrink-0 text-violet-600" />
            <div>
              <h2 className="font-bold">Built for everyone</h2>
              <p>Writers, Creators and dreamers</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full min-w-0 box-border rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/60 sm:p-8"
          >
            <div className="rounded-2xl border border-gray-300 bg-slate-50 p-4 text-sm dark:bg-slate-800 dark:text-gray-400">
              Create, edit, and generate engaging multiple story variations from a
              single prompt. Perfect for writers, creators, and enthusiasts
              exploring the future of fiction.
            </div>
          </motion.div>
        </motion.div>

        <div className="flex w-full min-w-0 justify-center box-border">
          <div className="relative w-full max-w-md min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-2xl box-border backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/60 sm:p-10">
            <button
              onClick={() => (window.location.href = "/")}
              className="mb-4 flex cursor-pointer items-center gap-2 text-sm text-blue-400 transition-colors duration-200 hover:text-blue-300"
            >
              ← Back to Home
            </button>

            <div className="mb-6 text-center">
              <h2 className="bg-clip-text text-2xl font-extrabold tracking-tight text-transparent bg-linear-to-r from-blue-400 to-indigo-400">
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Sign in to your Story Spark AI account
              </p>
            </div>

            <form className="w-full min-w-0 space-y-5 box-border" onSubmit={handleSubmit(onSubmit)}>
              <SSInput
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter your email"
                required={true}
                icon="fi fi-rr-envelope"
                register={register}
                validation={{ required: "Email is required" }}
                error={errors.email}
                autoComplete="email"
              />

              <SSInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required={true}
                icon="fi fi-rr-lock"
                register={register}
                validation={{ required: "Password is required" }}
                error={errors.password}
                autoComplete="current-password"
              />

              <div className="-mt-2 flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <SSButton text="Sign In" type="submit" isLoading={isBusy} />
            </form>

            <div className="relative mt-6 w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 px-4 font-semibold tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6 flex w-full justify-center box-border">
              <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
            </div>

            <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginComponent;
