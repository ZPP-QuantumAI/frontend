import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const algorithmSchema = z.object({
  name: z.string().min(1, "Name can't be empty!"),
  algorithm: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "No algorithm provided!")
    .refine(
      (files) => files?.[0]?.type === "application/zip",
      "Not a zip archive!",
    ),
});

export function AlgorithmForm({ setSelectedAlgorithm, setOpen }) {
  const algorithmForm = useForm({
    resolver: zodResolver(algorithmSchema),
    defaultValues: { name: "" },
  });

  const fileRef = algorithmForm.register("algorithm");

  return (
    <Form {...algorithmForm}>
      <form
        onSubmit={algorithmForm.handleSubmit((algorithm) => {
          setSelectedAlgorithm(algorithm);
          setOpen(false);
        })}
      >
        <FormField
          control={algorithmForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Provide algorithm name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={algorithmForm.control}
          name="algorithm"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input type="file" accept="application/zip" {...fileRef} />
              </FormControl>
              <FormDescription>
                Provide algorithm in zip archive.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Select</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
