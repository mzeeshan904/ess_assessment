import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

 const InfoCard=({infoCardData})=> {

  console.log(infoCardData)
  return (
    <Card sx={{height: 300, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0px 4%', margin:'2%', boxSizing:'border-box' }}>
    
      <CardMedia
        sx={{ width:250, height:250, borderRadius:'15%' }}
        image={infoCardData.image}
        title="player"
      />
      <CardContent sx={{ width:'60%', display:'flex',justifyContent:'space-between', }}>
      <Typography variant='h5'>{infoCardData.type}</Typography>
        <Typography gutterBottom variant="h5" component="div">
          {infoCardData.name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {infoCardData.runs}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoCard;