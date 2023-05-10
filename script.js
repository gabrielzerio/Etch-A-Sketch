const container = document.querySelector('.container');
let desenha = false;
document.body.onmousedown = () => (desenha = true);
document.body.onmouseup = () => (desenha = false);

const mySlider = document.getElementById('sliderGrid');
const sliderValue = document.getElementById('slider-value');
const btnClear = document.querySelector('.btnClear');




document.addEventListener('DOMContentLoaded', () => {
    gridDisplay(mySlider.value);
});


function gridDisplay(size) {
    let squares = size * size;
    let board = document.querySelector('.container'); //é o mesmo da variavel container
    board.style.gridTemplateColumns = `repeat(${size},1fr)`;
    board.style.gridTemplateRows = `repeat(${size},1fr)`;
    
    for (let i = 1; i <= squares; i++) {
        const div = document.createElement('div');
        board.addEventListener('mouseover', addColor);   
        board.addEventListener('mousedown', addColor);
        div.style.opacity = '1.01';
        board.appendChild(div);
    }
}

function addColor(e){
    if(e.type === 'mouseover' && !desenha) return
        if (e.target.style.opacity == 1.01) {
            e.target.style.opacity = '0';
        }
        e.target.style.backgroundColor = color();
         let opacidadeAntes = Number(e.target.style.opacity);
        if (opacidadeAntes <= 1) {
            opacidadeAntes += 0.1
        }
        e.target.style.opacity = opacidadeAntes;
    }

function color() {
    let escolheCor = `hsl(${Math.random() * 360},100%,50%)`;
    return escolheCor;
}

mySlider.onmousemove = (e) => updateSize(e.target.value);
function updateSize(value){
    sliderValue.textContent = `${value} x ${value}`;
}


mySlider.addEventListener('change', () => {
    clearGrid();
    gridDisplay(mySlider.value);
});

function clearGrid(){
    container.innerHTML=  '';
    gridDisplay(mySlider.value);
}

btnClear.addEventListener('click',clearGrid); 