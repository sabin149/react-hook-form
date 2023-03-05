import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// type formType = {
//   age: string;
//   name: string;
// };
const schema = object().shape({
  age: string().required("Age is required"),
  name: string().required("Name is required"),
  email: string().required("Email is required"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

type formType = InferType<typeof schema>;

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<formType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      formRef.current?.getElementsByTagName("input")[0].focus();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<formType> = (values) => {
    console.log(values);
  };
  // console.log(errors);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <main>
      <Box
        sx={{
          maxWidth: "30rem",
          // media query
          "@media (width>= 300px)": {
            padding: "0 1rem",
          },
        }}
      >
        <Paper sx={{ p: "2rem 2.5rem" }} elevation={3}>
          <Typography variant="h4" component="h1" sx={{ mb: "2rem" }}>
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
            ref={formRef}
          >
            <TextField
              sx={{
                mb: 2,
                "&:hover": {
                  borderColor: "red",
                },
              }}
              label="Name"
              fullWidth
              size="small"
              required
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...register("name")}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Age"
              fullWidth
              size="small"
              required
              type="number"
              error={!!errors["age"]}
              helperText={errors["age"] ? errors["age"].message : ""}
              {...register("age")}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Email"
              fullWidth
              size="small"
              required
              type="email"
              error={!!errors["email"]}
              helperText={errors["email"] ? errors["email"].message : ""}
              {...register("email")}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Password"
              variant="outlined"
              fullWidth
              size="small"
              required
              type={showPassword ? "text" : "password"}
              error={!!errors["password"]}
              helperText={errors["password"] ? errors["password"].message : ""}
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              sx={{ mb: 2 }}
              label="Confirm Password"
              fullWidth
              size="small"
              required
              type={showPassword ? "text" : "password"}
              error={!!errors["confirmPassword"]}
              helperText={
                errors["confirmPassword"]
                  ? errors["confirmPassword"].message
                  : ""
              }
              {...register("confirmPassword")}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              //   loading={loading}
              sx={{ py: "1rem", mt: "1rem" }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </main>
  );
};

export default Form;
