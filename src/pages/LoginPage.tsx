import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const signInUser = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <div className="text-center m-2 p-4 rounded-full bg-yellow-500">
      <button className="rounded-xl border bg-slate-500" onClick={signInUser}>
        Sign In With Google
      </button>
    </div>
  );
};

export default LoginPage;
