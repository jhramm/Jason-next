"use client";
import React, { useEffect, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";
import Image from "next/image";

type blogType = {
  title: string;
  content: string;
  image: string;
  date: number;
  _id: number;
  tags: string[];
  username: string;
  likes: number;
};

export default function BlogDetails() {
  const id = sessionStorage.getItem("blogId");
  const [myLike, setMyLike] = useState(false);
  const userId = localStorage.getItem("blogUserId");
  const [blog, setBlog] = useState<blogType>();

  useEffect(() => {
    if (!id) {
      console.error("No blog ID found in sessionStorage");
      return;
    }

    axios
      .get(`http://localhost:8080/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        res.data.likes.forEach((item: any) => {
          if (item.userId === userId) {
            setMyLike(true);
          }
        });
      })
      .catch((e) => {
        console.error("Error fetching blog details:", e);
      });
  }, [id, userId]);

  const likeBlog = (blogId: any) => {
    if (!blogId) {
      console.error("Blog ID is not valid for liking");
      return;
    }

    if (myLike) return;

    const payload = {
      likes: [
        {
          userId: localStorage.getItem("blogUserId"),
          liked: true,
        },
      ],
    };

    axios
      .patch(`http://localhost:8080/likes/${blogId}`, payload)
      .then((res) => {
        console.log("Blog liked:", res.data);
        setMyLike(true);
      })
      .catch((e) => {
        console.error("Error liking the blog:", e);
      });
  };

  if (!blog) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <SubHeader title="Blog Details" />
      <div
        key={blog._id}
        className="flex items-center gap-5 flex-wrap flex-col w-[80%] bg-slate-800 m-auto mb-[30px] mt-[30px] p-10 rounded-lg border-[10px] border-[#FCC954] text-[#FCC954]"
      >
        <h1 className="pb-5 text-[30px] uppercase">{blog.title}</h1>
        <p className="pb-5">{blog.content}</p>
        <Image
          src={blog.image}
          alt={blog.title}
          width={300}
          height={300}
          className="pb-2"
        />

        <div className="flex gap-3">
          {blog.tags.map((item, index) => (
            <div
              key={index}
              className="bg-orange-500 px-[10px] py-[5px] rounded-md"
            >
              <p className="text-white">{item}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="uppercase">Created By: {blog.username}</h3>
        </div>
        <p>The blog is {myLike ? "" : "not"} liked by this user</p>

        {!myLike ? (
          <button onClick={() => likeBlog(id)} className="bg-[yellow] w-[80px] h-[40px] rounded-md">Like <FaThumbsUp className="m-auto"/></button>
        ) : (
          <button disabled className="bg-gray-500 w-[80px] h-[40px] text-white rounded-md">Liked <FaThumbsDown className="m-auto"/></button>
        )}
      </div>
    </div>
  );
}
