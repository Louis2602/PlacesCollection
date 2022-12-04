import { useRef, useState } from 'react';
import { Box, Button, Select, InputLabel, MenuItem, FormControl, styled, TextField, Grid, Typography, Card, Rating } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    transition: '0.3s ease-in-out',
    boxShadow:
        '0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%)',
    '&:hover': {
        boxShadow:
            '0 0 0 1px rgb(53 72 91 / 4%), 0 2px 2px rgb(0 0 0 / 0%), 0 4px 4px rgb(0 0 0 / 1%), 0 10px 8px rgb(0 0 0 / 2%), 0 15px 15px rgb(0 0 0 / 2%), 0 30px 30px rgb(0 0 0 / 2%), 0 70px 65px rgb(0 0 0 / 3%)'
    },
    width: '100%'
}));

const StyledInputLabel = styled(InputLabel)({
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: 'inherit'
});

const StyledButton = styled(Button)({
    font: 'inherit',
    cursor: 'pointer',
    backgroundColor: 'var(--main--color)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    border: '1px solid var(--main--color)',
    borderRadius: '4px',
    fontWeight: 'bold',
    '&:hover, active': {
        backgroundColor: 'var(--main--hover--color)',
        borderColor: 'var(--main--hover--color)'
    }
});
const StyledBox = styled(Box)({
    marginTop: '1rem',
    textAlign: 'right'
});

const StyledForm = styled('form')(({ theme }) => ({
    padding: '1rem 1rem',
    width: '40rem',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const NewPlaceForm = ({ onAddPlace }) => {
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    const [rating, setRating] = useState(2);
    const [hover, setHover] = useState(-1);
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredType = type;
        const enteredRating = rating;
        const enteredImage = imageInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const placesData = {
            title: enteredTitle,
            type: enteredType,
            rating: enteredRating,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription
        };
        onAddPlace(placesData);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleClick = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <StyledCard>
            <StyledForm onSubmit={submitHandler}>
                <Grid container spacing={1} direction="column">
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <StyledInputLabel htmlFor="type">Type of place</StyledInputLabel>
                            <Select
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                open={open}
                                fullWidth
                                required
                                value={type}
                                label="Type of place"
                                onChange={handleTypeChange}
                                onClick={handleClick}>
                                <MenuItem value="restaurant">Restaurants</MenuItem>
                                <MenuItem value="hotel">Hotels</MenuItem>
                                <MenuItem value="attraction">Attractions</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="title">Title</StyledInputLabel>
                        <TextField fullWidth required variant="outlined" id="title" type="text" inputRef={titleInputRef} placeholder="Title" />
                    </Grid>
                    <Grid item>
                        <StyledInputLabel htmlFor="image">Image Url</StyledInputLabel>
                        <TextField fullWidth type="url" variant="outlined" id="image" inputRef={imageInputRef} placeholder="Image url" />
                    </Grid>
                    <Grid item>
                        <StyledInputLabel htmlFor="address">Address</StyledInputLabel>
                        <TextField fullWidth required variant="outlined" id="address" type="text" inputRef={addressInputRef} placeholder="Address" />
                    </Grid>
                    <Grid item>
                        <StyledInputLabel htmlFor="description">Rating</StyledInputLabel>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                precision={0.1}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                            />
                            <Typography sx={{ mx: 1 }}>{hover !== -1 ? `(${hover})` : `(${rating})`}</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <StyledInputLabel htmlFor="description">Description</StyledInputLabel>
                        <TextField
                            fullWidth
                            rows={6}
                            multiline
                            required
                            variant="outlined"
                            id="description"
                            type="text"
                            inputRef={descriptionInputRef}
                            placeholder="Description"
                        />
                    </Grid>
                    <StyledBox flex="1">
                        <StyledButton type="submit">Add Place</StyledButton>
                    </StyledBox>
                </Grid>
            </StyledForm>
        </StyledCard>
    );
};

export default NewPlaceForm;
