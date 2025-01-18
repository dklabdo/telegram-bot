"use client";
import { useState } from "react";
import img1 from "../../public/img1.png";
import img2 from "../../public/img2.png";
import icon from "../../public/icon.svg";
import m1 from "../../public/medal1.png";
import m2 from "../../public/medal2.png";
import m3 from "../../public/medal3.png";
import { ChevronRight, CircleCheckBig, CopyIcon } from "lucide-react";
import Image from "next/image";
export default function Home() {
  const [btn, setBtn] = useState(1);
  return (
    <>
      <main className="w-full  text-white p-4 flex justify-center items-center h-screen">
        <div className="bg-black/30 flex flex-col gap-10 text-center px-3 py-12 rounded-2xl " >
          <h1> To use this web app you need to pass by the qr order telegram bot </h1>
          <a href="https://t.me/qrorderdzbot" className="bg-main rounded-2xl text-white py-3 px-4" > Join now </a>
        </div>
      </main>
    </>
  );
}

