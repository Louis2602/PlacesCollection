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
    Divider,
    IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Facebook, Google } from '@mui/icons-material';

const StyledCard = styled(Card)({
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
});

const StyledForm = styled('form')(({ theme }) => ({
    padding: '1rem 1rem',
    width: '80rem',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '1rem 1.5rem',
    margin: '0.5rem 0',
    width: '20rem',
    backgroundColor: '#693bd4',
    color: 'white',
    '&:hover': {
        backgroundColor: theme.palette.info.main
    },
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const StyledIconButton = styled(IconButton)({
    color: 'inherit'
});

const StyledBox = styled(Box)({
    textAlign: 'center',
    margin: '3rem auto'
});

const StyledSignUpBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '2rem',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '0 0.5rem'
    }
}));

const StyledOtherBox = styled(Box)(({ theme }) => ({
    padding: '1rem 4rem 1rem 0',
    [theme.breakpoints.down('md')]: {
        padding: 0
    }
}));

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

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    position: 'absolute',
    top: -16,
    left: -8,
    backgroundColor: 'inherit',
    padding: '0 5px',
    fontSize: '0.8rem'
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    width: '100%',
    paddingTop: '1.3rem',
    paddingLeft: '1.6rem',
    color: 'inherit'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
        backgroundColor: 'inherit'
    }
}));

const Genders = ['Female', 'Male', 'Other'];

const validationSchema = Yup.object().shape({
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

const SignUp = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

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
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${userData.username}.json`, {
            method: 'PUT',
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
                    <StyledSignUpBox>
                        <StyledOtherBox spacing={1}>
                            <StyledBox>
                                <StyledButton>
                                    Continue with
                                    <StyledIconButton aria-label="google">
                                        <Google />
                                    </StyledIconButton>
                                </StyledButton>
                                <StyledButton>
                                    Continue with
                                    <StyledIconButton aria-label="facebook">
                                        <Facebook />
                                    </StyledIconButton>
                                </StyledButton>
                            </StyledBox>
                            <Divider sx={{ margin: '2rem' }}>or with email</Divider>
                        </StyledOtherBox>

                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <StyledFormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="gender"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => (
                                                <FormControl>
                                                    <StyledFormLabel>Gender</StyledFormLabel>
                                                    <RadioGroup row>
                                                        {Genders.map((gender, i) => (
                                                            <FormControlLabel
                                                                key={i}
                                                                value={gender}
                                                                control={<Radio />}
                                                                label={gender}
                                                                onChange={(e) => {
                                                                    onChange(e.target.checked);
                                                                    setUserData({ ...userData, gender: { gender } });
                                                                }}
                                                            />
                                                        ))}
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
                                <StyledTextField
                                    required
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    variant="filled"
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
                                <StyledTextField
                                    required
                                    id="username"
                                    name="username"
                                    label="Username"
                                    variant="filled"
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
                                <StyledTextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="filled"
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
                                <StyledTextField
                                    required
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="filled"
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
                                <StyledTextField
                                    required
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    variant="filled"
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
                                <FormControlLabel
                                    control={
                                        <Controller
                                            control={control}
                                            name="acceptTerms"
                                            defaultValue="false"
                                            inputRef={register()}
                                            render={({ field: { onChange } }) => <Checkbox color="primary" onChange={(e) => onChange(e.target.checked)} />}
                                        />
                                    }
                                    label={<Typography color={errors.acceptTerms ? 'error' : 'inherit'}>I have read and agree to the Terms *</Typography>}
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
                    </StyledSignUpBox>
                </StyledForm>
            </StyledCard>
        </>
    );
};

export default SignUp;
