"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Copy = {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

export function ContactForm({ copy }: { copy: Copy }) {
  const [loading, setLoading] = useState(false);
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(3),
    message: z.string().min(10),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success(copy.success);
      form.reset();
    } catch {
      toast.error(copy.error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input placeholder={copy.name} {...form.register("name")} />
      <Input placeholder={copy.email} {...form.register("email")} />
      <Input placeholder={copy.subject} {...form.register("subject")} />
      <Textarea placeholder={copy.message} {...form.register("message")} />
      <Button className="w-full" disabled={loading} type="submit">
        {loading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          copy.send
        )}
        <span className="ms-2">{loading ? copy.sending : copy.send}</span>
      </Button>
    </form>
  );
}
