import { GradePackagesTable } from "./grade-packages-table/GradePackagesTable";

export default function Results({ keys, setResult }) {
  return <GradePackagesTable keys={keys} setResult={setResult} />;
}
