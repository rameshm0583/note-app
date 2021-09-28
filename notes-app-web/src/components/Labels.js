import * as React from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

import { useState } from 'react';
import TagFormDialog from './TagFormDialog';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function Labels() {
    const classes = useStyles();
    const [labels, setLabels] = useState([]);

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tags')
            .then(results => results.json())
            .then(data => {
                setLabels(data);
            });
    }, []);
    const handleAddLabel = (name) => {
        const data = {
            name: name
        }
        axios.post('http://127.0.0.1:8000/api/tags', data).then(res => {
            setLabels(res.data);
        }).catch(err => {
            console.log(err)
        });
    }

    const handleDeleteLabel = (id) => {
        // const newLabelData = labels.filter((label) => label.id != id)
        // setLabels(newLabelData)
        axios.delete('http://127.0.0.1:8000/api/tags/' + id)
            .then(response => {
                setLabels(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return (
        <div className="App">
            <Container>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        List of Available Tags
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            {labels.map((item) => (
                                <ListItem key={item.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon onClick={() => handleDeleteLabel(item.id)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>
                <TagFormDialog onSubmit={handleAddLabel} />
            </Container>
        </div>
    );
}

export default Labels;