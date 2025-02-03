import { CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

function Comment (props){
    const {text, userId, userName} = props;

    return (
        <CardContent>
            <OutlinedInput
            disabled
            id="outlined-adorment-amount"
            multiline
            placeholder="title"
            inputProps={{maxLength : 25}}
            fullWidth
            value= {text}
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
            ></OutlinedInput>
        </CardContent>
    )
        
    
}

export default Comment;
