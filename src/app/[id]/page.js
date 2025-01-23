"use client";
import { use, useEffect, useRef, useState } from "react";
import img1 from "../../../public/img1.png";
import img2 from "../../../public/img2.png";
import icon from "../../../public/icon.svg";
import m1 from "../../../public/medal1.png";
import m2 from "../../../public/medal2.png";
import m3 from "../../../public/medal3.png";
import { ChevronRight, CircleCheckBig, CopyIcon } from "lucide-react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  DoTask,
  GetScore,
  GetTask,
  GetUserTask,
  InitUser,
  TopUser,
  UpdateScore,
} from "../logic";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

// async function writeData() {
//   const ref = database.ref("users/123");
//   await ref.set({
//     username: "JohnDoe",
//     email: "johndoe@example.com",
//     profile_picture: "http://example.com/johndoe.jpg",
//   });
//   console.log("Data written successfully!");
// }

export default function Home() {
  const [btn, setBtn] = useState(1);
  const searchParams = new URLSearchParams(window.location.search);
  const [valideUser, setvalideUser] = useState(false);
  const [user, setuser] = useState(null);

  const id = useParams().id;
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  useEffect(() => {
    InitUser(id, firstName, lastName, setvalideUser);
  }, []);
  function CopyId() {
    navigator.clipboard.writeText(`https://t.me/qrorderdzbot?start=${user.id}`).then(() => {
      toast.success("text copied");
    });
  }
  useEffect(() => {
    if (valideUser === true) {
      GetScore(id, setuser);
      console.log(user);
    }
  }, [valideUser]);
  function handleClick(val){
    if(user != null){
      setBtn(val)

    }
  }
  return (
    <>
    <Toaster/>
      <main className="w-full  text-white  overflow-hidden flex justify-start flex-col h-screen">
        <div className="flex px-3 w-[95%]  justify-between  py-6  ">
          <p className="text-lg ">
            {" "}
            {firstName} {lastName}{" "}
          </p>
          <button onClick={() => CopyId()} className="flex ">
            {" "}
            <CopyIcon size={22} />{" "}
          </button>
        </div>
        <div className="w-full   md:h-[40%] hidden md:flex   items-center  flex-col justify-center ">
          <Score valide={valideUser} user={user} id={id} />
        </div>

        <div className="flex flex-col  md:overflow-hidden overflow-y-auto md:flex-row px-2  gap-2 w-full  md:w-[95%]  ">
          <div className="flex flex-row  md:flex-col  p-1 gap-2 md:w-52 md:h-full  ">
            <div
              onClick={() => handleClick(1)}
              className={` ${
                btn === 1 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-32 p-2 rounded-xl flex  flex-col justify-center items-center w-full`}
            >
              <Image className="w-14" src={img1} alt="...." />
              <p> My score </p>
            </div>
            <div
              onClick={() => handleClick(2)}
              className={` ${
                btn === 2 && "bg-sec"
              }  py-3 bg-black/20 hover:bg-sec cursor-pointer md:h-32 p-2 rounded-xl flex flex-col justify-center items-center w-full`}
            >
              <Image className="w-12" src={img2} alt="...." />
              <p> My Tasks </p>
            </div>
          </div>
          {btn === 1 && <Coin user={user} valide={valideUser} id={id} />}
          {btn === 2 && <Tasks user={user} id={id} valide={valideUser} />}
        </div>
      </main>
    </>
  );
}

