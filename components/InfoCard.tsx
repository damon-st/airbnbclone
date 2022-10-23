import Image from "next/image";
import React from "react";

import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

interface Props {
  img: string;
  location: string;
  title: string;
  description: string;
  star: number;
  price: string;
  total: string;
}
export default function InfoCard(p: Props) {
  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer 
    hover:opacity-80 hover:shadow-lg transition duration-200 ease-out 
    first:border-t"
    >
      <div
        className="relative h-24 w-40 md:h-52 md:W-80 
      flex-shrink-0"
      >
        <Image
          className="rounded-2xl"
          src={p.img}
          layout={"fill"}
          objectFit={"cover"}
        />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{p.location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{p.title}</h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">{p.description}</p>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center ">
            <StarIcon className="h-5 text-red-400" />
            {p.star}
          </p>
          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{p.price}</p>
            <p className="text-right font-extralight">{p.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
