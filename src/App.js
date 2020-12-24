import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import "./App.css";
import Post from "./Components/Post";
import { auth, db } from "./Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./Components/ImageUpload";

function App() {
  //Config
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  //Config
  //Styles
  const useStyles = makeStyles((theme) => ({
    paper: {
      outline: "none",
      position: "fixed",
      width: 400,
      backgroundColor: "#fff",

      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const classes = useStyles();
  //Styles
  //SignUp
  const signUp = (event) => {
    event.preventDefault();
    try {
      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      });
      setOpen(false);
    } catch (error) {
      alert(error.message);
      setOpen(false);
    }
  };
  //SignUp

  //SignIn

  const signIn = (e) => {
    e.preventDefault();
    try {
      auth.signInWithEmailAndPassword(email, password);
      setOpenSignIn(false);
    } catch (error) {
      alert(error.message);
      setOpenSignIn(false);
    }
  };

  //SignIn

  //FIrebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              post: doc.data(),
            };
          })
        );
      });
  }, []);

  //FIrebase

  return (
    <div>
      <Header />

      <div className=" App">
        {/**Header */}

        {/**Header */}

        {/**Image Upload */}

        {/**Modals */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <form
            onSubmit={() => setOpenSignIn(false)}
            className="app-signup"
            style={modalStyle}
            className={classes.paper}
          >
            <center>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </center>
            <center>
              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </center>
          </form>
        </Modal>
        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <form
            onSubmit={() => setOpenSignIn(false)}
            className="app-signup"
            style={modalStyle}
            className={classes.paper}
          >
            <center>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </center>
            <center>
              <Button type="submit" onClick={signIn}>
                Sign In
              </Button>
            </center>
          </form>
        </Modal>
        <div className="auth">
          {user ? (
            <div className="login-container">
              <Button
                className="login-contianer"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className="login-contianer">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  setOpenSignIn(true);
                }}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/**Modals */}

        {/*Post*/}

        {user ? (
          posts.map(({ post, id }) => {
            return (
              <Post
                user={user}
                postId={id}
                key={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            );
          })
        ) : (
          <h3 className="msg">Login To Upload Post And See Post :)</h3>
        )}
        {/*Post*/}
      </div>
      {user?.displayName ? <ImageUpload username={user.displayName} /> : null}
      {/**Image Upload */}
    </div>
  );
}

export default App;