function Tasks({ user }) {
  const [tasks, settasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const link = `https://t.me/qrorderdzbot?start=${user.id}`
  const message = "Join order telegram bot!"; // Optional message

  // Create the Telegram deep link
  const telegramUrl = `tg://msg_url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(message)}`;


  const handleClick = () => {
    // Open the Telegram app
    window.location.href = telegramUrl;

    // Fallback for desktop users
    setTimeout(() => {
      if (document.hidden) {
        // Telegram app was opened successfully
        return;
      } else {
        // Telegram app was not opened, redirect to Telegram web
        window.open(`https://web.telegram.org/#/im?text=${encodeURIComponent(message)} ${encodeURIComponent(link)}`, '_blank');
      }
    }, 1000); // Wait 1 second to check if the app was opened
  };


  useEffect(() => {
    if (user != null) {
      GetTask(settasks, user.task);
      console.log(tasks);

      setIsLoading(false);
    }
  }, [user]);
  return (
    <div
      id="style-1"
      className="w-full overflow-auto md:pr-5  py-3  flex flex-col gap-2 "
    >
      <a href={telegramUrl} target="_blank"  className="py-3 text-center flex justify-center w-full rounded-xl bg-main text-white">
        {" "}
        Invite your friends to get 50 point {" "}
      </a>

      {isLoading ? (
        <p> Loading ... </p>
      ) : (
        <div className="w-full flex flex-col-reverse gap-3">
          {tasks.map((val, index) => {
            return (
              <TaskLigne
                key={index}
                title={val.title}
                link={val.link}
                value={val.price}
                id={val.id}
                user={user}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function TaskLigne({ value, title, link , user , id }) {
  console.log(id);
  
  function handleClick(){

  }
  return (
    <a
      href={link}
      target="_blank"
      onClick={() => DoTask(user , value , id)}
      className="bg-black/20 flex justify-between px-6 py-5 w-full items-center rounded-2xl "
    >
      <CircleCheckBig className="hidden md:block" />
      <div className="flex  flex-col w-full">
        <p className="text-start md:px-3 w-full "> {title} </p>
        <p className="md:hidden"> {value} Point </p>
      </div>
      <button className="py-2 hidden md:block px-4  scale-90 bg-main rounded-3xl text-white ">
        {value}C
      </button>
      <ChevronRight className="md:hidden" size={20} />
    </a>
  );
}

function Coin({ id, valide, user }) {
  const [topUser, settopUser] = useState([]);
  useEffect(() => {
    TopUser(settopUser);
  }, []);
  return (
    <>
      <div id="style-1" className="w-full overflow-y-auto h-full p-1 ">
        <div className="w-full md:hidden  md:h-[45%] rounded-2xl  md:scale-105  border-[.6px] border-white/60 items-center flex flex-col justify-center ">
          <Score user={user} valide={valide} id={id} />
        </div>
        <div className="w-full flex flex-col pt-4 md:pt-0 pb-2 md:pb-0 gap-3 ">
          {topUser.map((val, index) => {
            return (
              <TopScoredLine
                key={index}
                index={index + 1}
                score={val.score}
                name={`${val.firstName} ${val.lastName}`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

function Score({ id, valide, user }) {

  const triggerConfetti = () => {
    confetti({
      particleCount: 100, // Number of confetti particles
      spread: 70, // Spread of the confetti
      origin: { y: 0.6 }, // Origin of the confetti (bottom of the screen)
    });
  };

  function handleClick(){
    setTimeout(() => {
      UpdateScore(id, 0.0001, user.score)
    } , 250)
   

  }

  

  
  return (
    <div
      onClick={() => handleClick()}
      className="flex   flex-col md:py-4 pb-6 pt-12 rounded-3xl  items-center gap-10 w-[90%]   "
    >
      <Image className="w-28 animate-bounce " src={icon} alt="..." />
      <h1  className="text-3xl h-12 text-white font-bold ">
        {" "}
        {valide && user != null ? user.score : "no score"}{" "}
      </h1>
      <p className="w-full flex text-white text-lg justify-center" > Click to get points </p>
    </div>
  );
}

function TopScoredLine({ name, score, index }) {
  return (
    <div className="w-full p-3 rounded-2xl   a bg-black/20 flex flex-col  ">
      <div className="flex flex-row-reverse px-1 justify-between gap-3 items-center">
        {index === 1 && <Image alt="..." className="w-6 pr-1" src={m1} />}
        {index === 2 && <Image alt="..." className="w-6 pr-1" src={m2} />}
        {index >= 3 && <Image alt="..." className="w-6 pr-1" src={m3} />}
        <p> Top {index} </p>
      </div>
      <div className="flex justify-between items-center  pt-3 px-1 ">
        <p> {name} </p>
        <p className="bg-main text-white px-2 py-1 rounded-2xl"> {score} </p>
      </div>
    </div>
  );
}
