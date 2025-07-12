import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from './components/ForgotPassword';
import AppTheme from '@/components/shared-theme/AppTheme';
import ColorModeSelect from '@/components/shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import Autocomplete from '@mui/material/Autocomplete';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
        maxWidth: '600px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...(theme.applyStyles?.('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }) || {}),
}));


const SignInContainer = styled(Stack)(({ theme }) => ({
    position: 'relative',
    height: '100vh',
    overflowY: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const skillsList = [
    'Frontend',
    'Backend',
    'React',
    'Node.js',
    'UI/UX',
    'DevOps',
    'Machine Learning',
    'Data Science',
    'Cloud',
    'Security',
    'Marketing',
    'Design',
    'Python',
    'JavaScript',
    'C++',
    'Rust',
    ];

    const [skillsWant, setSkillsWant] = React.useState([]);
    const [skillsOffer, setSkillsOffer] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRegister = async (formData) => {
        try {
            const res = await fetch("/api/register", {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                alert("Registered successfully!");
            } else {
                const errorData = await res.json();
                alert("Registration failed: " + errorData.message || "Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during registration." + err);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInputs()) return;

        const formData = new FormData(event.currentTarget);

        const finalForm = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            location: formData.get('location') || '',
            skillsWant,
            skillsOffer,
        };

        const photo = formData.get('photo');
        if (photo && photo.name) {
            finalForm.append('photo', photo);
        }

        handleRegister(finalForm);
    };


    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (skillsWant.length === 0) {
            alert("Please select at least one skill you want.");
            isValid = false;
        }

        if (skillsOffer.length === 0) {
            alert("Please select at least one skill you offer.");
            isValid = false;
        }

        return isValid;
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect
                sx={{ position: 'fixed', top: '1rem', right: '1rem', display: 'none' }}
                disabled
                value="light"
                />
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <TextField
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Aditya"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color='primary'
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="skillsWant">Skills you want</FormLabel>
                            <Autocomplete
                                multiple
                                id="skillsWant"
                                options={skillsList}
                                value={skillsWant}
                                onChange={(event, newValue) => setSkillsWant(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    placeholder={skillsWant.length === 0 ? 'e.g. React, UI/UX' : ''}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        '& .MuiAutocomplete-inputRoot': {
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-start',
                                        minHeight: '80px',
                                        maxHeight: '160px',
                                        overflowY: 'auto',
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        },
                                        '& .MuiChip-root': {
                                        maxWidth: '100%',
                                        margin: '2px',
                                        marginTop: '4px',
                                        },
                                        '& .MuiAutocomplete-endAdornment': {
                                        top: 'auto',
                                        alignSelf: 'flex-start',
                                        marginTop: '8px',
                                        },
                                    }}
                                    />
                                )}
                                />

                            </FormControl>

                            <FormControl>
                            <FormLabel htmlFor="skillsOffer">Skills you offer</FormLabel>
                            <Autocomplete
                                multiple
                                id="skillsOffer"
                                options={skillsList}
                                value={skillsOffer}
                                onChange={(event, newValue) => setSkillsOffer(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    placeholder={skillsOffer.length === 0 ? 'e.g. Backend, JavaScript' : ''}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        '& .MuiAutocomplete-inputRoot': {
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-start',
                                        minHeight: '80px',
                                        maxHeight: '160px',
                                        overflowY: 'auto',
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        },
                                        '& .MuiChip-root': {
                                        maxWidth: '100%',
                                        margin: '2px',
                                        marginTop: '4px',
                                        },
                                        '& .MuiAutocomplete-endAdornment': {
                                        top: 'auto',
                                        alignSelf: 'flex-start',
                                        marginTop: '8px',
                                        },
                                    }}
                                    />
                                )}
                                />

                            </FormControl>

                            <FormControl>
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <TextField
                                id="location"
                                name="location"
                                placeholder="City, State"
                                fullWidth
                                variant="outlined"
                            />
                            </FormControl>

                            <FormControl>
                            <FormLabel htmlFor="photo">Upload a photo</FormLabel>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                style={{ marginTop: '8px' }}
                            />
                            </FormControl>

                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px', marginBottom: '16px' }}>
                        <strong>Tip:</strong> Users who upload a photo and enter a location are more 42% likely to be discovered!
                        </Typography>


                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <ForgotPassword open={open} handleClose={handleClose} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign Up
                        </Button>
                        <Link
                            component="button"
                            type="button"
                            onClick={handleClickOpen}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Google')}
                            startIcon={<GoogleIcon />}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Facebook')}
                            startIcon={<FacebookIcon />}
                        >
                            Sign in with Facebook
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                href="/login/"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}