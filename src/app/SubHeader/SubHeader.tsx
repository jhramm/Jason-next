import Link from "next/link";
import React from "react";
type propsType = {
  title: string;
};

export default function SubHeader({ title }: propsType) {
  return (
    <div className="h-[40vh] bg-slate-800 text-white flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-[50px]">{title}</h1>
        <p>
          <Link href={"/"} className="text-white"> Home </Link>
        </p>
      </div>
    </div>
  );
}
