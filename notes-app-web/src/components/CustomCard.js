import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Divider, makeStyles, Typography } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles({
    img: {
        height: 150
    },
    test: {
        textAlign: "left"
    }
})

function CustomCard({ item, onDelete }) {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
            className={classes.test}
                avatar={
                    <Avatar aria-label="recipe">
                        N
                    </Avatar>
                }
                title={item.title}
                subheader={item.created_at}
            />
            <CardActionArea>
                <CardContent>
                    {/* <Typography variant='h5'>{item.title}</Typography> */}
                    <Typography variant='body2'>{item.description}</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                {item.tags.map((tag) => (
                    <Chip label={tag.name} key={tag.id} disabled size='medium' color='primary' />
                ))}
            </CardActions>
            <Divider />
            <CardActions>
                {/* <Button variant="contained" size="small" color="primary">Edit</Button> */}
                <Button variant="contained" size="small" color="primary" onClick={() => onDelete(item.id)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default CustomCard;