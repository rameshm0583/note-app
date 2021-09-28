import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Checkbox, Fab, makeStyles, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}))

export default function FormDialog({ onSubmit }) {

    // const tags = [
    //     { id: 1, name: 'Sravan' },
    //     { id: 2, name: 'Kumar' },
    // ];
    //let tags = [];
  

    //let tags = [];
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [tags, setTags] = React.useState([]);
    const [tagData, setTagData] = React.useState({ id: '', name: '' });
    const [tag, setTagName] = React.useState([]);
    const [tagId, setTagId] = React.useState([]);

    const [note, setNote] = React.useState({
        title: '',
        description: '',
        tags: []
    });

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tags')
            .then(results => results.json())
            .then(data => {
                console.log(data)
                setTags(data);
                //const tags = data
            });
    }, []);



    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const tagsData = note.tags;

    const handleSubmit = () => {
        setNote({ ...note, tags: tagsData })
        onSubmit(note.title, note.description, note.tags);
        setOpen(false);
    };

    const ITEM_HEIGHT = 48;

    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, tag, theme) {
        // return {
        //     fontWeight:
        //     tag.indexOf(name) === -1
        //             ? theme.typography.fontWeightRegular
        //             : theme.typography.fontWeightMedium,
        // };
        return {
            fontWeight: 5,
        };
    }

    // const names = [
    //     'Oliver Hansen',
    //     'Van Henry',
    //     'April Tucker',
    //     'Ralph Hubbard',
    //     'Omar Alexander',
    //     'Carlos Abbott',
    //     'Miriam Wagner',
    //     'Bradley Wilkerson',
    //     'Virginia Andrews',
    //     'Kelly Snyder',
    // ];



    const handleChange = (event) => {

        // const {
        //     target: { value },
        // } = event;
        // setTagName(
        //     typeof value === 'string' ? value.split(',') : value, 
        // );
        setTagName(event.target.value)
        //console.log(value) 
        console.log(note)
        //setNote({ ...note, tags: event.target.value })
    };

    const selectTag = (tag) => {
        tagsData.push(tag);
        console.log(tagsData)
    }




    return (
        <div className={classes.fab}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Add a note Start typing here
                    </DialogContentText>
                    <TextField
                        onChange={(e) => setNote({ ...note, title: e.target.value })}

                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                        placeholder="Please add the Description here"
                        label="Description"
                        id="description"
                        multiline
                        minRows={2}
                        maxRows={5}
                        fullWidth
                    />
                    <br />
                    <br />
                    <Select
                        fullWidth
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={tag}
                        name={tagId}
                        id={tagId}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Select Tag" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {tags.map((item) => (
                            <MenuItem
                                onClick={() => selectTag(item)}
                                key={item.id}
                                value={item.name}
                            /*style={getStyles(item.name, tag, theme)} */
                            >
                                {/* <Checkbox /> */}
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
