
import React from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
function AddBook({ setshowAdd }) {
  const addBookData = async (ev) => {
    try {
      ev.preventDefault();
      await addDoc(collection(getFirestore(), "books"), {
        author: ev.target.auth.value,
        bName: ev.target.bName.value,
        cat: ev.target.cat.value,
        location: ev.target.loc.value,
      });
      alert("Book added succesfly");
      setshowAdd(false);
    } catch (except) {
      alert("OH oh. An error occured.\n" + except);
      setshowAdd(false);
    }
  };
  return (
    <div className="addcont">
      <form onSubmit={addBookData}>
        <h2>Add Book to Catalog</h2>
        <div>
          <input type="text" name="bName" placeholder="Book Name" required />
          <input type="text" name="auth" placeholder="Author" required />
          <input type="text" name="loc" placeholder="Location" />
          <select name="cat" defaultValue={"science"}>
            <option value="science">Science</option>
            <option value="art">Art</option>
            <option value="literature">Literature</option>
            <option value="music">Music</option>
            <option value="engineering">Engineering</option>
          </select>
          <button type="submit">Add</button>
        </div>
      </form>
      <button
        onClick={() => {
          setshowAdd(false);
        }}
      >
        Abort
      </button>
    </div>
  );
}

