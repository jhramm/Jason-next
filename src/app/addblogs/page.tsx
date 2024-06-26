"use client";

import React, { useRef, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";

export default function AddBlogs() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      !titleRef.current?.value ||
      !contentRef.current?.value ||
      !imageRef.current?.files?.length
    ) {
      setMessage("Please fill in all fields and select an image");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("content", contentRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8080/blogs",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Blog Added Successfully", response.data);
      setMessage("Blog added successfully!");
      // Clear the form
      titleRef.current.value = "";
      contentRef.current.value = "";
      imageRef.current.value = "";
    } catch (err) {
      console.error("Error adding blog:", err);
      setMessage("Error adding blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SubHeader title="Add Blogs" />
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 w-[60%] p-[25px] text-center m-auto mt-10 mb-10 rounded-lg border-[10px] border-[#FCC954] text-[#FCC954]"
      >
        <h1 className="text-[35px] mb-3">Create your new blog</h1>
        <input
          type="text"
          name="title"
          placeholder="TITLE: "
          className="w-[80%] h-[40px] pl-2 rounded-md"
          ref={titleRef}
        />
        <br />
        <br />
        <textarea
          placeholder="Add Content Here: "
          className="w-[80%] h-[150px] pl-2 rounded-md"
          ref={contentRef}
        ></textarea>
        <br />
        <br />
        <h2 className="mb-3">Upload the image for your blog: </h2>
        <input type="file" name="file" ref={imageRef} />
        <br />
        <br />
        <button
          type="submit"
          className="w-[80%] h-[40px] bg-[#FCC954] text-[#333] font-semibold text-[18px] rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Blog"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
}
