"use client";
import React, { use, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditUserProfileFormSchema } from "@/lib/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = { profile: any; onUpdate: any };

function ProfileForm({ profile, onUpdate }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof EditUserProfileFormSchema>>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
    },
  });

  // 2. Define a submit handler.
  const handleSubmit = async (
    values: z.infer<typeof EditUserProfileFormSchema>
  ) => {
    setIsLoading(true);
    await onUpdate(values.name);
    setIsLoading(false);
  };

  useEffect(() => {
    form.reset({ name: profile?.name, email: profile?.email });
  }, [profile]);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Name"
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={true}
                  type="email"
                  placeholder="Email"
                  value={profile?.email}
                />
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
