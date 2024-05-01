import { createTheme, ThemeProvider, CssBaseline, Box, Avatar, Typography, TextField, Grid, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../../api/AxiosApi";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const defaultTheme = createTheme();

export default function RegisterScreen() {
  const navigate = useNavigate();
  const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
    mode: 'onTouched'
  })

  function handleApiErrors(apiErrors: string[]) {
    if (apiErrors) {
      apiErrors.forEach((error: string) => {
        if (error.includes('Password')) {
          setError('password', {message: error})
        }
        else if (error.includes('Username')) {
          setError('username', {message: error})
        }
        else if (error.includes('Email')) {
          setError('email', {message: error})
        }
      })
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm"> {/* Adjusted maxWidth */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit(
            data => axiosApi.Account.register(data)
            .then (() => {
              toast.success('Account created successfully')
              navigate('/login')
            })
            .catch(error => handleApiErrors(error))
          )}  
          noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register('username', {required: 'Username is required'})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Not a valid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!?])[A-Za-z\d!?]{8,}$/,
                  message: 'Minimum eight characters, at least one letter and one number'
                }
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
