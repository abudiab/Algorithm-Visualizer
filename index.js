console.log("linked!");

const container = document.querySelector(".data-container");
const randomize = document.getElementById("randomize");
const solve = document.getElementById("solve");
let isSorting = false; // flag to track whether sorting is currently being executed
const slider = document.querySelector("#slider");
let arraySizeDisplay = document.querySelector("#array-size");
let arraySize = Number(slider.value);

slider.oninput = () => {
  let value = slider.value;
  arraySizeDisplay.textContent = value;
  arraySize = Number(value);
};

function generateBlocks() {
  let size = arraySize || 30;
  console.log(size);
  if (size && typeof size !== "number") {
    alert("First argument must be a typeof Number");
    return;
  }
  for (let i = 0; i < size; i += 1) {
    const value = Math.floor(Math.random() * 100);

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.height = `${value * 3}px`;
    block.style.transform = `translateX(${i * 30}px)`;

    const blockLabel = document.createElement("label");
    blockLabel.classList.add("block__id");
    blockLabel.innerHTML = value;

    block.appendChild(blockLabel);
    container.appendChild(block);
  }
}

function swap(el1, el2) {
  return new Promise((resolve) => {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("transform");
    const transform2 = style2.getPropertyValue("transform");

    el1.style.transform = transform2;
    el2.style.transform = transform1;

    // Wait for the transition to end!
    window.requestAnimationFrame(function () {
      setTimeout(() => {
        container.insertBefore(el2, el1);
        resolve();
      }, 250);
    });
  });
}

async function bubbleSort(delay = 100) {
  if (delay && typeof delay !== "number") {
    alert("sort: First argument must be a typeof Number");
    return;
  }
  if (isSorting) {
    console.log("sorting in progress!");
    // prevent multiple executions of bubbleSort
    return;
  }
  isSorting = true; // set flag to true to indicate that sorting is currently being executed

  let blocks = document.querySelectorAll(".block");
  for (let i = 0; i < blocks.length - 1; i += 1) {
    for (let j = 0; j < blocks.length - i - 1; j += 1) {
      blocks[j].style.backgroundColor = "#ea6666";
      blocks[j + 1].style.backgroundColor = "#ea6666";

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, delay)
      );

      const value1 = Number(blocks[j].childNodes[0].innerHTML);
      const value2 = Number(blocks[j + 1].childNodes[0].innerHTML);

      if (value1 > value2) {
        await swap(blocks[j], blocks[j + 1]);
        blocks = document.querySelectorAll(".block");
      }

      blocks[j].style.backgroundColor = "#bad7e9";
      blocks[j + 1].style.backgroundColor = "#bad7e9";
    }

    blocks[blocks.length - i - 1].style.backgroundColor = "#90ee90";
  }
  isSorting = false; // set flag to false to indicate that sorting has completed
  blocks[0].style.backgroundColor = "#90ee90";
}

function reset() {
  container.innerHTML = null;
  isSorting = false; // set flag to false to ensure that sorting is not currently
}

randomize.addEventListener("click", () => {
  reset();
  generateBlocks();
});
solve.addEventListener("click", () => {
  if (container.children.length == 0) {
    return;
  }
  bubbleSort();
});
