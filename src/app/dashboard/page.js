"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "../../../lib/firebaseClient";
import { AddTask, GetAllUsers, GetTask } from "../logic";
import { signOut } from "firebase/auth";
function page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);

      if (!user) {
        router.push("/admin"); // Redirect to sign-in page if not authenticated
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white py-24">
        {" "}
        Loading ...{" "}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden h-screen bg-white flex flex-col ">
      <div className="w-full h-20 py-4 px-6 flex justify-between items-center bg-gray-100 ">
        <div className="flex gap-12 items-center ">
          <button onClick={() => setpage(1)} className="hover:text-main">
            {" "}
            Users{" "}
          </button>
          <button onClick={() => setpage(2)} className="hover:text-main">
            {" "}
            Tasks{" "}
          </button>
        </div>
        <button
          onClick={() => handleSignOut()}
          className="py-[10px] px-4 bg-main text-white rounded-xl"
        >
          Sign-out
        </button>
      </div>
      <div className="w-full overflow-auto h-full">
        {page === 1 && <User key="user" />}
        {page === 2 && <Tasks key="task" />}
      </div>
    </div>
  );
}

function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    GetAllUsers(setUsers);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 py-6 h-full">
      {users.map((val, index) => {
        return (
          <div key={index} className="flex justify-between px-6 py-3 rounded-lg">
            <p className="w-[40%] ">
              {" "}
              {val.firstName} {val.lastName}{" "}
            </p>
            <p className=" w-[30%] flex justify-center "> {val.id} </p>
            <p className=" w-[30%] flex justify-center ">
              {" "}
              <span className="p-2 bg-main text-white w-[80%] text-center rounded-xl ">
                {val.score}
              </span>{" "}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Tasks() {
    const [tasks , setTasks] = useState([]);
    function handleAddTask(e){
        e.preventDefault();
        AddTask(e.target[0].value , e.target[2].value , e.target[1].value , e )
    }
    useEffect(() => {
        GetTask(setTasks , [] )
    } , [])
  return (
    <div className="w-full  px-4 h-full  flex flex-col gap-4 py-6 ">
      <form onSubmit={(e) => handleAddTask(e)} className="grid grid-flow-row grid-rows-2 " >
        <input required className="my-1" type="text" placeholder="Task Title" />
        <input required className="my-1" type="number" placeholder="Task Price" />
        <input required className="my-1" type="url" placeholder="Task Link" />
        <button  className="bg-main rounded-lg text-white py-[10px] mt-2 " > Add </button>
      </form>
      <div className="w-full py-3 h-full" >
        {
            tasks.map((val , index) => {
                return <TasksCard key={index} title={val.title} score={val.price} link={val.link}  />
            })
        }
      </div>
    </div>
  );
}

function TasksCard({title , score , link}){
    return (
        <div className="w-full rounded-xl bg-gray-50 px-3 py-4 flex justify-between " >
            <p className="w-[44%]" > {title} </p>
            <p className="w-[30%]" > {link} </p>
            <p className="w-[26%] flex justify-end " > {score} </p>
        </div>
    )

}

export default page;
