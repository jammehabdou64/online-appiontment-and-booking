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
import Header from "@/Components/Header";

const Register = () => {
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };
  const { data, setData, processing, errors, post } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/auth/register");
  };

  return (
    <>
      <Head title="Register" />
      <Header />
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={data.name}
                  name="name"
                  onChange={onChangeHandler}
                  required
                />
                {errors?.name && (
                  <small className="text-sm text-red-500">{errors?.name}</small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={onChangeHandler}
                  name="email"
                  required
                />
                {errors?.email && (
                  <small className="text-sm text-red-500">
                    {errors?.email}
                  </small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                />
                {errors?.password && (
                  <small className="text-sm text-red-500">
                    {errors?.password}
                  </small>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={onChangeHandler}
                  required
                />

                {errors?.confirmPassword && (
                  <small className="text-sm text-red-500">
                    {errors?.confirmPassword}
                  </small>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Creating account..." : "Register"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Register;
