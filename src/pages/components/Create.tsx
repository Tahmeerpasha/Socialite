import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
export interface FormData {
  Title: string;
  Description: string;
}
const Create = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    Title: yup.string().required("*title is needed"),
    Description: yup.string().required("*description is required"),
  });
  const postReference = collection(database, "Post");

  const CreatePost = async (data: FormData) => {
    await addDoc(postReference, {
      Title: data.Title,
      Description: data.Description,
      UserId: user?.uid,
      Username: user?.displayName,
    });
    alert("Submitted successfully");
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(CreatePost)}>
      <div className="flex flex-col m-20 ml-96 mr-96 p-10 bg-blue-300 rounded-sm  ">
        <h1 className="text-center text-2xl text-white underline p-2">
          Create a Post
        </h1>
        <input
          type="text"
          placeholder="Title of post"
          className="w-96 p-4 ml-24 m-2 bg-blue-100"
          {...register("Title")}
        />
        <p className="w-96 ml-24 text-red-600">{errors.Title?.message || ""}</p>
        <textarea
          placeholder="Description of post"
          className="w-96 ml-24 p-4 m-2 bg-blue-100"
          {...register("Description")}
        />
        <p className="w-96 ml-24 text-red-600">
          {errors.Description?.message || ""}
        </p>

        {/* <input
          type="file"
          name="file"
          id="file"
          className="w-96 m-2 p-4 ml-24"
        /> */}
        <input
          type="submit"
          value="Submit"
          className="w-96 m-2 p-4 ml-24 bg-blue-600 rounded-full cursor-pointer text-white hover:scale-95"
        />
      </div>
    </form>
  );
};

export default Create;
