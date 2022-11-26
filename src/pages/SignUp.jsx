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
    backgroundColor: '#693bd4',
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
        backgroundColor: '#693bd4'
    }
});

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
        backgroundColor: '#B6216B'
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
    backgroundColor: '#693bd4',
    '&:hover': {
        backgroundColor: '#B6216B'
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

const StyledTypo = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem'
}));

const Genders = ['Female', 'Male', 'Other'];

const validationSchema = Yup.object().shape({
    birthday: Yup.string().required('Birthday is required'),
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters')
        .matches(/^\w*$/, 'Username must not include special chars'),
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
                                <StyledTypo sx={{ marginTop: '2px' }} variant="inherit" color="error">
                                    {errors.gender?.message}
                                </StyledTypo>
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
                                <StyledTypo variant="inherit" color="error">
                                    {errors.birthday?.message}
                                </StyledTypo>
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
                                <StyledTypo variant="inherit" color="error">
                                    {errors.username?.message}
                                </StyledTypo>
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
                                <StyledTypo variant="inherit" color="error">
                                    {errors.email?.message}
                                </StyledTypo>
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
                                <StyledTypo variant="inherit" color="error">
                                    {errors.password?.message}
                                </StyledTypo>
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
                                <StyledTypo variant="inherit" color="error">
                                    {errors.confirmPassword?.message}
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
                                            render={() => (
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
                                                <Checkbox
                                                    checkedIcon={<BpCheckedIcon />}
                                                    icon={<BpIcon />}
                                                    color="primary"
                                                    onChange={(e) => onChange(e.target.checked)}
                                                />
                                            )}
                                        />
                                    }
                                    label={<Typography color={errors.acceptTerms ? 'error' : 'inherit'}>I have read and agree to the Terms *</Typography>}
                                />

                                <StyledTypo variant="inherit" color="error">
                                    {errors.acceptTerms ? '(' + errors.acceptTerms.message + ')' : ''}
                                </StyledTypo>
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
