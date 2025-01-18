"use client";
import { useState } from "react";
import img1 from "../../../public/img1.png";
import img2 from "../../../public/img2.png";
import icon from "../../../public/icon.svg";
import m1 from "../../../public/medal1.png";
import m2 from "../../../public/medal2.png";
import m3 from "../../../public/medal3.png";


import { ChevronRight, CircleCheckBig, CopyIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [btn, setBtn] = useState(1);
  const searchParams = new URLSearchParams(window.location.search);
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  return (
    <>
      <main className="w-full  text-white  overflow-hidden flex justify-start flex-col h-screen">
        <div className="flex px-3 w-[95%]  justify-between  py-6  ">
          <p className="text-lg "> {firstName} {lastName} </p>
          <button className="flex ">
            {" "}
            <CopyIcon size={22} />{" "}
          </button>
        </div>
        <div className="w-full   md:h-[40%] hidden md:flex   items-center  flex-col justify-center ">
          <Score />
        </div>

        <div className="flex flex-col  md:overflow-hidden overflow-y-auto md:flex-row px-2  gap-2 w-full  md:w-[95%]  ">
          <div className="flex flex-row  md:flex-col  p-1 gap-2 md:w-52 md:h-full  ">
            <div
              onClick={() => setBtn(1)}
              className={` ${
                btn === 1 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-32 p-2 rounded-xl flex  flex-col justify-center items-center w-full`}
            >
              <Image className="w-14" src={img1} alt="...." />
              <p> My score </p>
            </div>
            <div
              onClick={() => setBtn(2)}
              className={` ${
                btn === 2 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-32 p-2 rounded-xl flex flex-col justify-center items-center w-full`}
            >
              <Image className="w-12" src={img2} alt="...." />
              <p> My Tasks </p>
            </div>
          </div>
          {btn === 1 && <Coin />}
          {btn === 2 && <Tasks />}
        </div>
      </main>
    </>
  );
}

function Tasks({ data }) {
  return (
    <div
      id="style-1"
      className="w-full overflow-hidden md:overflow-auto md:pr-5  py-2  flex flex-col gap-2 "
    >
      <button className="py-3 w-full rounded-2xl bg-main text-white" > Ivite your friends </button>
      <TaskLigne title="Visit this website" value={4500} />
    </div>
  );
}

function TaskLigne({ value, title }) {
  return (
    <div className="bg-black/20 flex justify-between px-6 py-5 w-full items-center rounded-2xl ">
      <CircleCheckBig className="hidden md:block" />
      <div className="flex  flex-col w-full">
        <p className="text-start md:px-3 w-full "> {title} </p>
        <p className="md:hidden"> {value}C </p>
      </div>
      <button className="py-2 hidden md:block px-4  scale-90 bg-main rounded-3xl text-white ">
        {value}C
      </button>
      <ChevronRight className="md:hidden" size={20} />
    </div>
  );
}

function Coin({ data }) {
  return (
    <>
      <div id="style-1" className="w-full overflow-y-auto h-full p-1 ">
        <div className="w-full md:hidden  md:h-[45%] rounded-2xl  md:scale-105  border-[.6px] border-white/60 items-center flex flex-col justify-center ">
          <Score />
        </div>
        <div className="w-full flex flex-col pt-4 md:pt-0 pb-2 md:pb-0 gap-3 ">
          <TopScoredLine index={1} score={2000300} name="Sayah abdel-ilah" />
          <TopScoredLine index={2} score={2000300} name="Yasser leshab" />
          <TopScoredLine index={3} score={2000300} name="Ali abdelnabi" />
          <TopScoredLine index={3} score={2000300} name="Ali abdelnabi" />
          <TopScoredLine index={3} score={2000300} name="Ali abdelnabi" />
          <TopScoredLine index={5} score={2000300} name="Ali abdelnabi" />
        </div>
      </div>
    </>
  );
}

function Score() {
  return (
    <div className="flex  flex-col md:py-4 py-10 rounded-3xl  items-center gap-10 w-[90%]   ">
      <Image className="w-28" src={icon} alt="..." />
      <h1 className="text-3xl text-white font-bold "> 1000000400.000</h1>
    </div>
  );
}

function TopScoredLine({name , score , index}) {
  return (
    <div className="w-full p-3 rounded-2xl   a bg-black/20 flex flex-col  " >
        <div className="flex flex-row-reverse px-1 justify-between gap-3 items-center" >
            {index === 1 && <Image alt="..." className="w-6 pr-1" src={m1} />}
            {index === 2 && <Image alt="..." className="w-6 pr-1" src={m2} />}
            {index === 3 && <Image alt="..." className="w-6 pr-1" src={m3} />}
            {index === 1 && <p> Top 1 </p>}
            {index === 2 && <p> Top 2 </p>}
            {index === 3 && <p> Top 3 </p>}
        </div>
        <div className="flex justify-between items-center  pt-3 px-1 " >

          <p> {name} </p>
          <p className="bg-main text-white px-2 py-1 rounded-2xl" > {score} </p>

        </div>
    </div>
  );
}
