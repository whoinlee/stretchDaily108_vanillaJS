const empties = document.querySelectorAll(".empty");
const fill = document.querySelector(".fill");

empties.forEach((empty) => {
  empty.addEventListener("dragover", (e) => e.preventDefault());
  empty.addEventListener("dragenter", dragEnter);
  empty.addEventListener("dragleave", dragLeave);
  empty.addEventListener("drop", dragDrop);
});
fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

function dragStart() {
  this.className += " hold"; //*****/
  setTimeout(() => (this.className = ""), 0); //?????
}

function dragEnd() {
  this.className = "fill";
}

function dragEnter(e) {
  e.preventDefault();
  this.className += " hovered";
}

function dragLeave() {
  this.className = "empty";
}

function dragDrop() {
  this.className = "empty";
  this.append(fill); //******/
}
