"use client";

import React from "react";
import { useForm } from  "react-hook-form";
import {Form, Input, Button, addToast} from "@heroui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ToastProvider } from "@heroui/toast";
import { redirect } from "next/dist/server/api-utils";

const SignUpFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export default function SignUpForm() {
  
    const form = useForm<z.infer<typeof SignUpFormSchema>>({
        resolver: zodResolver(SignUpFormSchema),
        defaultvalues: {
            email: "",
            name: "",
            password: "",
        }
    })

    const router = useRouter();

    async function onSubmit(e) {

        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        // Do something with the form values.
        // This will be type-safe and validated.
        console.log(data);

        await signUp.email({
            email: data.email as string,
            name: data.name as string,
            password: data.password as string
        }, {
            onSuccess: () => {
                router.push("/auth");
            },
            onError: (error) => {
                addToast({
                    title: "Erreur d'identification",
                    description: error.error.message,
                });
            }
        })
    };

  return (
    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
        <Input
            isRequired
            errorMessage="Please enter a valid name"
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your name"
        />
      <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
      />
      <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
      />
      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}

