import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import logo from "../logo512.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
const Navbar = () => {
  const [user] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div className="flex justify-between font-mono bg-blue-400">
      <div className="flex">
        <img src={logo} className="ml-1 w-12 h-12 rounded-full" alt="Logo" />
        <h1 className="text-4xl ml-1 text-white">
          <a href="/"> Socialite</a>
        </h1>
        <div className="flex justify-between m-1 p-2">
          <Link to={"/"} className="ml-2  text-white underline">
            Home
          </Link>
          {!user ? (
            <Link to={"/login"} className="ml-2 text-white underline">
              Login
            </Link>
          ) : (
            <>
              <Link to={"/create"} className="ml-2 text-white underline">
                Create Post
              </Link>
              <Link
                to={"/logout"}
                className="ml-2 text-white underline"
                onClick={logout}
              >
                Logout
              </Link>
            </>
          )}
        </div>
      </div>
      {user && (
        <div className="flex align-middle">
          <p className="text-center mt-3">{user.displayName}</p>
          <img
            src={user?.photoURL || ""}
            alt="profile"
            className="rounded-full border w-10 h-10 m-1 hover:cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
