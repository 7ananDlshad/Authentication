import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Test from "./test";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./User";

function App() {
  const [uid, setUid] = useState("");
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!logged)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
          setLogged(true);
        }
      });
  }, [logged]);

  const handleUid = (id) => {
    setUid(id);
  };
  return (
    <>
      <Router>
        <Route path="/" exact>
          <Test handleUid={handleUid} />
        </Route>
        <Route path="/main">
          <User uid={uid} />
        </Route>
      </Router>
    </>
  );
}

export default App;
