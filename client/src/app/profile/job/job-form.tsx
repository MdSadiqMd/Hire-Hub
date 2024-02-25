"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

const workType = [
  { value: "Remote", label: "Remote" },
  { value: "On-Site", label: "On-Site" },
  { value: "Freelance", label: "Freelance" },
  { value: "Internship", label: "Internship" },
  { value: "Contract basis", label: "Contract basis" },
] as const;

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
  location: z.string({
    required_error: "Please enter the location of the job",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  workType: z.string({
    required_error: "Please provide work type to display.",
  }),
  salary: z.string({
    required_error: "Please provide salary to display.",
  }),
  experience: z.string({
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
    required_error: "A date of birth is required.",
  }),
  skillsRequired: z
    .array(
      z.object({
        value: z.string().min(2, { message: "Please enter minimum 2 Skills." }),
      })
    )
    .optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema> & {
  skillsRequired: { value: string }[];
};
const defaultValues: Partial<JobFormValues> = {
  postedAt: new Date(),
  skillsRequired: [{ value: "Leadership" }, { value: "Java Programming" }],
};

export function JobForm() {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    name: "skillsRequired",
    control: form.control,
  });

  function onSubmit(data: JobFormValues) {
    console.log(data);
    /*toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });*/
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit(data);
        })}
        className="space-y-8"
      >
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
          name="workType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>work Type</FormLabel>
              <FormDescription>
                This is the work Type that will be used in the dashboard.
              </FormDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? workType.find(
                            (workType) => workType.value === field.value
                          )?.label
                        : "Select Work Type"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search work type..." />
                    <CommandEmpty>No Results found</CommandEmpty>
                    <CommandGroup>
                      {workType.map((workType) => (
                        <CommandItem
                          value={workType.label}
                          key={workType.value}
                          onSelect={() => {
                            form.setValue("workType", workType.value);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              workType.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {workType.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-9">
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
        </div>
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
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Job Goes Live on</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`skillsRequired.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Skills
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Skill
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
