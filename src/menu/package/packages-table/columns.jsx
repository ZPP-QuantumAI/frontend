import { Checkbox } from "@/components/ui/checkbox";

export const columns = [
    {
        id: "select",
        header: "Select",
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)} 
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "graphIds.length",
        header: "Number of graphs",
    },
]