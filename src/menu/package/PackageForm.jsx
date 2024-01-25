import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMutation } from "react-query";
import { API_URL } from "@/constants";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { GraphsTable } from "./graphs-table/GraphsTable";

const packageSchema = z.object({
  name: z.string(),
  graphs: z.any(),
});

function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating package
    </Button>
  );
}

async function createPackage(newPackage) {
  let result = await fetch(`${API_URL}/package/new?name=${newPackage.name}`, {
    method: "POST",
  });
  let packageId = await result.text();
  let graphs = Object.keys(newPackage.graphs);

  if (!graphs.length) {
    return;
  }
  
  result = await fetch(`${API_URL}/package/add?packageId=${packageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphs),
  });
}

export function PackageForm({ setOpen }) {
  const packageMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: () => setOpen(false),
  });

  const packageForm = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      graphs: [],
    },
  });

  return (
    <Form {...packageForm}>
      <form
        onSubmit={packageForm.handleSubmit(packageMutation.mutate)}
        className="space-y-2"
      >
        <FormField
          control={packageForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Provide package name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={packageForm.control}
          name="graphs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graphs</FormLabel>
              <FormControl>
                <GraphsTable value={field.value} onChange={field.onChange}/>
              </FormControl>
              <FormDescription>Select graphs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          {packageMutation.isIdle && <Button type="submit">Add</Button>}
          {packageMutation.isLoading && <ButtonLoading />}
        </DialogFooter>
      </form>
    </Form>
  );
}
