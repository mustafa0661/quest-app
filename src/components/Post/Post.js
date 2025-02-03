import React, { useState, useEffect, useRef } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { Container } from "@mui/material";
import CommentForm from "../Comment/CommentForm";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

function Post(props) {
  const { title, text, userName, userId, postId, likes } = props;
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList)
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    }
    else {
      deleteLike();
      setLikeCount(likeCount - 1)
    }
      
  }

  const refreshComments = () => {
    fetch("/comments?postId="+postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  const deleteLike = () => {
    fetch("/likes/" + likeId, {
      method: "DELETE",
    })
      .catch((err) => console.log(err))
  }

  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId === userId));
    if(likeControl != null){
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }
  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [commentList]);

  useEffect(() => {checkLikes()}, [])
  return (
    <div className="postContainer" style={{ margin: '10px' }}>
      <Card sx={{ maxWidth: 800, width: 800, textAlign: "left" }}> {/* width burada tanımlandı */}
        <CardHeader
          avatar={
            <Box
              component={Link}
              to={`/users/${userId}`}
              sx={{
                textDecoration: 'none',
                color: 'white',
                boxShadow: "none",
                '&:hover': {
                  color: 'lightblue',
                },
              }}
            >
              <Avatar sx={{background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                    color: 'white' }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Box> 
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton 
          onClick={handleLike}
          aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? {color: "red"} : null}/>
          </IconButton>
          {likeCount}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error? "error" :
            isLoaded? commentList.map(comment => (
              <Comment userId = {1} userName = {"USER"} text = {comment.text}></Comment>
            )) : "Loading"}
              <CommentForm userId = {1} userName = {"USER"} postId = {postId}></CommentForm>
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;