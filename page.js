
"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ArrowRight, Calendar as CalendarIcon, BusFront } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React from "react";

const searchSchema = z.object({
  from: z.string().min(2, { message: "Please enter a valid departure city." }),
  to: z.string().min(2, { message: "Please enter a valid destination city." }),
  date: z.date({ required_error: "Please select a date of journey." }),
});

export default function Home() {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: "Mumbai",
      to: "Pune",
    },
  });

  React.useEffect(() => {
    form.setValue("date", new Date());
  }, [form]);

  const isFormValid = form.formState.isValid;
  const { from, to, date } = form.watch();

  const searchParams = new URLSearchParams();
  if (from) searchParams.set("from", from);
  if (to) searchParams.set("to", to);
  if (date) searchParams.set("date", format(date, "yyyy-MM-dd"));

  const searchHref = `/search?${searchParams.toString()}`;

  function onSubmit(values: z.infer<typeof searchSchema>) {
    console.log(values);
  }

  return (
    <div className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1920/1080')", dataAiHint: "indian highway"}}>
      <Card className="w-full max-w-2xl shadow-2xl bg-background/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
            <BusFront className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome to Bus Yatra</CardTitle>
          <CardDescription>Book your bus tickets with ease and comfort.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Pune" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Journey</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" asChild={isFormValid} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6" disabled={!isFormValid}>
                <Link href={searchHref}>
                  Search Buses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
