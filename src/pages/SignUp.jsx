import { useRef, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const StyledForm = styled('form')(({ theme }) => ({
    padding: '1rem 1rem',
    width: '40rem',
    height: '48rem',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '52rem'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem auto',
    width: '25rem',
    backgroundColor: '#3B71CA',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    },
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const StyledBox = styled(Box)({
    textAlign: 'center',
    margin: '2rem auto'
});

const StyledSignUpButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem auto',
    marginTop: '2rem',
    width: '100%',
    backgroundColor: '#388e3c',
    marginLeft: '0.5rem',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    }
}));

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

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

    const Adornment = () => (
        <>
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {togglePassword.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        </>
    );

    return (
        <StyledCard>
            <StyledForm onSubmit={submitHandler}>
                <Typography variant="h3" fontWeight="bold" margin="2.5rem" textAlign="center" flexGrow="1">
                    Let's Get Started
                </Typography>
                <StyledBox>
                    <div>
                        <StyledButton variant="contained">Continue with Google</StyledButton>
                    </div>
                    <div>
                        <StyledButton variant="contained">Continue with Facebook</StyledButton>
                    </div>
                </StyledBox>
                <Divider sx={{ margin: '2rem' }}>or with email</Divider>
                <Grid container spacing={1} sx={{ padding: '0 1rem', marginBottom: '1.5rem' }}>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="email">Email</StyledInputLabel>
                        <TextField fullWidth required variant="outlined" id="title" type="email" placeholder="Email" inputRef={emailRef} />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="password" inputRef={passwordRef}>
                            Password
                        </StyledInputLabel>
                        <OutlinedInput
                            fullWidth
                            required
                            variant="outlined"
                            id="password"
                            type={togglePassword.showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            endAdornment={<Adornment />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledInputLabel htmlFor="confirmed-password" inputRef={confirmPasswordRef}>
                            Confirmed Password
                        </StyledInputLabel>
                        <OutlinedInput
                            fullWidth
                            required
                            variant="outlined"
                            id="confirmpassword"
                            type={togglePassword.showPassword ? 'text' : 'password'}
                            placeholder="Confirmed Password"
                            endAdornment={<Adornment />}
                        />
                    </Grid>
                    <StyledSignUpButton variant="contained" type="submit">
                        Sign Up
                    </StyledSignUpButton>
                </Grid>
            </StyledForm>
            <Typography sx={{ padding: '1rem 0 2.5rem 0' }} textAlign="center">
                Already have an account?
                <Link
                    style={{
                        color: '#42a5f5',
                        textDecoration: 'underline',
                        margin: '0 0.5rem'
                    }}
                    to={'/sign-in'}>
                    Sign in
                </Link>
            </Typography>
        </StyledCard>
    );
};

export default SignUp;
