"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import { BsFillPenFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function GetBlogs() {
  type blogType = {
    title: string;
    content: string;
    image: string;
    date: number;
    _id: number;
  };

  const [blogs, setBlogs] = useState<blogType[]>([]);
  const router = useRouter();
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

  const deleteBlog = (id: number) => {
    axios
      .delete("http://localhost:8080/blogs/" + id)
      .then((res) => {
        console.log(res);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const editBlog = (id: number) => {
    router.push(`/editblog?id=${id}`);
  };

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
                <div className="flex gap-8 p-4">
                  <button
                    className="flex justify-center items-center bg-[green] px-[40px] py-[20px] rounded hover:bg-[#04ba04] hover:border-[2px] hover:border-[#FCC954]"
                    onClick={() => editBlog(blog._id)}
                  >
                    <BsFillPenFill className="mr-[10px]" />
                    Edit
                  </button>
                  <button
                    className="flex justify-center items-center bg-[red] px-[40px] py-[20px] rounded hover:bg-[#f14848] hover:border-[2px] hover:border-[#FCC954]"
                    onClick={() => deleteBlog(blog._id)}
                  >
                    <FaTrashAlt className="mr-[10px]" />
                    Delete
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
