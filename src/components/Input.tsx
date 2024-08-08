"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import {Spinner} from "@nextui-org/react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).default(''),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }).default(''),
  highlights: z.string().optional().default(''),
  memories: z.string().optional().default(''),
})

interface UserData {
  name: string;
  position: string;
  highlights: string;
  memories: string;
}

interface InputFormProps {
  onGenerate: (formData: UserData) => void;
  loading: boolean;
}

const InputsForm: React.FC<InputFormProps> = ({ onGenerate, loading }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      position: "",
      highlights: "",
      memories: "",
    },
  })

  // const onSubmit: SubmitHandler<FormData> = (data) => {
  //   onGenerate(data);
  // };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    onGenerate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="highlights"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Achievements at the Company</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memories"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Your Memories at the Company</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <div className="flex items-center justify-center">
        {
          loading ? (
            <span className="flex items-center justify-center">
              <Spinner/>&nbsp;&nbsp;Generating message...
            </span>
          ) : <Button type="submit" className="w-1/3">
            Generate message
          </Button>
        }
        </div>
      </form>
    </Form>
  );
}

export default InputsForm;
