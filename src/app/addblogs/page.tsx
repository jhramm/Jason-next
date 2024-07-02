"use client";

import React, { useRef, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import Image from "next/image";

export default function AddBlogs() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null | any>("");

  function readFile(e: any) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        let reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    const payload = {
      title,
      content,
      image,
    };

    axios
      .post("http://localhost:8080/blogs", payload)
      .then((res) => {
        console.log(res.data);

        if (titleRef.current) {
          titleRef.current.value = "";
        }
        if (contentRef.current) {
          contentRef.current.value = "";
        }

        setImage("");
        setMessage("Blog added successfully!");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error adding blog. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
        <input type="file" name="file" onChange={readFile} />
        <br />
        <br />
        {image !== "" && (
          <center>
            <Image src={image} alt="blog" width={200} height={200} />
          </center>
        )}

        <br />
        <br />
        <button
          type="submit"
          className="w-[80%] h-[40px] bg-[#FCC954] text-[#333] font-semibold text-[18px] rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Blog"}
        </button>
        {message && <p className="mt-[20px]">{message}</p>}
      </form>
    </>
  );
}
