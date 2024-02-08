"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  ingredient: z.string().min(2, {
    message: "Ingredient must be at least 2 characters.",
  }),
});

export function IngredientsInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredient: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Prevent the default form submission behavior
    // (this should be handled by react-hook-form)
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter an ingredient" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
