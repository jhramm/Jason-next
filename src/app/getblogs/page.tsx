"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";

export default function GetBlogs() {
  type blogType = {
    title: string;
    content: string;
    image: string;
    date: number;
  };

  const [blogs, setBlogs] = useState<blogType[]>([]);
  const getBlog = () => {
    axios
      .get("http://localhost:8080/blogs")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <SubHeader title="Get Blogs" />
      <div className="text-center p-10 mb-[30px]">
        {blogs.map((blog) => {
          const formattedDate = new Date(blog.date).toLocaleString();
          return (
            <>
              <div className="flex items-center gap-5 flex-wrap flex-col w-[80%] bg-slate-800 m-auto mb-[30px] p-10 rounded-lg border-[10px] border-[#FCC954] text-[#FCC954]">
                <h1 className="pb-5 text-[30px] uppercase">{blog.title}</h1>
                <p className="pb-5">{blog.content}</p>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={300}
                  height={300}
                  className="pb-2"
                />
                <p className="mb-[30px]">{formattedDate}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
