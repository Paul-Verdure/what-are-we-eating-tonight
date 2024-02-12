/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { foodPreferences, mealChoices } from "./checkboxLists";

const FormSchema = z.object({
  ingredient: z.string().min(2, {
    message: "Ingredient must be at least 2 characters.",
  }),
  foodPreferences: z.array(z.string()),
  mealChoices: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

type FinderInputsProps = {
  setSelectedIngredients: Dispatch<React.SetStateAction<string[]>>;
};

export function FinderInputs({ setSelectedIngredients }: FinderInputsProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredient: "",
      foodPreferences: [],
      mealChoices: [],
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data.ingredient);
    setSelectedIngredients((prev: string[]) => [...prev, data.ingredient]);

    form.reset();
  };

  return (
    <Form {...form}>
      <div className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="ingredient"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter an ingredient" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foodPreferences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormDescription>Select your food preferences</FormDescription>
              </div>
              {foodPreferences.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="foodPreferences"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foodPreferences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormDescription>Select a meal</FormDescription>
              </div>
              {mealChoices.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="mealChoices"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
