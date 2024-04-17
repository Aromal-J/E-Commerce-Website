import React, { useState } from "react";
import styles from "../Styles/styles";
import { Link } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../server";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passVisible, setPassVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log("submited signup");
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", fullName);
    newForm.append("email", email);
    newForm.append("password", password);

    // console.log(newForm);
    console.log(newForm.get("file"));
    // console.log(newForm.get("email"));
    // console.log(import.meta.url);

    axios
      .post(`${server}/create-user`, newForm, config)
      .then((res) => {
        console.log(res);
        // if(res.data.success===true){
        //   navigate('/login')
        // }
      })
      .catch((err) => console.log(err));
  };

  const onHandleFileInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          Sign up
        </h2>
        <h4 className="mt-3 text-center text-md font-semibold text-gray-700">
          Create your account
        </h4>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={onHandleSubmit}>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 "
              ></label>
              <div className="mt-2 flex flex-col items-center justify-center gap-3">
                <span className="inline-block h-16 w-16 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full "
                    />
                  ) : (
                    <RxAvatar className="h-16 w-16" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className=" flex items-center justify-center px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
                >
                  <span>Upload File</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={onHandleFileInput}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
                <div className="mt-2">
                  <input
                    className="appearance-none block w-full py-3 px-3 rounded-md shadow-sm placeholder-gray-400  focus:outline-blue-500  sm:text-sm "
                    name="full-name"
                    value={fullName}
                    autoComplete="full-name"
                    required
                    placeholder="Full-Name"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </label>
            </div>

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

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
                <div className="mt-2 relative">
                  <input
                    className="appearance-none block w-full px-3 py-3 rounded-md shadow-sm placeholder-gray-400 focus:outline-blue-500 sm:text-sm "
                    name="password"
                    value={confirmPassword}
                    autoComplete="current-password"
                    required
                    placeholder="Confirm Password"
                    type={passVisible ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword.length > 0 &&
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
                <h4>Already a user?</h4>
                <Link to="/login " className="text-blue-600 pl-2">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
