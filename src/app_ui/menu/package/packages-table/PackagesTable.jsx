import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { columns } from "./columns";
import { useQuery, useQueryClient } from "react-query";
import { deleteReq, get } from "@/lib/requests";
import { SelectableDataTable } from "@/reusable/table/SelectableDataTable";

export function PackagesTable({
  rowSelection,
  setRowSelection,
  selectedPackages,
}) {
  const packages = useQuery("packages", async () => {
    return await get("/package/all");
  });
  const queryClient = useQueryClient();

  async function deletePackage(row) {
    row.toggleSelected(false);
    await deleteReq(`/package/?packageId=${row.id}`);
    queryClient.invalidateQueries({ queryKey: ["packages"] });
  }

  useEffect(() => {
    setRowSelection(
      Object.fromEntries(selectedPackages.map((id) => [id, true])),
    );
  }, []);

  return (
    <>
      {packages.isLoading && (
        <Loader2 className="m-auto h-10 w-10 animate-spin" />
      )}
      {packages.isSuccess && (
        <SelectableDataTable
          columns={columns}
          data={packages.data}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          rowIdFun={(row) => row.packageId}
          meta={{ deleteRow: deletePackage }}
        >
          No packages.
        </SelectableDataTable>
      )}
    </>
  );
}
