import { GetServerSideProps } from "next";
import { useRegister, useUser } from "@/features/auth/hooks";
import { RegisterType, registerSchema } from "@/features/auth/schemas";
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

export default function Register() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    reValidateMode: "onSubmit",
  });

  const { register: signup, isLoading } = useRegister();

  const onSubmit = (data: RegisterType) => {
    signup(data);
    reset({ email: "", username: "", password: "", passwordConfirmation: "" });
  };

  return (
    <>
      <CustomHead title="RM Blog - Register" />
      <Layout>
        <h1 className="font-bold text-2xl mb-5">Register</h1>
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
          <FieldWrapper label="Username" error={errors.username}>
            <Input
              type="text"
              id="username"
              required
              placeholder="username"
              register={register("username")}
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
          <FieldWrapper
            label="Password Confirmation"
            error={errors.passwordConfirmation}
          >
            <Input
              type="password"
              id="passwordConfirmation"
              required
              placeholder="*****"
              register={register("passwordConfirmation")}
            />
          </FieldWrapper>
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </form>
      </Layout>
    </>
  );
}
