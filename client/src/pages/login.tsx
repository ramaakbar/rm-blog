import { useLogin, useUser } from "@/features/auth/hooks";
import { LoginType, loginSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/button";
import CustomHead from "@/components/customHead";
import { FieldWrapper, Input } from "@/components/forms";
import Navbar from "@/components/navbar";

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

  useUser({
    isProtected: true,
  });

  const onSubmit = (data: LoginType) => {
    login(data);
    reset({ email: "", password: "" });
  };

  return (
    <>
      <CustomHead title="RM Blog - Login" />
      <Navbar />
      <div className="mx-auto max-w-xl p-4">
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
      </div>
    </>
  );
}
