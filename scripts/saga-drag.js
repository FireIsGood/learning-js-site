const ROUNDING = 16;
const OFFSET_X = 0;
const OFFSET_Y = 1;

const draggableElements = document.querySelectorAll(".draggable");
let draggableOrder = [...draggableElements];

for (elem of draggableElements) {
  console.log(elem);
  addDraggable(elem);
}

function addDraggable(dragElement) {
  let pos1 = 0;
  pos2 = 0;
  pos3 = 0;
  pos4 = 0;
  dragElement.onpointerdown = pointerDrag;
  roundPosition();

  function pointerDrag(e) {
    e.preventDefault();
    // console.log(e);
    pos3 = e.clientX;
    pos4 = e.clientY;
    updateZ(draggableOrder, dragElement);

    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // console.log(pos1, pos2, pos3, pos4);
    dragElement.style.top = dragElement.offsetTop - pos2 + "px";
    dragElement.style.left = dragElement.offsetLeft - pos1 + "px";
  }

  function stopElementDrag(e) {
    roundPosition();
    document.onpointermove = null;
    document.onpointerup = null;
  }

  function updateZ(all, curr) {
    draggableOrder = all.filter((i) => i !== curr);
    draggableOrder.push(curr);
    console.log(draggableOrder);
    for ([index, elem] of draggableOrder.entries()) {
      // console.log([index, elem]);
      elem.style.zIndex = index;
    }
  }

  function roundPosition() {
    dragElement.style.left =
      Math.round((dragElement.offsetLeft + OFFSET_X) / ROUNDING) * ROUNDING -
      OFFSET_X +
      "px";
    dragElement.style.top =
      Math.round((dragElement.offsetTop + OFFSET_Y) / ROUNDING) * ROUNDING -
      OFFSET_Y +
      "px";
  }
}
