import React, { useEffect, useState } from "react";
import { Posts } from "../HomePage";
import {
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: Posts;
}
interface Like {
  likeID: string;
  userID: string;
}

const Post = (props: Props) => {
  const { post } = props;
  const likesReference = collection(database, "Likes");
  const [user] = useAuthState(auth);
  const likesDoc = query(likesReference, where("postId", "==", post.id));
  const [likes, setLikes] = useState<Like[] | null>(null);
  const hasUserLiked = likes?.find((like) => like.userID === user?.uid);
  const AddLike = async () => {
    try {
      const newDoc = await addDoc(likesReference, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user)
        setLikes((prev) =>
          prev
            ? [...prev, { userID: user?.uid, likeID: newDoc.id }]
            : [{ userID: user?.uid, likeID: newDoc.id }]
        );
    } catch (e) {
      console.log(e);
    }
  };
  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesReference,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeid = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(database, "Likes", likeid);
      await deleteDoc(likeToDelete);
      if (user)
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeID !== likeid)
        );
    } catch (e) {
      console.log(e);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userID: doc.data().userId, likeID: doc.id }))
    );
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      <div className="m-2 p-2 w-52 h-52 flex flex-col rounded-xl bg-blue-300 ">
        <h6 className="text-sm text-end font-extralight animate-pulse">
          @{post.Username}
        </h6>
        <h1 className="p-2 font-extrabold font-serif text-2xl text-center underline">
          {post.Title}
        </h1>
        <p className="p-1 text-lg">{post.Description}</p>
        <button
          onClick={hasUserLiked ? removeLike : AddLike}
          className="p-2 rounded-lg w-10 h-10 bg-gray-200"
        >
          {hasUserLiked ? <> &#10084; </> : <p>&#x2661;</p>}
        </button>
        {likes && <p>Likes : {likes.length}</p>}
      </div>
    </>
  );
};

export default Post;
