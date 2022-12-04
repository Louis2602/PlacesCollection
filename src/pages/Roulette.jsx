import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, styled } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useSelector } from 'react-redux';
import { db } from '../firebase/firebaseConfig';

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

const StyledButton = styled(Button)({
    font: 'inherit',
    cursor: 'pointer',
    backgroundColor: 'var(--main--color)',
    color: 'white',
    padding: '0.5rem 1.5rem',
    border: '1px solid var(--main--color)',
    borderRadius: '4px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: 'var(--main--hover--color)',
        borderColor: 'var(--main--hover--color)'
    }
});

const backgroundColor = ['#239b63', '#169ed8', '#ff3939', '#be1180', '#efe61f', '#e6471d', '#64b031', '#175fa9', '#f7a416', '#3f297e', '#e5177b'];

const Roulette = () => {
    const username = useSelector((state) => state.counter.username);
    const [mustSpin, setMustSpin] = useState(false);
    const [data, setData] = useState([{ option: '', style: { backgroundColor: '#f1377e' } }]);
    const [open, setOpen] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [type, setType] = useState();

    useEffect(() => {
        const checker = type === 'favorite' && username;
        const dataRef = ref(db, !checker ? `/places/${type}s` : `/accounts/${username}/favorites`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            const items = [];
            for (const key in loadedData) {
                const item = {
                    option: !checker ? loadedData[key].title : loadedData[key]
                };
                items.push(item);
            }
            setData(items);
        });
    });

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
                            value={type || ''}
                            label="Type of place"
                            onChange={handleTypeChange}
                            onClick={handleClick}>
                            <MenuItem value="restaurant">Restaurants</MenuItem>
                            <MenuItem value="hotel">Hotels</MenuItem>
                            <MenuItem value="attraction">Attractions</MenuItem>
                            <MenuItem disabled={!username} value="favorite">
                                Favorites
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid sx={{ margin: '1rem auto 2rem' }} item xs={12}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        spinDuration={[1]}
                        data={data}
                        prizeNumber={prizeNumber}
                        outerBorderColor={['#ccc']}
                        outerBorderWidth={[9]}
                        innerBorderColor={['#f2f2f2']}
                        radiusLineColor={['tranparent']}
                        radiusLineWidth={[1]}
                        textColors={['#f5f5f5']}
                        textDistance={55}
                        fontSize={[10]}
                        backgroundColors={backgroundColor}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                </Grid>
                <StyledButton variant="outlined" disabled={mustSpin || data.length === 0} onClick={handleSpinClick}>
                    SPIN
                </StyledButton>
            </Grid>
        </StyledForm>
    );
};

export default Roulette;
