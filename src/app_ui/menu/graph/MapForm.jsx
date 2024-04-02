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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useMutation } from "react-query";
import * as z from "zod";

const graphSchema = z.object({
  name: z.string().min(1, "Name can't be empty!"),
  nodes: z.any().array().nonempty("Graph can't have no points!"),
});

export function MapForm({ setOpen, createGraph }) {
  const graphMutation = useMutation({
    mutationFn: createGraph,
    onSuccess: () => setOpen(false),
  });

  const graphForm = useForm({
    resolver: zodResolver(graphSchema),
    defaultValues: {
      name: "",
      nodes: [],
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
              <FormLabel>Map</FormLabel>
              <FormControl>
                <MapArea nodes={field.value} setNodes={field.onChange} />
              </FormControl>
              <FormDescription>Provide nodes coordinates.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <Button
            className="mr-auto"
            type="button"
            variant="destructive"
            onClick={() => graphForm.resetField("nodes")}
          >
            Clear
          </Button>
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

function MapArea(props) {
  return (
    <MapContainer
      className="h-[40vh]"
      center={[52.21187670838484, 20.982926472010455]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapAreaContent {...props} />
    </MapContainer>
  );
}

function MapAreaContent({ nodes, setNodes }) {
  function deleteMarker(i) {
    setNodes(nodes.filter((node, index) => index !== i));
  }
  const map = useMapEvents({
    click(e) {
      setNodes([...nodes, e.latlng]);
    },
  });
  return (
    <>
      {nodes.map((loc, index) => (
        <Marker
          eventHandlers={{ click: () => deleteMarker(index) }}
          key={index}
          position={loc}
        ></Marker>
      ))}
    </>
  );
}
