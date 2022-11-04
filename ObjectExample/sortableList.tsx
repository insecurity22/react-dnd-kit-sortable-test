import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import SortableItem from "./sortableItem";
import { SortableBaseStyle } from "./style";

const SortableList = ({ datalist }) => {

  /**
   * example
   * props.data
   * [
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
    ]
  */

  const [data, setData] = useState(datalist);

  const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
  );

  let arr = [];
  datalist.map((item) => arr = [...arr, item.name])

  const handleRemove = (id) => {
    setData((datalist) => datalist.filter((item) => item.name !== id))
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(active.id);
    console.log(over.id);

    if (active.id !== over.id) {
      setData((items) => {
        console.log(items);
        const oldIndex = arr.indexOf(active.id);
        const newIndex = arr.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableBaseStyle>
        <SortableContext items={datalist && arr}>
          {data && data.map((item, index) => (
            <SortableItem 
                key={item.name} 
                id={item.name}
                onRemove={handleRemove}
            />
          ))}
        </SortableContext>
      </SortableBaseStyle>
    </DndContext>
  )
}

export default SortableList;
