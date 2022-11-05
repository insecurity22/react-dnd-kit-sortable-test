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
import SortableItem from "./sortableItem";
import { SortableWrap, SortableBaseStyle } from "./styles";

// interface SortableListProps {
//   datalist;
//   buttonName?:string;
//   buttonOnclick?;
// }

const SortableList = ({ datalist, buttonName, buttonOnclick }) =>
  // :SortableListProps
  {
    const [items, setItems] = useState(datalist);
    const sortable = {
      sensors: useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
      ),
      handleRemove: (id) =>
        setItems((items) => items.filter((item) => item !== id)),
      handleDragEnd: (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
          setItems((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      },
      handleAdd: (id) => setItems((items) => [...items, id])
    };

    const [addVisible, setAddVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [addInput, setAddInput] = useState("");
    const addData = {
      button: {
        add: () => {
          setAddVisible(true);
        },
        cancle: () => {
          setAddVisible(false);
        },
        onChange: (e) => {
          const { value } = e.target;
          if (value) setConfirmVisible(true);
          else setConfirmVisible(false);
          setAddInput(value);
        },
        confirm: () => {
          if (addInput == "") return;
          if (items.includes(addInput)) {
            alert("중복되는 값은 입력할 수 없습니다.");
            return;
          }
          sortable.handleAdd(addInput);
          setAddInput("");
        }
      }
    };

    return (
      <SortableWrap>
        <DndContext
          sensors={sortable.sensors}
          onDragEnd={sortable.handleDragEnd}
        >
          <SortableContext items={items}>
            <SortableBaseStyle>
              {/* 기존 데이터 */}
              {items.map((item, index) => (
                <SortableItem
                  key={item}
                  id={item}
                  onRemove={sortable.handleRemove}
                />
              ))}
              {/* 추가 데이터 */}
              {addVisible && (
                <div className="list add-list">
                  <input
                    type="text"
                    name="category"
                    className="w-full mr-3"
                    value={addInput}
                    onChange={addData.button.onChange}
                  />
                  <button
                    className="sm-btn mr-1"
                    onClick={addData.button.cancle}
                  >
                    취소
                  </button>
                  <button
                    className={confirmVisible ? "sm-btn" : "sm-btn disabled"}
                    onClick={addData.button.confirm}
                  >
                    확인
                  </button>
                </div>
              )}
            </SortableBaseStyle>
            {/* 추가/저장 버튼 */}
            <div className="button__wrap">
              <button onClick={addData.button.add}>추가</button>
              {buttonName && (
                <button onClick={buttonOnclick}>{buttonName}</button>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </SortableWrap>
    );
  };
export default SortableList;
