import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import {
    SortableContext,
    sortableKeyboardCoordinates
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
  
    return (
      <DndContext sensors={sensors}>
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
  