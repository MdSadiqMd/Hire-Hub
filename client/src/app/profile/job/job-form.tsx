"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { Textarea } from "@/components/ui/text-area";
import { toast } from "@/components/ui/use-toast";

const jobFormSchema = z.object({
  jobtitle: z
    .string()
    .min(2, {
      message: "Job must be at least 2 characters.",
    })
    .max(30, {
      message: "job must not be longer than 30 characters.",
    }),
  companyName: z.string({
    required_error: "Please select an Company.",
  }),
  location: z.number({
    required_error: "Please enter the location of the job",
    defaultValues: "Remote",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  salary: z.number({
    required_error: "Please provide salary to display.",
  }),
  experience: z.number({
    required_error: "Please provide experience to display.",
  }),
  jobDescription: z
    .string({
      required_error:
        "the job Description should me atleast four words and maximum of 160 words",
    })
    .max(160)
    .min(4),
  educationQualification: z.string({
    required_error: "Please select an Company.",
  }),
  postedAt: z.date({
    required_error: "A date is required.",
  }),
  skillsRequired: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema>;
const defaultValues: Partial<JobFormValues> = {
  // name: "Your name",
  //postedAt: new Date.now(),
};

export function JobForm() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  function onSubmit(data: JobFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row space-x-9">
          <FormField
            control={form.control}
            name="jobtitle"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter job title" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter job location" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input placeholder="Enter salary" type="number" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter experience"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter job description" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="educationQualification"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Education Qualification</FormLabel>
              <FormControl>
                <Input placeholder="Enter education qualification" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postedAt"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Posted At</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter posting date"
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skillsRequired"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Skills Required</FormLabel>
              <FormControl>
                <Input placeholder="Enter skills required" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
