import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, styled, TextField, Grid, Typography, Card, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Facebook, Google } from '@mui/icons-material';
import { onValue, ref } from 'firebase/database';

import { signin } from '../redux/features/counterSlice';
import { db } from '../firebase/firebaseConfig';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: theme.palette.mode === 'dark' ? '0 0 0 1px rgb(16 22 26 / 40%)' : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5'
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)'
    }
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: 'var(--main--color)',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""'
    },
    'input:hover ~ &': {
        backgroundColor: 'var(--main--color)'
    }
});

const StyledCard = styled(Card)({
    transition: '0.1s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
        backgroundColor: 'inherit'
    }
}));

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
    margin: '0.7rem auto',
    width: '20rem',
    backgroundColor: 'var(--main--color)',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: 'var(--main--hover--color)'
    },
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const StyledSignInButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    marginTop: '0.5rem',
    width: '100%',
    backgroundColor: 'var(--main--color)',
    '&:hover': {
        backgroundColor: 'var(--main--hover--color)'
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '3rem',
    marginRight: '3rem',
    [theme.breakpoints.down('md')]: {
        padding: 0,
        margin: 0
    }
}));

const StyledLink = styled(Link)({
    color: '#42a5f5',
    textDecoration: 'underline',
    margin: '0 0.5rem'
});

const StyledTypo = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem'
}));

const StyledTypoBot = styled(Typography)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        fontSize: '0.9rem'
    }
}));

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .min(6, 'Username/Email must be at least 6 characters')
        .max(30, 'Username/Email must not exceed 30 characters')
        .matches(/^\w*$/, 'Username must not include special chars'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters')
});

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const {
        reset,
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

    const onSubmit = (data) => {
        const dataRef = ref(db, `/accounts/${data.username}}`);
        onValue(dataRef, (db) => {
            const dbData = db.val();
            if (dbData?.password === data.password) {
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
                reset();
            }
        });
    };

    return (
        <section>
            <h1>Sign In</h1>
            <StyledCard>
                <StyledForm>
                    <StyledSignInBox>
                        <StyledBox spacing={1}>
                            <StyledButton endIcon={<Google />}>Continue with</StyledButton>
                            <StyledButton endIcon={<Facebook />}>Continue with</StyledButton>
                            <Divider sx={{ margin: '1rem' }}>or with email</Divider>
                        </StyledBox>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <StyledTextField
                                    required
                                    id="Username"
                                    name="Username"
                                    label="Username"
                                    fullWidth
                                    variant="filled"
                                    {...register('username')}
                                    error={errors.username ? true : false}
                                    value={userData.username}
                                    onChange={(e) => {
                                        setUserData({ ...userData, username: e.target.value });
                                    }}
                                />
                                <StyledTypo variant="inherit" color="error">
                                    {errors.username?.message}
                                </StyledTypo>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <StyledTextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={togglePassword.showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="filled"
                                    {...register('password')}
                                    error={errors.password ? true : false}
                                    value={userData.password}
                                    onChange={(e) => {
                                        setUserData({ ...userData, password: e.target.value });
                                    }}
                                />
                                <StyledTypo variant="inherit" color="error">
                                    {errors.password?.message}
                                </StyledTypo>
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
                                                <Checkbox
                                                    checkedIcon={<BpCheckedIcon />}
                                                    icon={<BpIcon />}
                                                    color="primary"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                />
                                            )}
                                        />
                                    }
                                    label={<StyledTypoBot>Show Password</StyledTypoBot>}
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
        </section>
    );
};

export default SignIn;
