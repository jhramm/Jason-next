"use client";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPenFill } from "react-icons/bs";
import { FaTrashAlt} from "react-icons/fa";

type blogType = {
    title: string;
    content: string;
    image: string;
    date: number;
    _id: number;
    tags: string[];
  };

export default function myBlogs() {
  const [myBlog, setMyBlog] = useState<blogType[]>([]);
  const id = localStorage.getItem("blogUserId");
  const router = useRouter();

  const getBlogs = () => {
    axios
      .get("http://localhost:8080/myblogs/" + id)
      .then((res) => {
        console.log(res);
        setMyBlog(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const deleteBlog = (id: number) => {
    axios
      .delete("http://localhost:8080/blogs/" + id)
      .then((res) => {
        console.log(res);
        setMyBlog(myBlog.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const editBlog = (id: number) => {
    router.push(`/editblog?id=${id}`);
  };

  return (
    <div>
      <SubHeader title="My Blogs" />
      <div className="text-center p-10 mb-[30px]">
            {myBlog.map((blog) => {
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

                    <div className="flex gap-3">
                      {blog.tags.map((item) => {
                        return (
                          <>
                            <div className="bg-orange-500 px-[10px] py-[5px] rounded-md">
                              <p className="text-white">{item}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>

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
    </div>
  );
}
