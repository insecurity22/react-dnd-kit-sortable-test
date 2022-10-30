import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import Sortable from "./sortable";
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

    const handleRemove = (id) => {
      console.log("id"+id);
      setData((datalist) => datalist.filter((item) => item.name !== id))
    };

    return (
      <DndContext
        sensors={sensors}
      >
        <SortableBaseStyle>
          <SortableContext items={[datalist && datalist.map((i) => i.id)]}>
            {data && data.map((item, index) => (
              <Sortable 
                  key={item.name} 
                  name={item.name} 
                  index={item.id}
                  onRemove={handleRemove}
              />
            ))}
          </SortableContext>
        </SortableBaseStyle>
      </DndContext>
    )
}

export default SortableList;