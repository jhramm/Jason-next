"use client";

import React, { useRef, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import Image from "next/image";
import { allTags } from "@/constants/TagsData";

export default function AddBlogs() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null | any>("");

  const userId = localStorage.getItem("blogUserId");
  const username = localStorage.getItem("username");

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
      tags,
      userId,
      username

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

  const [tags, setTags] = useState<string[]>([]);

  const handleTagSelect = (tagName: string, selected: boolean) => {
    if (selected) {
      setTags((prev) => [...prev, tagName]);
    }
    else {
      setTags((prev) => prev.filter(tags => tags != tagName));
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
        <hr />
        <h2 className="my-3">Select the tags for your blog: </h2>
        <div className="w-[80%] flex justify-between items-center gap-5 flex-wrap p-[20px] m-auto">
         {allTags.map((item) => {
          return (
            <>
              <div className="bg-orange-500 p-[15px] text-white text-center rounded-lg cursor-pointer flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="tags"
                  onChange={(e) =>
                    handleTagSelect(item.name, e.target.checked)
                  }
                />
                <p>{item.name}</p>
              </div>
            </>
          );
         })}
        </div>

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
