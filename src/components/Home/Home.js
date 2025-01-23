import React from "react";
import Post from "../Post/Post";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
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
  }, []);

  if (error) {
    return <div>Error !!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "column", // Dikeyde düzenleme
            gap: 2, // Kartlar arası boşluk
            alignItems: "center",
            backgroundColor: "#cfe8fc",
            padding: "20px",
          }}
        >
          {postList.map((post) => (
            <Post key={post.id} userId = {post.userId} userName = {post.userName} title={post.title} text={post.text}></Post>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;