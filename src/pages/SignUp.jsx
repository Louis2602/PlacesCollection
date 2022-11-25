import { useState } from 'react';
import {
    Box,
    Button,
    styled,
    Grid,
    Typography,
    Card,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Checkbox,
    Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

const StyledCard = styled(Card)({
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
});

const StyledForm = styled('form')(({ theme }) => ({
    padding: '1rem 1rem',
    width: '80rem',
    minHeight: '30rem',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '52rem'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem 0',
    width: '20rem',
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

const StyledLink = styled(Link)({
    color: '#42a5f5',
    textDecoration: 'underline',
    margin: '0 0.5rem'
});

const StyledSignUpButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    marginTop: '0.5rem',
    width: '100%',
    backgroundColor: '#388e3c',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    }
}));

const SignUp = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object().shape({
        gender: Yup.bool().required('Gender is required'),
        birthday: Yup.string().required('Birthday is required'),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [genderActive, setGenderActive] = useState(false);
    const [userData, setUserData] = useState({
        gender: '',
        birthday: '',
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
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts.json`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            enqueueSnackbar('Sign up success!', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            navigate('/sign-in');
        });
    };

    return (
        <>
            <h1>Sign Up</h1>
            <StyledCard>
                <StyledForm>
                    <Box sx={{ display: 'flex' }} px={10} py={3}>
                        <Box sx={{ padding: '1rem 4rem 1rem 0' }} container spacing={1}>
                            <StyledBox>
                                <StyledButton variant="contained">Continue with Google</StyledButton>
                                <StyledButton variant="contained">Continue with Facebook</StyledButton>
                            </StyledBox>
                            <Divider sx={{ margin: '2rem' }}>or with email</Divider>
                        </Box>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    error={errors.gender ? true : false}
                                    sx={{
                                        margin: '1px',
                                        padding: '6px 1rem',
                                        border: `${
                                            errors.gender
                                                ? !genderActive
                                                    ? '1px solid #D32F2F'
                                                    : '2px solid #D32F2F'
                                                : !genderActive
                                                ? '1px solid rgb(176, 176, 176)'
                                                : '2px solid #693BD4'
                                        }`,
                                        width: '100%',
                                        color: 'rgba(0, 0, 0, 0.87)',
                                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            border: `${errors.gender ? '' : !genderActive ? '1px solid black' : '2px solid #693BD4'}`
                                        }
                                    }}
                                    onFocus={() => setGenderActive(true)}
                                    onBlur={() => setGenderActive(false)}
                                    control={
                                        <Controller
                                            control={control}
                                            name="gender"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => (
                                                <FormControl>
                                                    <FormLabel
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -16,
                                                            left: -8,
                                                            backgroundColor: 'white',
                                                            padding: '0 5px',
                                                            fontSize: '0.8rem',
                                                            color: `${errors.gender ? '#D32F2F' : 'rgba(0, 0, 0, 0.6)'}`
                                                        }}>
                                                        Gender *
                                                    </FormLabel>
                                                    <RadioGroup row sx={{}}>
                                                        <FormControlLabel
                                                            sx={{ color: `${errors.gender ? '#D32F2F' : 'rgba(0, 0, 0, 0.6)'}` }}
                                                            value="female"
                                                            control={<Radio />}
                                                            label="Female"
                                                            onChange={(e) => {
                                                                onChange(e.target.checked);
                                                                setUserData({ ...userData, gender: 'Female' });
                                                            }}
                                                        />
                                                        <FormControlLabel
                                                            sx={{ color: `${errors.gender ? '#D32F2F' : 'rgba(0, 0, 0, 0.6)'}` }}
                                                            value="male"
                                                            control={<Radio />}
                                                            label="Male"
                                                            onChange={(e) => {
                                                                onChange(e.target.checked);
                                                                setUserData({ ...userData, gender: 'Male' });
                                                            }}
                                                        />
                                                        <FormControlLabel
                                                            sx={{ color: `${errors.gender ? '#D32F2F' : 'rgba(0, 0, 0, 0.6)'}` }}
                                                            value="other"
                                                            control={<Radio />}
                                                            label="Other"
                                                            onChange={(e) => {
                                                                onChange(e.target.checked);
                                                                setUserData({ ...userData, gender: 'Other' });
                                                            }}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            )}
                                        />
                                    }
                                />
                                <Typography sx={{ marginTop: '2px' }} variant="inherit" color="error">
                                    {errors.gender?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="date"
                                    label="Birthday *"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    {...register('birthday')}
                                    error={errors.birthday ? true : false}
                                    value={userData.birthday}
                                    onChange={(e) => {
                                        setUserData({ ...userData, birthday: e.target.value });
                                    }}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.birthday?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Username"
                                    fullWidth
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    {...register('email')}
                                    error={errors.email ? true : false}
                                    value={userData.email}
                                    onChange={(e) => {
                                        setUserData({ ...userData, email: e.target.value });
                                    }}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.email?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={togglePassword.showPassword ? 'text' : 'password'}
                                    fullWidth
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={togglePassword.showPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('confirmPassword')}
                                    error={errors.confirmPassword ? true : false}
                                />
                                <Typography variant="inherit" color="error">
                                    {errors.confirmPassword?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="acceptTerms"
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
                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="acceptTerms"
                                            defaultValue="false"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => (
                                                <Checkbox color="primary" onChange={(e) => onChange(e.target.checked)} />
                                            )}
                                        />
                                    }
                                    label={
                                        <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>I have read and agree to the Terms *</Typography>
                                    }
                                />

                                <Typography variant="inherit" color="error">
                                    {errors.acceptTerms ? '(' + errors.acceptTerms.message + ')' : ''}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <StyledSignUpButton variant="contained" onClick={handleSubmit(onSubmit)}>
                                    Sign Up
                                </StyledSignUpButton>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    Already have an account?
                                    <StyledLink to={'/sign-in'}>Sign in</StyledLink>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </StyledForm>
            </StyledCard>
        </>
    );
};

export default SignUp;
