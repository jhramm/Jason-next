"use client";
import React, { useRef } from "react";
import SubHeader from "../SubHeader/SubHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createUser = async () => {
    const payload = {
      username: userNameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
    };
    axios
      .post("http://localhost:8080/signup", payload)
      .then((res) => {
        console.log(res);
        router.push('/signin');

      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div>
        <SubHeader title="Sign Up" />
      </div>
      <div className="bg-slate-800 my-8 m-auto w-[50%] text-center border-[5px] border-[#FCC954] rounded-xl py-10 shadow-xl">
        <h2 className="text-[30px] text-[#FCC954] font-semibold">
          Create An Account
        </h2>
        <br />
        <input
          type="text"
          placeholder="USERNAME: "
          className="mb-[20px] w-[80%] p-[10px] rounded-md"
          ref={userNameRef}
        />
        <input
          type="text"
          placeholder="EMAIL: "
          className="mb-[20px] w-[80%] p-[10px] rounded-md"
          ref={emailRef}
        />

        <input
          type="password"
          placeholder="PASSWORD: "
          className="mb-[20px] w-[80%] p-[10px] rounded-md"
          ref={passwordRef}
        />

        <button className="bg-[#FCC954] p-[10px] w-[80%] my-4 rounded-md" onClick={createUser}>
          Sign Up
        </button>
        <div>
          <Link href="/signin" className="text-[#FCC954]">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
}
