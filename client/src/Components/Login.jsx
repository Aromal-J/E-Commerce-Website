import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { MdAlternateEmail } from "react-icons/md";
import styles from "../Styles/styles";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
                <div className="mt-2">
                  <input
                    className="appearance-none block w-full py-3 px-3 rounded-md shadow-sm placeholder-gray-400  focus:outline-blue-500  sm:text-sm "
                    name="email"
                    value={email}
                    autoComplete="email"
                    required
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
                <div className="mt-2 relative">
                  <input
                    className="appearance-none block w-full px-3 py-3 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500 sm:text-sm "
                    name="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    type={passVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {password.length > 0 &&
                    (passVisible ? (
                      <VscEyeClosed
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onMouseUp={() => setPassVisible(false)}
                      />
                    ) : (
                      <VscEye
                        className="absolute right-2 top-2 cursor-pointer"
                        size={25}
                        onMouseDown={() => setPassVisible(true)}
                      />
                    ))}
                </div>
              </label>
            </div>
            <div className={`${styles.normalFlex}  justify-between`}>
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-sm"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember Me
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot Your Password
                </Link>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mx-auto"
              >
                Submit
              </button>
              <div
                className={`${styles.normalFlex} w-full mt-5 justify-center`}
              >
                <h4>Don't have an account?</h4>
                <Link to="/sign-up " className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
