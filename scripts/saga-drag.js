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
  let currX = 0;
  let currY = 0;
  let mouseX = 0;
  let mouseY = 0;
  dragElement.onpointerdown = pointerDrag;
  roundPosition();

  function pointerDrag(e) {
    e.preventDefault();
    // console.log(e);
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateZ(draggableOrder, dragElement);

    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
  }

  function elementDrag(e) {
    currX = mouseX - e.clientX;
    currY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    // console.log(pos1, pos2, pos3, pos4);
    dragElement.style.top = dragElement.offsetTop - currY + "px";
    dragElement.style.left = dragElement.offsetLeft - currX + "px";
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
