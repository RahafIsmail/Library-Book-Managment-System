import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  where,
  onSnapshot,
  doc,
  getFirestore,
  getDocs,
  updateDoc,
  collection,
  setDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "../App.css";
import AddBook from "./addBook";

function Home() {
  const [currentUser, setcurrentUser] = useState(null);
  const [booksCat, setbooksCat] = useState([]);
  const [showAdd, setshowAdd] = useState(false);
  const navigate = useNavigate();

  const getbooksCat = async () => {
    try {
      const q = query(
        collection(getFirestore(), "books"),
        where("author", "!=", "")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setbooksCat(
          querySnapshot.docs.map((eachDoc) => ({
            id: eachDoc.id,
            data: eachDoc.data(),
          }))
        );
      });
    } catch (except) {
      alert("Ohoh! An error occured.\n" + except);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), function (user) {
      setcurrentUser(user);
      if (user == null) navigate("/login");
    });
    getbooksCat();
  }, []);

  return (
    <div className="main">
      <nav className="nav">
        <h3>LBMS</h3>
        {currentUser == null && (
          <div onClick={() => navigate("/login")}>Login</div>
        )}
        {currentUser && (
          <div
            onClick={async () => {
              await signOut(getAuth());
              navigate("/login");
            }}
          >
            Logout
          </div>
        )}
      </nav>
      {currentUser && (
        <div>
          <h3>Hello {currentUser.displayName}</h3>
          <p>
            Here are the list of the books catalog in the library.{" "}
            <button onClick={() => setshowAdd(true)}>Add Book</button>
          </p>
          <table>
            <tbody>
              <tr>
                <th>BOOK ID</th>
                <th>Book Name</th>
                <th>Category</th>
                <th>Author</th>
                <th>Location</th>
                <th>Del</th>
              </tr>
              {booksCat.map((eachDoc) => (
                <tr key={eachDoc.id}>
                  <td>{eachDoc.id}</td>
                  <td>{eachDoc.data.bName}</td>
                  <td>{eachDoc.data.cat}</td>
                  <td>{eachDoc.data.author}</td>
                  <td>{eachDoc.data.location}</td>
                  <td
                    onClick={async () => {
                      try {
                        if (
                          window.confirm(
                            "Are you sure to delete?\nThis process cannnot be reversed."
                          )
                        ) {
                          await deleteDoc(
                            doc(collection(getFirestore(), "books"), eachDoc.id)
                          );
                          alert("Book Deleted from database");
                        }
                      } catch (except) {
                        alert("Ohoh! An error occured.\n" + except);
                      }
                    }}
                  >
                    X
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showAdd == true && <AddBook setshowAdd={setshowAdd} />}
    </div>
  );
}
