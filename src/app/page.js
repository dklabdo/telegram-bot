"use client"
import { useState } from "react";
import img1 from "../../public/img1.png";
import img2 from "../../public/img2.png";
import icon from "../../public/icon.svg";
import { ChevronRight, CircleCheckBig, CopyIcon } from "lucide-react";
import Image from "next/image";
export default function Home() {
  const [btn, setBtn] = useState(1);
  return (
    <>
      <main className="w-full text-white  overflow-hidden flex justify-start flex-col h-screen">
        <div className="flex px-3 w-[95%]  justify-between  py-6  " >
          <p className="text-lg " >Sayah abdel-ilah</p>
          <p className="flex ">
              {" "}
              <CopyIcon size={22} /> {" "}
            </p>

        </div>
        <div className="w-full md:h-[45%] hidden md:flex md:scale-105 scale-[.8]  items-center  flex-col justify-center ">
          <div className="flex flex-col py-6 rounded-3xl md:border-[.6px] md:border-white/60 items-center gap-4 w-[90%]   ">
            <Image className="w-28" src={icon} alt="..." />
            <h1 className="text-3xl text-white font-bold "> 1000000400.000</h1>
            
          </div>
        </div>
       
        <div className="flex flex-col  md:overflow-hidden overflow-y-auto md:flex-row px-2  gap-2 w-full  md:w-[95%]  ">
          <div className="flex flex-row  md:flex-col  p-1 gap-2 md:w-52 md:h-full  ">
            <div
              onClick={() => setBtn(1)}
              className={` ${
                btn === 1 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-1/2 p-2 rounded-xl flex flex-col justify-center items-center w-full`}
            >
              <Image className="w-20"  src={img1} alt="...." />
              <p> My score </p>
            </div>
            <div
              onClick={() => setBtn(2)}
              className={` ${
                btn === 2 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-1/2 p-2 rounded-xl flex flex-col justify-center items-center w-full`}
            >
              <Image className="w-20" src={img2} alt="...." />
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
    <TaskLigne title="Visit this website" value={4500} />
    </div>
  );
}

function TaskLigne({value , title}) {
  return (
    <div className="bg-black/20 flex justify-between px-6 py-5 w-full items-center rounded-2xl ">
      <CircleCheckBig className="hidden md:block" />
      <div className="flex  flex-col w-full">
        <p className="text-start md:px-3 w-full "> {title} </p>
        <p className="md:hidden" > {value}C </p>
      </div>
      <button className="py-2 hidden md:block px-4  scale-90 bg-main rounded-3xl text-white ">
        
        {value}C
      </button>
      <ChevronRight className="md:hidden" size={20} />
    </div>
  );
}

function Coin({ link, data }) {
  return (
    <div className="w-full py-2 h-full flex flex-col  ">
      
      
    </div>
  );
}
