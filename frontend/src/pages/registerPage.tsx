import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../constants/validateForm";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { useState } from "react";
import { registerUrl } from "../constants/api";
import { useAuth } from "../context/Auth/authContext";
import {useNavigate} from "react-router-dom"


export const RegisterPage = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

const validateForm = () => {
  const newErrors = {
    firstName: validateName(formData.firstName),
    lastName: validateName(formData.lastName),
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
   
  };



  setErrors(newErrors);

  return !Object.values(newErrors).some(Boolean);
};


 const [formData,setFormData]=useState({
     firstName: "",
     lastName: "",
     email: "",
     password: "",
  
 })   
   const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.password){
      return
    }
   try {

const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
});

if (!response.ok) {
    throw new Error("Failed to register");
}

const data = await response.json();

console.log("REGISTER RESPONSE:", data);

if (!data.data) {
    throw new Error("Token not found");
}

// login(userName, token)
login(formData.email, data.data);

console.log("Email:", formData.email);
console.log("Token:", data.data);

navigate("/login");

setFormData({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
});




       
   }catch(error){
       console.log(error)
   }

    console.log(formData);

  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fb",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
            borderRadius: 4,
          }}
        >
          {/* Logo */}

          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 800,
              color: "#111827",
              mb: 1,
            }}
          >
            CRIZMA
          </Typography>

          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Create your account and start shopping
          </Typography>

          {/* Form */}

         
          

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* First Name + Last Name */}

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: {
                    xs: "column",
                  sm: "row",
                },
            }}
            >
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />

              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                 onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Box>

            {/* Email */}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
               onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            {/* Password */}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              value={formData.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                  ),
                },
              }}
            />

            {/* Confirm Password */}

            {/* <TextField
              fullWidth
              label="Confirm Password"
               onChange={handleChange}
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              slotProps={{
                input: {
                  endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                  ),
                },
              }}
            /> */}

            {/* Register Button */}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 2,
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Create Account
            </Button>
          </Box>
          {/* Login */}

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Login
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};