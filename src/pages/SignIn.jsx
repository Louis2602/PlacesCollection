import { useState } from 'react';
import { Box, Button, styled, TextField, Grid, Typography, Card, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { signin } from '../assets/redux/features/counterSlice';

const StyledCard = styled(Card)({
    transition: '0.1s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
});

const StyledForm = styled('form')(({ theme }) => ({
    padding: '1rem 1rem',
    width: '80rem',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '2rem 1rem'
    }
}));

const StyledSignInBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '2rem',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '0 1rem'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem auto',
    marginLeft: '4rem',
    width: '20rem',
    backgroundColor: '#3B71CA',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: '0'
    }
}));

const StyledSignInButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    marginTop: '1rem',
    width: '100%',
    backgroundColor: '#388e3c',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    }
}));

const StyledOtherBox = styled(Box)(({ theme }) => ({
    marginTop: '2rem',
    [theme.breakpoints.down('md')]: {
        marginTop: 0
    }
}));

const StyledLink = styled(Link)({
    color: '#42a5f5',
    textDecoration: 'underline',
    margin: '0 0.5rem'
});

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .min(6, 'Username/Email must be at least 6 characters')
        .max(30, 'Username/Email must not exceed 30 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters')
});

const SignIn = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
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

    const onSubmit = () => {
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${userData.username}.json`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data?.password === userData.password) {
                    dispatch(signin(userData.username));
                    enqueueSnackbar('Sign in success!', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });
                    navigate('/');
                } else {
                    enqueueSnackbar('Sign in failed!', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    });
                    window.location.reload(false);
                }
            });
    };

    return (
        <>
            <h1>Sign In</h1>
            <StyledCard>
                <StyledForm>
                    <StyledSignInBox>
                        <StyledOtherBox>
                            <StyledButton variant="contained">Continue with Google</StyledButton>
                            <StyledButton variant="contained">Continue with Facebook</StyledButton>
                            <Divider sx={{ margin: '2rem' }}>or with our account</Divider>
                        </StyledOtherBox>

                        <Grid container spacing={1} sx={{ padding: '0 4rem' }}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="Username"
                                    name="Username"
                                    label="Username"
                                    fullWidth
                                    margin="dense"
                                    {...register('username')}
                                    error={errors.username ? true : false}
                                    value={userData.username}
                                    onChange={(e) => {
                                        setUserData({ ...userData, username: e.target.value });
                                    }}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.username?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={togglePassword.showPassword ? 'text' : 'password'}
                                    fullWidth
                                    margin="dense"
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                    value={userData.password}
                                    onChange={(e) => {
                                        setUserData({ ...userData, password: e.target.value });
                                    }}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.password?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="showPassword"
                                            defaultValue="false"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => (
                                                <Checkbox color="primary" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />
                                            )}
                                        />
                                    }
                                    label={<Typography>Show Password</Typography>}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <StyledSignInButton variant="contained" onClick={handleSubmit(onSubmit)}>
                                    Sign In
                                </StyledSignInButton>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ paddingTop: '1rem' }} textAlign="center">
                                    Don't have an account?
                                    <StyledLink to={'/sign-up'}>Sign up</StyledLink>
                                </Typography>
                            </Grid>
                        </Grid>
                    </StyledSignInBox>
                </StyledForm>
            </StyledCard>
        </>
    );
};

export default SignIn;
