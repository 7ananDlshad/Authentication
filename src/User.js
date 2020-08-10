import React, { useState, useEffect } from "react";
import firebase, { dbRef, auth } from "./firebase";
import { useHistory } from "react-router-dom";

export default function User(props) {
  const history = useHistory();
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
  });
  const [arr, setArr] = useState([]);

  const setFullName = (e) => {
    setInfo({ ...info, fullname: e.target.value });
  };
  const setInputEmail = (e) => {
    setInfo({ ...info, email: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dbRef.doc(props.uid).collection("favoriteBooks").add({
      fullname: info.fullname,
      email: info.email,
    });
    setInfo({
      fullname: "",
      email: "",
    });
  };

  useEffect(() => {
    const currentuser = firebase.auth().currentUser;
    if (currentuser)
      dbRef
        .doc(currentuser.uid)
        .collection("favoriteBooks")
        .onSnapshot((querySnapshot) => {
          const books = querySnapshot.docs.map((book) => {
            return { ...book.data(), id: book.id };
          });
          setArr(books);
        });
  }, [props.uid]);

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
      <form onSubmit={onSubmit} align="middle">
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          onChange={setFullName}
          value={info.fullname}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={setInputEmail}
          value={info.email}
        />
        <button className="mx-3" type="submit">
          Submit
        </button>
      </form>
      <hr />
      {arr.map((item) => {
        return (
          <div key={item.id} align="middle">
            <h1>{item.fullname}</h1>
            <h5>{item.email}</h5>
            <button
              onClick={() => {
                dbRef
                  .doc(props.uid)
                  .collection("favoriteBooks")
                  .doc(item.id)
                  .delete();
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </>
  );
}
