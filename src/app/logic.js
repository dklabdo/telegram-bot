import { database } from "../../lib/firebaseClient";
import { ref, set, onValue, push, update, get, child } from "firebase/database";

export async function InitUser(id, first, last , callBack) {
  //this is the first function that run when thre user open th web app it take the telegram id and the user first and last name then if the telegram id of the user already exist the function will get the current user score and display it in to the screen otherwise the function will create a new collection with the user telegram id and the score set to

  const dbRef = ref(database, `/user/${id}`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log("Fetched data:", snapshot.val());
      callBack(true)
      return true;
    } else {
      const data = {
        firstName: first,
        lastName: last,
        id: id,
        score: 0,
      };
      set(dbRef, data)
        .then(() => {
          console.log("Data written successfully!");
          callBack(true)
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

export function GetScore(id, callback) {
  // get the use score
  const dbRef = ref(database, `user/${id}`);
  
 
    console.log("test");
    
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      
      if(data != null){
        callback(data.score);
      }
      
    });
  
}

export function GetTask(id) {
  // this function get all the tasks and filter them the task that the user already finish them will not be displayed
}

export function DoTask(id, value) {
  // the function that work when a user want to do a task and it will update the score after the task has been completed
}

export function UpdateScore(id, val , score) {
  // this function update the score with the value
  const dbRef = ref(database, `/user/${id}`);
  update(dbRef, {score : parseFloat((score + Number(val)).toFixed(3)) })
    .then(() => {
      console.log("Data updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });

}

export function AfiliateLink(link) {
  // once someone add your link into his account this function will update your score
}

export async function TopUser() {
  // return the top 10 scored user
  const dbRef = ref(database, `/user`);
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } 
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function Takbis(id) {
  // increment the score on every click
}
