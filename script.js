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
        div.style.opacity = '1.10'; //inicializa a div do sketchboard com opacidade 1.10
        board.appendChild(div);
    }
}

function addColor(e){
    if(e.type === 'mouseover' && !desenha) return
        if (e.target.style.opacity == 1.10) { //se a opacidade for 1.10 (primeira vez)
            e.target.style.opacity = '1.1'; //seta em 1.1
        }
        e.target.style.backgroundColor = color(); //manda uma cor
         let opacidadeAntes = Number(e.target.style.opacity);
        if (opacidadeAntes >= 0.1) { //enquanto for maior = a 0.1
            opacidadeAntes -= 0.1; //diminui 0.1 (10%) cada vez (ou seja na primeira vez que passar o rgb vai estar em 100%)
        }                          //depois vai diminuindo 10% cada vez, (a cor do container é preta),
                                    // isso faz a div ir ficando preta(forma mais facil que eu achei).
        e.target.style.opacity = opacidadeAntes;
}

function color() {
    let escolheCor = `hsl(${Math.random() * 360},100%,50%)`;
    return escolheCor;
}

mySlider.onmousemove = (e) => updateSize(e.target.value);
function updateSize(value){
    sliderValue.textContent = `${value}x${value}`;
}


mySlider.addEventListener('change', () => {
    gridDisplay(mySlider.value);
    clearGrid();
});

function clearGrid(){
    container.innerHTML=  '';
    gridDisplay(mySlider.value);
}

btnClear.addEventListener('click',clearGrid); 