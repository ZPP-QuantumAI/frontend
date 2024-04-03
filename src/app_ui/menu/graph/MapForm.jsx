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
import { latLngBounds } from "leaflet";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useMutation } from "react-query";
import * as z from "zod";

const graphSchema = z.object({
  name: z.string().min(1, "Name can't be empty!"),
  nodes: z.any().array().nonempty("Graph can't have no points!"),
});

export function MapForm({ setOpen, createGraph }) {
  const childRef = useRef();

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
                <MapArea
                  nodes={field.value}
                  setNodes={field.onChange}
                  ref={childRef}
                />
              </FormControl>
              <FormDescription>
                Click on map to add nodes. Click again to delete.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <span className="mr-auto space-x-2">
            <Button
              className="w-32"
              type="button"
              variant="destructive"
              onClick={() => graphForm.resetField("nodes")}
            >
              Clear {graphForm.watch("nodes").length} nodes
            </Button>
            <Button onClick={() => childRef.current.fitMap()} type="button">
              Fit nodes
            </Button>
          </span>

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

const MapArea = forwardRef(function MapArea(props, ref) {
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
      <MapAreaContent {...props} ref={ref} />
    </MapContainer>
  );
});

const MapAreaContent = forwardRef(function MapAreaContent(
  { nodes, setNodes },
  ref,
) {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    fitMap() {
      nodes.length > 0 &&
        map.fitBounds(latLngBounds(nodes), { padding: [10, 10] });
    },
  }));

  function deleteMarker(i) {
    setNodes(nodes.filter((node, index) => index !== i));
  }

  useMapEvents({
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
});
