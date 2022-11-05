import SortableList from "components/sortable/sortableList";

export default function UsageExample() {
  const data = [
    {
      id: 1,
      type: 1,
      name: "License",
      order: 0,
      view: true,
      createdAt: "2022-08-31T00:00:00.000Z",
      updatedAt: "2022-08-31T00:00:00.000Z",
      name_explanation: "자격증"
    },
    {
      id: 2,
      type: 2,
      name: "Portfolio",
      order: 1,
      view: true,
      createdAt: "2022-08-31T00:00:00.000Z",
      updatedAt: "2022-08-31T00:00:00.000Z",
      name_explanation: "프로젝트"
    }
  ];
  
  return (
    <SortableList datalist={data} />
  );
}
