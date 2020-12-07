import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './videoCard.css'
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    root: {
        maxWidth: 700,
    },
    media: {
        height: 140,
    },
});

export const Video = (props) => {
    const classes = useStyles();
    const myLink = `/videos/${props.id}`
    return (
        <Card className={classes.root}>
            <Link to={myLink}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.thumbnail}
                        title={props.title}
                    />
                </CardActionArea>
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    The Butterfly Guard sweep from the 'Grapplearts Guard Sweeps' App for iPhone and Android: https://www.grapplearts.com/grapplear....  This module has now been rebuilt and expanded to include step-by-step breakdowns of 32 powerful guard sweeps that get you from the bottom to the top in Brazilian jiu-jitsu, submission grappling and MMA.
          </Typography>
            </CardContent>
        </Card>
    )
}