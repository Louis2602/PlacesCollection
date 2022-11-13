import { useState } from 'react';
import {
    Box,
    Button,
    InputLabel,
    styled,
    TextField,
    Grid,
    Typography,
    Card,
    Divider,
    InputAdornment,
    IconButton,
    OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)({
    transition: '0.3s ease-in-out',
    boxShadow:
        '0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%)',
    '&:hover': {
        boxShadow:
            '0 0 0 1px rgb(53 72 91 / 4%), 0 2px 2px rgb(0 0 0 / 0%), 0 4px 4px rgb(0 0 0 / 1%), 0 10px 8px rgb(0 0 0 / 2%), 0 15px 15px rgb(0 0 0 / 2%), 0 30px 30px rgb(0 0 0 / 2%), 0 70px 65px rgb(0 0 0 / 3%)'
    }
});
const StyledInputLabel = styled(InputLabel)({
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: 'inherit'
});

const StyledForm = styled('form')({
    padding: '1rem 1rem',
    width: '40rem',
    height: '49rem'
});

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem auto',
    width: '25rem',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    }
}));
const StyledBox = styled(Box)({
    textAlign: 'center',
    margin: '2rem auto'
});
const SignIn = () => {
    const [togglePassword, setTogglePassword] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setTogglePassword({
            ...togglePassword,
            showPassword: !togglePassword.showPassword
        });
    };
    const submitHandler = () => {};
    return (
        <StyledCard>
            <StyledForm onSubmit={submitHandler}>
                <Typography variant="h3" fontWeight="bold" margin="2.5rem" textAlign="center" flexGrow="1">
                    Welcome back
                </Typography>
                <StyledBox>
                    <div>
                        <StyledButton
                            variant="contained"
                            sx={{
                                backgroundColor: '#3B71CA'
                            }}>
                            Continue with Google
                        </StyledButton>
                    </div>
                    <div>
                        <StyledButton
                            variant="contained"
                            sx={{
                                backgroundColor: '#3B71CA'
                            }}>
                            Continue with Facebook
                        </StyledButton>
                    </div>
                </StyledBox>
                <Divider sx={{ margin: '2rem' }}>or with email</Divider>
                <Grid container spacing={1} sx={{ padding: '0 1rem' }}>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="email">Email</StyledInputLabel>
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            id="title"
                            type="email"
                            placeholder="Email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="password">Password</StyledInputLabel>
                        <OutlinedInput
                            fullWidth
                            required
                            variant="outlined"
                            id="password"
                            type={togglePassword.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {togglePassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <StyledButton
                        variant="contained"
                        type="submit"
                        sx={{
                            marginTop: '2rem',
                            width: '100%',
                            backgroundColor: '#388e3c'
                        }}>
                        Sign In
                    </StyledButton>
                </Grid>
                <Typography sx={{ marginTop: '2rem' }} textAlign="center">
                    Don't have an account?
                    <Link
                        style={{
                            color: '#42a5f5',
                            textDecoration: 'underline',
                            margin: '0 0.5rem'
                        }}
                        to={'/sign-up'}>
                        Sign up
                    </Link>
                </Typography>
            </StyledForm>
        </StyledCard>
    );
};

export default SignIn;
