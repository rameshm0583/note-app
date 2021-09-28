import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    img: {
        height:150
    }
})

function TagCard({item, onDelete}) {  
    const classes = useStyles();
    return (
        <Card>
            <CardActionArea> 
                <CardContent>
                    <Typography variant='h5'>{item.name}</Typography> 
                    <Button variant="contained" size="small" color="primary">Delete</Button>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button variant="contained" size="small" color="primary">Share</Button>
                <Button variant="contained" size="small" color="primary">Delete</Button>
            </CardActions> */}
            <Divider/>
             
        </Card>
    );
}

export default TagCard;