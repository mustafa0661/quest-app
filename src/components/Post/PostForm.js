import React, { useState } from "react";
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
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputAdornment } from "@mui/material";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  })
}));

function PostForm(props) {
  const {userName, userId, refreshPosts } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const savePost = () => {
    fetch("/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            })
        })
        .then((res) => res.json())
        .catch((err) => console.log("Post error!"))
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  }

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickway') {
      return;
    }
    setIsSent(false);
  };

  return (
    <div className="postContainer" style={{ margin: '10px' }}>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
        Your post is sent!
        </Alert>
      </Snackbar>
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
          title={<OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder="title"
          inputProps={{maxLength : 25}}
          fullWidth
          value={title}
          onChange={ (i) => handleTitle( i.target.value)}
          >
          </OutlinedInput>}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <OutlinedInput
          id="outlined-adorment-amount"
          multiline
          placeholder="Text"
          inputProps={{maxLength : 250}}
          fullWidth
          value={text}
          onChange={ (i) => handleText( i.target.value)}
          endAdornment = {
            <InputAdornment position="end">
                <Button
                variant = "outlined"
                style={{background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                    color: 'white'}}
                onClick={handleSubmit}
                >Post</Button>
            </InputAdornment>
          }>
          </OutlinedInput>
          </Typography>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default PostForm;