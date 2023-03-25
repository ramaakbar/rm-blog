import { GetServerSideProps } from "next";
import { Router } from "next/router";
import { useLogin, useUser } from "@/features/auth/hooks";
import { LoginType, loginSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/button";
import CustomHead from "@/components/customHead";
import { FieldWrapper, Input } from "@/components/forms";
import Layout from "@/components/layout";

export const getServerSideProps = (async (context) => {
  const token = context.req.cookies.access_token;

  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}) satisfies GetServerSideProps;

export default function Login() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    reValidateMode: "onSubmit",
  });

  const { login, isLoading } = useLogin();

  const onSubmit = (data: LoginType) => {
    login(data);
    reset({ email: "", password: "" });
  };

  return (
    <>
      <CustomHead title="RM Blog - Login" />
      <Layout>
        <h1 className="font-bold text-2xl mb-5">Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper label="Email" error={errors.email}>
            <Input
              type="email"
              id="email"
              autoFocus
              required
              placeholder="email"
              register={register("email")}
            />
          </FieldWrapper>
          <FieldWrapper label="Password" error={errors.password}>
            <Input
              type="password"
              id="password"
              required
              placeholder="*****"
              register={register("password")}
            />
          </FieldWrapper>
          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </Layout>
    </>
  );
}
