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
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraphsTable } from "./graphs-table/GraphsTable";
import { post } from "@/lib/requests";

const packageSchema = z.object({
  name: z.string(),
  graphIds: z.any(),
});

async function createPackage(newPackage) {
  newPackage.graphIds = Object.keys(newPackage.graphIds);
  await post("/package/create", newPackage);
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
      graphIds: [],
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
          name="graphIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graphs</FormLabel>
              <FormControl>
                <GraphsTable value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>Select graphs.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <Button
            type="submit"
            isLoading={packageMutation.isLoading}
            loadingMess="Creating package"
          >
            Add
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
