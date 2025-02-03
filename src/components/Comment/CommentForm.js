import { Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function CommentForm (props){
    const {userId, userName, postId} = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent>
            <OutlinedInput
            id="outlined-adorment-amount"
            multiline
            placeholder="title"
            inputProps={{maxLength : 250}}
            fullWidth
            onChange = {(i) => handleChange(i.target.value)}
            startAdornment = {
                <InputAdornment position='start'>
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
                </InputAdornment>
            }
            endAdornment = {
                <InputAdornment position='end'>
                    <Button
                        variant = "outlined"
                        style={{background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                color: 'white'}}
                        onClick={handleSubmit}
                    >Comment</Button>
                    </InputAdornment>
            }
            value = {text}
            ></OutlinedInput>
        </CardContent>
    )
        
    
}

export default CommentForm;
