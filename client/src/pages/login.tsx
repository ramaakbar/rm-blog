import { GetServerSideProps } from "next";
import Link from "next/link";
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

          <Link href="http://localhost:4000/auth/google" className="block">
            <Button className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Login with Google
            </Button>
          </Link>

          <Button type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </Layout>
    </>
  );
}
