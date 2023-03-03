import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

// type formType = {
//   age: string;
//   name: string;
// };

const schema = object().shape({
  age: string().required("Age is required"),
  email: string().required("Email is required"),
  name: string().required("Name is required"),
  password: string().required("Password is required"),
  confirm_Password: string().required("Confirm Password is required"),
  // .test("passwords-match", "Passwords must match", function (value) {
  //   return this.parent.password === value;
  // }),
});

type formType = InferType<typeof schema>;

const Form = () => {
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
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<formType> = (values) => {
    console.log(values);
  };
  // console.log(errors);

  return (
    <main>
      <Box
        sx={{
          maxWidth: "30rem",
        }}
      >
        <Paper sx={{ p: "4.5rem 2.5rem" }} elevation={3}>
          <Typography variant="h4" component="h1" sx={{ mb: "2rem" }}>
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <TextField
              sx={{ mb: 2 }}
              label="Name"
              fullWidth
              size="small"
              required
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              {...register("name")}
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
              fullWidth
              size="small"
              required
              error={!!errors["password"]}
              helperText={errors["password"] ? errors["password"].message : ""}
              {...register("password")}
            />
            <TextField
              sx={{ mb: 2 }}
              label="Confirm Password"
              fullWidth
              size="small"
              required
              type="text"
              error={!!errors["confirm_Password"]}
              helperText={
                errors["confirm_Password"]
                  ? errors["confirm_Password"].message
                  : ""
              }
              {...register("confirm_Password")}
            />
            <Button variant="contained" fullWidth size="large" type="submit">
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </main>
  );
};

export default Form;
