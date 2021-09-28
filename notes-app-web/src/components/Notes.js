
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import CustomCard from './CustomCard';
import FormDialog from './FormDialog';
import axios from "axios";



const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        fontSize: 40,
        marginRight: -250,

    },
    test: {
        marginTop: 20,
    },
    bgColor: {
        backgroundColor: '#f0ebeb'
    }
}));

function Notes() {

    const [notes, setNotes] = useState([]);
    const header = useStyles();
    const handleAddNote = (title, description, tags) => {
        const data = {
            title: title, description: description, tags: tags
        }
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        }
        axios.post('http://127.0.0.1:8000/api/notes', data).then(res => {
            setNotes(res.data);
        }).catch(err => {
            console.log(err)
        });
    }

    const handleDeleteNote = (id) => {
        // const newNotesData = notes.filter((note) => note.id != id)
        // setNotes(newNotesData)
        axios.delete('http://127.0.0.1:8000/api/notes/' + id)
            .then(response => {
                setNotes(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/notes')
            .then(results => results.json())
            .then(data => {
                console.log(data)
                const newNoteData = notes.concat(data)
                setNotes(newNoteData)
            });
    }, []);
    return (
        <div className="App">
            <Container className={header.test}>
                <Grid container spacing={3} className={header.bgColor}>
                    {notes.map((item) => (
                        <Grid item md={4} sm={6} xs={12} key={item.id}>
                            <CustomCard item={item} onDelete={handleDeleteNote} />
                        </Grid>
                    ))}
                </Grid>
                <FormDialog onSubmit={handleAddNote} />

            </Container>
        </div>
    );
}

export default Notes;