"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditUserProfileFormSchema } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {};

function ProfileForm({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditUserProfileFormSchema>>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof EditUserProfileFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={() => onSubmit}>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Name" />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          disabled={isLoading || true}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button
          type="submit"
          className="self-start  hover:bg-backgroundBlue hover:text-white "
        >
          {isLoading ? (
            <>
              {" "}
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Saving Settings
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
