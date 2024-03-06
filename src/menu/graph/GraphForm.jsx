import { Button, ButtonLoading } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/lib/constants";
import { post } from "@/lib/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";

const regexInput =
  /^([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n)*([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n?)$/;
const regexNumber = /[+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?/g;

const graphSchema = z.object({
  name: z.string(),
  nodes: z.string().regex(regexInput, "Wrong format!"),
});

async function createGraph(newGraph) {
  newGraph.nodes = newGraph.nodes.match(regexNumber).map((s) => {
    const numbers = s.split(" ");
    return { x: parseFloat(numbers[0]), y: parseFloat(numbers[1]) };
  });
  await post("/graph/", newGraph);
}

export function GraphForm({ setOpen }) {
  const graphMutation = useMutation({
    mutationFn: createGraph,
    onSuccess: () => setOpen(false),
  });

  const graphForm = useForm({
    resolver: zodResolver(graphSchema),
    defaultValues: {
      name: "",
      nodes: "",
    },
  });

  return (
    <Form {...graphForm}>
      <form onSubmit={graphForm.handleSubmit(graphMutation.mutate)} className="space-y-2">
        <FormField
          control={graphForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Provide nodes coordinates.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <Button type="submit" isLoading={graphMutation.isLoading} loadingMess="Sending graph">
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
