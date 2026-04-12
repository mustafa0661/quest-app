import React from "react";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import PostForm from "../Post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([])

  const token = localStorage.getItem("token")
  console.log("token:", token);
  

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Box
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            backgroundColor: "#cfe8fc",
            padding: "20px",
            minHeight: "100vh",
            maxWidth: "80%", // Genişliği kontrol ediyoruz
            margin: "0 auto", // Ortalama
          }}
        >
            <PostForm userId={1} userName={"aaa"} refreshPosts = {refreshPosts}/>
          {postList.map((post) => (
            <Post likes = {post.postLikes} postId={post.id} userId = {post.userId} userName = {post.userName}
             title={post.title} text={post.text}></Post>
          ))}
        </Box>
      </React.Fragment>
    );
  }
}

export default Home;