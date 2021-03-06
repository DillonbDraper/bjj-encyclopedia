import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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

//Uses materialUI styling to display video cards with information.  Image is clickable and goes to videoDetail.
export const Video = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Link className="card-link"
                                to={{
                                    pathname: `/videos/${props.id}`
                                }}>
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
                    {props.description}
          </Typography>
            </CardContent>
        </Card>
    )
}