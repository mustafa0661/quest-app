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
  const { title, text, userName, userId } = props;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  }

  return (
    <div className="postContainer" style={{ margin: '20px' }}>
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
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
            <FavoriteIcon style={liked ? {color: "red"} : null}/>
          </IconButton>
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
          <CardContent>
            <Typography>Additional content goes here.</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;