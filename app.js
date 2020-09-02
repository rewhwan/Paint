// html객체 상수 선언
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
//캔버스 기본 배경색 지정
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)

ctx.fillStyle = INITIAL_COLOR;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

// 캔버스 이벤트 함수
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// 브러시 색상을 바꾸는 함수
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// 브러시 사이즈 바꾸는 함수
function handleRangeChange(event) {
    const  size = event.target.value;
    ctx.lineWidth = size;
}

// 버튼 클릭 이벤트 함수
function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint"

    }
}

// 채우기 이벤트 함수
function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE)
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

// 이벤트 함수 선언
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (mode) {
    mode.addEventListener("click",handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick)
}