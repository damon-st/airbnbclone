import Image from "next/image";
import React from "react";
import { Nearby } from "../models/airbnb.models";

export default function MediumCard({ title, img }: Nearby) {
  return (
    <div
      className="cursor-pointer hover:scale-105 
    transform transition duration-300 ease-out"
    >
      <div className="relative h-80 w-80">
        <Image className="rounded-xl" src={img} layout={"fill"} />
      </div>
      <h3 className="text-2xl mt-3">{title}</h3>
    </div>
  );
}
