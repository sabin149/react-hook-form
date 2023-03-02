import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TestComp from "TestComp";

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

export type formType = {
  name: string;
  email: string;
};

const Form = () => {
  const [user, setUser] = useState<formType>({
    name: "",
    email: "",
  });
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Valid email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues, // added this to set default values after the user data is fetched
  } = useForm<formType>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      setValue("name", data.name);
      setValue("email", data.email);
    };
    // fetchUser();
  }, []);

  //   useEffect(() => {
  //     setValue("name", user.name);
  //     setValue("email", user.email);
  //   }, [user, setValue]);

  const handleOnSubmit = async (data: formType) => {
    // console.log({ data });
    // console.log(getValues());
    // resetField("name");
    //    clear form field

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

        <button
          style={{
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
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
      <TestComp formData={getValues()} />
    </main>
  );
};

export default Form;
