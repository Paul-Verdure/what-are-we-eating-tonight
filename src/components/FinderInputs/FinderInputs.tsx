/* eslint-disable @typescript-eslint/no-misused-promises */
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  ingredient: z.string().min(2, {
    message: "Ingredient must be at least 2 characters.",
  }),
});

type FinderInputsProps = {
  setSelectedIngredients: Dispatch<React.SetStateAction<string[]>>;
  isListFull: boolean;
};

export function FinderInputs({ setSelectedIngredients, isListFull }: FinderInputsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredient: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setSelectedIngredients((prev: string[]) => [...prev, data.ingredient]);
    form.reset();
  };

  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (isListFull) return;
    if (e.key === "Enter") {
      await form.handleSubmit(onSubmit)();
    }
  }

  return (
    <Form {...form}>
      <div className="w-2/3 flex flex-wrap gap-2">
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter an ingredient"
                  {...field}
                  onKeyDown={(e) => handleKeyPress(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          className="flex items-center"
          disabled={isListFull}
        >
          <PlusIcon />
        </Button>
      </div>
    </Form>
  );
}
