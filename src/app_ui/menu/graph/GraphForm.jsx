import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";

const regexInput =
  /^([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n)*([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n?)$/;

const graphSchema = z.object({
  name: z.string().min(1, "Name can't be empty!"),
  nodes: z.string().regex(regexInput, "Wrong format!"),
});

export function GraphForm({ setOpen, createGraph }) {
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
      <form
        onSubmit={graphForm.handleSubmit(graphMutation.mutate)}
        className="space-y-2"
      >
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
                <Textarea className="h-[40vh]" {...field} />
              </FormControl>
              <FormDescription>Provide nodes coordinates.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <Button
            type="submit"
            isLoading={graphMutation.isLoading}
            loadingMess="Sending graph"
          >
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
