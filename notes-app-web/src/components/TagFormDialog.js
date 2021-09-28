import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}))

export default function TagFormDialog({ onSubmit }) {
    const [open, setOpen] = React.useState(false);

    const [tag, setTag] = React.useState({
        name: '',
    });

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        onSubmit(tag.name);
        setOpen(false);
    };

    return (
        <div className={classes.fab}>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Add a Tag Start typing here
                    </DialogContentText>
                    <TextField
                        onChange={(e) => setTag({...tag, name: e.target.value})}
                        margin="dense"
                        id="name"
                        label="Tag"
                        type="text"
                        fullWidth
                    /> 
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
