"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Spinner } from "../../../../components/ui/spinner";
import { user } from "@/lib/types/user";
import { useSession } from "../../useSession";

// Form validation
const FormSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(15, "First name must be at most 15 characters.")
      .regex(new RegExp("^[A-Za-z]*$"), "First name can only contain letters."),
    last_name: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters.")
      .max(15, "Last name must be at most 15 characters.")
      .regex(new RegExp("^[A-Za-z]*$"), "Last name can only contain letters."),
    username: z
      .string()
      .trim()
      .min(6, "Username must be at least 6 characters.")
      .max(20, "Username must be at most 20 characters.")
      .regex(
        new RegExp("^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
        "Usernames can only contain letters, numbers, underscores(_), and periods(.), and cannot begin or end with a period or underscore."
      ),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(5, {
        message: "Password must be at least 6 characters.",
      })
      .regex(new RegExp("^(?=.*[A-Za-z])(?=.*\\d).+"), {
        message:
          "Password must have at least one letter and at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match.",
      });
    }
  });

export function SignUpForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [error, setErrors] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const first_name = values.first_name;
    const last_name = values.last_name;
    const username = values.username;
    const email = values.email;
    const password = values.password;

    // check username not taken
    let usernameResponse = await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/users/checkUsername",
        {
          username,
        },
        { withCredentials: true }
      )
      .then((result: AxiosResponse) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    if (usernameResponse !== true) {
      // Username taken
      form.setError("username", {
        message: "This username is associated with an existing account.",
      });
      setLoading(false);
      return;
    }

    // check email not taken
    let emailResponse = await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/users/checkEmail",
        {
          email,
        },
        { withCredentials: true }
      )
      .then((result: AxiosResponse) => {
        console.log(result.data);
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    if (emailResponse !== true) {
      // Username taken
      form.setError("email", {
        message: "This email is associated with an existing account.",
      });
      setLoading(false);
      return;
    }

    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/signup",
        { first_name, last_name, username, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        useSession.setState({ user: user });

        if (user.provider === "local") {
          window.location.replace("/verify-email");
        } else {
          window.location.replace("/account");
        }
      })
      .catch((error) => {
        setErrors(error.response.data.message);
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="bg-rose-100 border border-solid border-red-700 p-2 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <Button className="w-full bg-blue-800 hover:bg-blue-900" type="submit">
          {loading ? <Spinner size={25} /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
