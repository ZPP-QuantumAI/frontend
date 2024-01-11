import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const regexInput =
/^([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n)*([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n?)$/;
const regexNumber = /[+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?/g;

const graphSchema = z.object({
  name: z.string(),
  nodes: z.string().regex(regexInput, "Wrong format!"),
});

function ButtonLoading() {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Sending graph
      </Button>
    )
  }

export function GraphForm({setOpen}) {
  const [sending, setSending] = useState(false);
  const graphForm =
    useForm(
      {
        resolver: zodResolver(graphSchema),
        defaultValues: {
          name: "",
          nodes: "",
        },
      });

  function onSubmit(graph) {
    setSending(true);
    graph.nodes = graph.nodes.match(regexNumber).map((s) => {
      const numbers = s.split(" ");
      return { x: parseFloat(numbers[0]), y: parseFloat(numbers[1]) };
    });

    fetch(`${API_URL}/graph/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graph),
    }).then(() => setOpen(false));
  }

  return (
    <Form {...graphForm}>
      <form onSubmit={graphForm.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={graphForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl><Input {...field}/></FormControl>
              <FormDescription>Provide graph name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={graphForm.control}
          name="nodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nodes</FormLabel>
              <FormControl><Textarea {...field}/></FormControl>
              <FormDescription>Provide nodes coordinates.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
            {!sending && <Button type="submit">Add</Button>}
            {sending && <ButtonLoading></ButtonLoading>}
        </DialogFooter>
      </form>
    </Form>
  );
}
