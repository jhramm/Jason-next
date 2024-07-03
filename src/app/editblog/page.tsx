"use client";

import React, { useEffect, useRef, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function EditBlog() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null | any>("");
  const [blog, setBlog] = useState<{
    title: string;
    content: string;
    image: string;
    _id: number;
  } | null>(null);

  const getBlog = (id: string) => {
    axios
      .get("http://localhost:8080/blogs/" + id)
      .then((res) => {
        console.log(res.data);
        setBlog(res.data);
        if (titleRef.current) titleRef.current.value = res.data.title;
        if (contentRef.current) contentRef.current.value = res.data.content;
        setImage(res.data.image);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) {
      getBlog(id);
    }
  }, [id]);

  function readFile(e: React.ChangeEvent<HTMLInputElement>) {
    let files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    axios
      .put(`http://localhost:8080/blogs/${id}`, { title, content, image })
      .then((res) => {
        console.log(res);
        setMessage("Blog updated successfully!");
        router.push('/getblogs');
      })
      .catch((err) => {
        console.error("Error updating blog:", err);
        setMessage("Error updating blog. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <SubHeader title="Edit Blogs" />
      <form
        onSubmit={handleEdit}
        className="bg-slate-800 w-[60%] p-[25px] text-center m-auto mt-10 mb-10 rounded-lg border-[10px] border-[#FCC954] text-[#FCC954]"
      >
        <h1 className="text-[35px] mb-3">Edit your blog</h1>
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
        {image && (
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
          {isSubmitting ? "Submitting..." : "Edit Blog"}
        </button>
        {message && <p className="mt-[20px]">{message}</p>}
      </form>
    </div>
  );
}
