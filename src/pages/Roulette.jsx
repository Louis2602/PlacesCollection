import { Box, FormControl, Grid, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const StyledForm = styled(Box)(({ theme }) => ({
    padding: '5rem 1rem',
    width: '40rem',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const StyledInputLabel = styled(InputLabel)({
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: 'inherit'
});

const data = [];
const Roulette = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleClick = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <StyledForm>
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
                            onChange={handleTypeChange}
                            onClick={handleClick}>
                            <MenuItem value="restaurant">Restaurants</MenuItem>
                            <MenuItem value="hotel">Hotels</MenuItem>
                            <MenuItem value="attraction">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                    <button onClick={handleSpinClick}>SPIN</button>
                </Grid>
            </Grid>
        </StyledForm>
    );
};

export default Roulette;
