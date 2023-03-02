import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";

const inputStyles = {
  width: "300px",
  height: "36px",
  borderRadius: "3px",
  border: "2px solid #000",
  outline: "none",
  padding: "0 10px",
  fontSize: "16px",
  marginBottom: "1.6rem",
};

const buttonStyles = {
  width: "300px",
  height: "36px",
  borderRadius: "3px",
  border: "2px solid #000",
  outline: "none",
  padding: "0 10px",
  fontSize: "16px",
  marginBottom: "1.6rem",
  cursor: "pointer",
  backgroundColor: "#043367",
  color: "#fff",
};

export type formType = {
  name: string;
  email: string;
  age: number;
};

const Form = () => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Valid email is required"),
    age: yup.number().required("Age is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
  } = useForm<formType>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (data: formType) => {
    console.log(data);
    reset();
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="name__div">
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            style={inputStyles}
            autoComplete="off"
          />
          <p
            style={{
              color: "red",
            }}
          >
            {errors.name?.message}
          </p>
        </div>
        <div className="email__div">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            style={inputStyles}
            autoComplete="off"
          />
          <p
            style={{
              color: "red",
            }}
          >
            {errors.email?.message}
          </p>
        </div>
        <div className="age__div">
          <Controller
            control={control}
            name="age"
            render={({ field: { ref, onChange } }) => (
              <TextField
                label="Age"
                variant="outlined"
                size="small"
                type="number"
                ref={ref}
                // onChange={onChange}
                sx={{
                  width: "300px",
                  height: "36px",
                  fontSize: "16px",
                  marginBottom: "1.6rem",
                }}
                autoComplete="off"
              />
            )}
          />
          <p
            style={{
              color: "red",
            }}
          >
            {errors.age?.message}
          </p>
        </div>
        <button style={buttonStyles} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Form;
