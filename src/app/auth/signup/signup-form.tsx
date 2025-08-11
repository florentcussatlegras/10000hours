"use client";

import React from "react";
import { useForm } from  "react-hook-form";
import {Form, Input, Button, addToast, Checkbox} from "@heroui/react";
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

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        // const data = Object.fromEntries(new FormData(e.currentTarget));

        // Do something with the form values.
        // This will be type-safe and validated.
        // console.log(data);

        const { data, error } = await signUp.email({
            email: "test@example.com",
            password: "password1234",
            name: "test",
            image: "https://example.com/image.png",
        });

        // await signUp.email({
        //     email: data.email as string,
        //     name: data.name as string,
        //     password: data.password as string
        // }, {
        //     onSuccess: () => {
        //         router.push("/auth");
        //     },
        //     onError: (error) => {
        //         console.log(error);
        //         addToast({
        //             title: "Erreur d'identification",
        //             description: error.error.message,
        //         });
        //     }
        // })
    };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
    //   validationErrors={errors}
    //   onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          errorMessage="Please enter your name"
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your name"
        />

        <Input
          isRequired
          errorMessage="Please enter your email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage="Please enter your password"
        //   isInvalid="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
        //   value={password}
        //   onValueChange={setPassword}
        />

        {/* <Select
          isRequired
          label="Country"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
        >
          <SelectItem key="ar">Argentina</SelectItem>
          <SelectItem key="us">United States</SelectItem>
          <SelectItem key="ca">Canada</SelectItem>
          <SelectItem key="uk">United Kingdom</SelectItem>
          <SelectItem key="au">Australia</SelectItem>
        </Select> */}

        {/* <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() => setErrors((prev) => ({...prev, terms: undefined}))}
        >
          I agree to the terms and conditions
        </Checkbox> */}

        {/* {errors.terms && <span className="text-danger text-small">{errors.terms}</span>} */}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>
    </Form>
  );
}

