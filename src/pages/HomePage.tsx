import React, { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { useState } from "react";
import Post from "./components/Post";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export interface Posts {
  id: string;
  Description: string;
  Title: string;
  UserId: string;
  Username: string;
}
const HomePage = () => {
  const [listPosts, setListPosts] = useState<Posts[] | null>(null);
  const postReference = collection(database, "Post");

  const getPosts = async () => {
    const data = await getDocs(postReference);
    setListPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Posts[]
    );
  };
  useEffect(() => {
    if (user) getPosts();
  }, []);
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <div className="grid grid-cols-5 m-20 p-2">
          {listPosts?.map((post) => (
            <Post post={post} />
          ))}
        </div>
      ) : (
        <h1>Login to view the posts</h1>
      )}
    </>
  );
};

export default HomePage;
