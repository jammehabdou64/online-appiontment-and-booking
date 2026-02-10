import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import { useForm } from "@inertiajs/react";
import Header from "../../Components/Header";

const Login = () => {
  const { data, errors, setData, processing, post } = useForm({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/auth/login");
  };

  return (
    <>
      <Head title="Login" />
      <Header />
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                  name="email"
                />
                {errors?.email && (
                  <small className="text-sm text-red-500">
                    {errors?.email}
                  </small>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                  name="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Logging in..." : "Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
