import SortableList from "components/sortable/sortableList";

export default function UsageExample() {
  const data = [
    "homer",
    "marge",
    "lisa",
    "bart",
    "maggie",
    "lou",
    "lenny",
    "barney",
    "edna",
    "itchy",
    "scratchy",
    "krusty",
    "milhouse",
    "moe",
    "ralph",
    "seymour"
  ];
  
  return (
    <SortableList data={data} />
  );
}