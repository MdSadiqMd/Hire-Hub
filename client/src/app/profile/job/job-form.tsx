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
    required_error: "Please give  to display.",
  }),
  jobDescription: z.string({
    required_error:"the job Description should me atleast four words and maximum of 160 words"
  }).max(160).min(4),
  educationQualification:z.string({
    required_error: "Please select an Company.",
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

export function JobForm() {
  return (
    <div>
      <h1>Post a Job</h1>
    </div>
  );
}
