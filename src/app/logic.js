import { database } from "../../lib/firebaseClient";
import { ref, set, onValue, push, update, get, child } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { fireStoreDb } from "../../lib/firebaseClient";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export async function InitUser(id, first, last, callBack) {
  //this is the first function that run when thre user open th web app it take the telegram id and the user first and last name then if the telegram id of the user already exist the function will get the current user score and display it in to the screen otherwise the function will create a new collection with the user telegram id and the score set to

  const dbRef = ref(database, `/user/${id}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log("Fetched data:", snapshot.val());
      if(snapshot.val().banned === true){
        toast.error("you are banned")
        setTimeout(() => {
          window.close();
        } , 3000)
      }
      callBack(true);
      return true;
    } else {
      const data = {
        firstName: first,
        lastName: last,
        task: ["Qd2LvUs7MK9yEoXI16zh"],
        id: id,
        score: 0,
        banned : false
      };
      set(dbRef, data)
        .then(() => {
          console.log("Data written successfully!");
          callBack(true);
          return true;
        })
        .catch((error) => {
          console.error("Error writing data:", error);
          return false;
        });
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function GetAllUsers(callBack) {
  const dbRef = ref(database, `/user`);

  try {
    const data = await get(dbRef);

    callBack(Object.values(data.val()));
  } catch (err) {
    console.error(err);
  }
}

export function GetScore(id, callback) {
  // get the use score
  const dbRef = ref(database, `user/${id}`);

  console.log("test");

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();

    if (data != null) {
      console.log(data);
      if(data.banned == false ) {
        callback(data);
      }

      
    }
  });
}

export function GetUserTask(id, callback) {
  // get the use score
  const dbRef = ref(database, `user/${id}`);

  console.log("test");

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data.task);

    if (data != null) {
      callback(data.task);
    }
  });
}

export async function GetTask(callBack, arr) {
  // this function get all the tasks and filter them the task that the user already finish them will not be displayed
  const q = collection(fireStoreDb, "tasks"); // Replace with your collection name
  onSnapshot(q, (querySnapshot) => {
    let res = [];

    querySnapshot.forEach((doc) => {
      if (!arr.includes(doc.id)) {
        // If the id is not found, add the object to the current array
        res.push({ ...doc.data(), id: doc.id });
      }

      callBack(res);
    });
  });
}

export function DoTask(user, value, taskId) {
  // the function that work when a user want to do a task and it will update the score after the task has been completed
  if (user) {
    setTimeout(() => {
      const dbRef = ref(database, `user/${user.id}`); // Path to the data you want to update
      const newArr = [...user.task, taskId];
      console.log(newArr);

      update(dbRef, { task: newArr })
        .then(() => {
          console.log("Data updated successfully!");
          UpdateScore(user.id, value, user.score);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }, 1000);
  }
}

export function UpdateScore(id, val, score) {
  // this function update the score with the value
  const dbRef = ref(database, `/user/${id}`);
  
  update(dbRef, { score: parseFloat((score + Number(val)).toFixed(4)) })
    .then(() => {
      console.log("Data updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
}



export function BannUser(id , valeur) {
  // this function update the score with the value
  const dbRef = ref(database, `/user/${id}`);
  
  update(dbRef, { banned : valeur })
    .then(() => {
      console.log("Data updated successfully!");
      Swal.fire({
        title: "Banned!",
        text: "The user has been banned.",
        icon: "success"
      });
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
}

export function AfiliateLink(link) {
  // once someone add your link into his account this function will update your score
}

export async function TopUser(callBack) {
  //
  // return the top 10 scored user
  const dbRef = ref(database, `/user`);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();

    if (data != null) {
      const topUser = transformAndSort(data, "score");

      callBack(topUser);
    }
  });
}

function transformAndSort(obj, sortByKey) {
  // Step 1: Convert the object of objects into an array of objects
  const arr = Object.values(obj);

  // Step 2: Sort the array based on the specified key
  arr.sort((a, b) => b[sortByKey] - a[sortByKey]); // Sort in descending order

  // Step 3: Return the top 10 objects from the sorted array
  return arr.slice(0, 10);
}

export async function AddTask(title, link, price, e) {
  try {
    const docRef = await addDoc(collection(fireStoreDb, "tasks"), {
      title: title,
      link: link,
      price: price,
    });
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}
