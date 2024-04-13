import React from 'react';

import './VideoPlayer.css'; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';

function VideoPlayer({ videoSrc, title, description }) {
  return (
    <Card sx={{ maxWidth: 1200 }}>
      <CardMedia
        component="video"
        alt="green iguana"
        height="500"
        src={"./videos/3.1.mp4"}
        controls
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Module 3.1: Introduction
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Knowing pointers is important to getting your CS degree.
        </Typography>
      </CardContent>
    </Card>
  );
}

// function VideoPlayer({videoPath}) {
//   return (
//     // <CardMedia src='./videos/3.1.mp4'>
//     //   {/* <video width="320" height="240" controls>
//     //     <source src='./videos/3.1.mp4' type='video/mp4'></source>
//     //   </video> */}
//     // </CardMedia>
//     <CardMedia
//       component='video'
//       image={"./videos/3.1.mp4"}
//     />
//       // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//     // <div className="video-player">
//     //   <iframe
//     //     src="videos/3.1.mp4"
//     //     // frameborder='0'
//     //     // allow="accelerometer; encrypted-media"
//     //     // allowfullscreen
//     //     // title='video'
//     //   />
//     // </div>
//   );
// }

export default VideoPlayer;