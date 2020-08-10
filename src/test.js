import React, { useState, useEffect, useCallback } from "react";
import firebase, { dbRef, auth, provider } from "./firebase";
import { useHistory } from "react-router-dom";

export default function Test(props) {
  const history = useHistory();
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e) => {
    setInfo({ ...info, email: e.target.value });
  };
  const handlePassword = (e) => {
    setInfo({ ...info, password: e.target.value });
  };

  useEffect(() => {
    let unsbscribe = auth.onAuthStateChanged(userLogIn);
    return unsbscribe;
  }, []);

  const userLogIn = useCallback((firebaseuser) => {
    if (firebaseuser) {
      props.handleUid(firebaseuser.uid);
      history.push("/main");
    } else console.log("not log in");
  });

  const handleLogin = (e) => {
    e.preventDefault();
    let promise = auth.signInWithEmailAndPassword(info.email, info.password);
    promise.catch((e) => {
      console.log(e.message);
    });

    setInfo({
      email: "",
      password: "",
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let promise = auth.createUserWithEmailAndPassword(
      info.email,
      info.password
    );

    promise.then((userCredential) => {
      console.log(userCredential);
      props.handleUid(userCredential.user.uid);
      dbRef.doc(userCredential.user.uid).set({
        email: info.email,
        name: info.password,
      });
      history.push("/main");
    });

    promise.catch((e) => {
      console.log(e.message);
    });

    setInfo({
      email: "",
      password: "",
    });
  };

  const handleSignGoogle = (e) => {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <form align="middle">
      <input
        type="email"
        placeholder="Enter Email"
        onChange={handleEmail}
        value={info.email}
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={handlePassword}
        value={info.password}
      />
      <br />
      <button onClick={handleLogin}> Login</button>
      <button onClick={handleSignup}>SignUp</button>
      <button onClick={handleSignGoogle}>with Google</button>
    </form>
  );
}
