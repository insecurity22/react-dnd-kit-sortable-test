import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove
} from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "./sortable";
import { SortableBaseStyle } from "./style";

const SortableList = (props) => {
  // example. props.data = [1, 2, 3]
  const [items, setItems] = useState(props.data);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleRemove = (id) =>
    setItems((items) => items.filter((item) => item !== id));
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <SortableBaseStyle>
          {items.map((name, index) => (
            <Sortable
              key={name}
              name={name}
              index={index}
              onRemove={handleRemove}
            />
          ))}
        </SortableBaseStyle>
      </SortableContext>
    </DndContext>
  );
};
export default SortableList;
