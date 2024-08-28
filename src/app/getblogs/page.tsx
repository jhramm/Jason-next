"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SubHeader from "../SubHeader/SubHeader";
import { FaSearch } from "react-icons/fa";
// import { useRouter } from "next/navigation";
import Select from "react-select";
import Loader from "../../../public/images/loader.gif";

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

export default function GetBlogs() {
  const options = [
    { value: "Technology", label: "Technology" },
    { value: "Movies", label: "Movies" },
    { value: "Music", label: "Music" },
    { value: "CurrentAffairs", label: "Current Affairs" },
    { value: "LifeStyle", label: "Life Style" },
    { value: "News", label: "News" },
    { value: "TvShows", label: "TV Shows" },
    { value: "Radio", label: "Radio" },
  ];

  const [blogs, setBlogs] = useState<blogType[]>([]);
  // const [myLike, setMyLike] = useState(false);
  const [filterBlogs, setFilterBlogs] = useState<blogType[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("blogUserId");

  // const id = userId;


  const getDetails = (id: any) => {
    sessionStorage.setItem("blogId", id);
    window.location.href = "/blogdetails";
  };

  const getBlog = () => {
    axios
      .get("http://localhost:8080/blogs")
      .then((res) => {
        console.log(res.data);
        setBlogs(res.data);
        setFilterBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  const searchBar = (val: string) => {
    const filterData = filterBlogs.filter((blog) => {
      return blog.title.toLowerCase().includes(val.toLowerCase());
    });
    setBlogs([...filterData]);
  };

  const filterByTagName = (tagNames: any) => {
    setLoading(true);
    console.log(tagNames);
    const tagArr = tagNames.map((tag: { value: string }) => tag.value);

    const payload = {
      tagNames: tagArr,
    };

    if (tagArr.length > 0) {
      axios
        .post("http://localhost:8080/filterblogs", payload)
        .then((res) => {
          setBlogs(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      getBlog();
    }
  };

  return (
    <>
      <SubHeader title="Get Blogs" />

      <div className="relative">
        <center>
          <input
            type="text"
            placeholder="Search"
            className="w-[60%] h-[50px] rounded-lg shadow-xl shadow-slate-500 mt-[30px] pl-[20px]"
            onChange={(e) => searchBar(e.target.value)}
          />
        </center>
        <FaSearch className="absolute top-12 left-[75%] text-gray-400 cursor-pointer" />
      </div>

      <div className="mt-[100px]">
        <p className="text-center mb-[10px] font-semibold">Filter Tags</p>
        <Select
          options={options}
          className="w-[300px] m-auto shadow-slate-500"
          isMulti={true}
          onChange={(selection) => {
            filterByTagName(selection);
          }}
        />
      </div>

      {!loading ? (
        <>
          <div className="text-center p-10 mb-[30px]">
            {blogs.map((blog) => {
              const formattedDate = new Date(blog.date).toLocaleString();
              return (
                <div
                  onClick={() => getDetails(blog._id)}
                  key={blog._id}
                  className="flex items-center gap-5 flex-wrap flex-col w-[80%] bg-slate-800 m-auto mb-[30px] p-10 rounded-lg border-[10px] border-[#FCC954] text-[#FCC954]"
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
                  <p className="mb-[30px]">{formattedDate}</p>

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
                  <p>{blog.likes.length} {blog.likes.length === 1? "Like" : "Likes"}</p>
                  
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="h-[50vh] flex justify-center items-center w-[100%]">
            <Image src={Loader} alt="loader" />
          </div>
        </>
      )}
    </>
  );
}
