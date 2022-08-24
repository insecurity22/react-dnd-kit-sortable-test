import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "./sortable";

const SortableList = (props) => {

    // example. props.data = [1, 2, 3]
    const [items, setItems] = useState(props.data);
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items}>
                {items.map((name, index) => (
                    <Sortable key={name} name={name} index={index} />
                ))}
            </SortableContext>
        </DndContext>
    )
    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setItems((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            
            return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}
export default SortableList;