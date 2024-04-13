import React from 'react';

import './VideoPlayer.css'; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';


// chapter_dict={chapter_dict} curr_module={curr_module}
function VideoPlayer({ videoSrc, chapter_dict, curr_module }) {

  const submodule = chapter_dict.submodules[curr_module];
  return (
    <Card sx={{ maxWidth: 1200}} style={{ backgroundColor: '#161616' }}>
      <CardMedia
        component="video"
        alt="green iguana"
        height="500"
        src={submodule.content.video_link}
        controls
      />
      <CardContent >
        <Typography gutterBottom component="div" sx={{ color: "white", fontWeight: 'bold', paddingTop:"0.5em", paddingBottom:"0.2em"}}>
          Module: {submodule.index} ({submodule.title})
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