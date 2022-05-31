function getDenominador(min,max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function getNumerador(min,max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getResultado() {
  return parseFloat(elnumerador.innerHTML) / parseFloat(eldenominador.innerHTML);
}

function getResultado2() {
  return parseFloat(elnumerador2.innerHTML) / parseFloat(eldenominador2.innerHTML);
}

const elnumerador = document.querySelector(".numerador");
let elseparador = document.querySelector(".separador");
const eldenominador = document.querySelector(".denominador");
const elresultado = document.querySelector(".resultado");

let rectangulo = document.querySelector(".rectangulo");

const elnumerador2 = document.querySelector(".numerador2");
let elseparador2 = document.querySelector(".separador2");
const eldenominador2 = document.querySelector(".denominador2");
const elresultado2 = document.querySelector(".resultado2");

var dameFraccionClickado = false;
var modificadorClickado = false;

function seccionar(){
 for (let i = 0; i < eldenominador2.innerHTML; i++) {
    let li = document.createElement('li')
    li.className = "rec_denominador";
    rectangulo.appendChild(li);
  } 
}
function colorear(){
  const seccionados = document.querySelectorAll('.rec_denominador');
    if(seccionados){
      for (let el = 0; el < seccionados.length; el++) {     
        for (let i = 0; i < elnumerador2.innerHTML; i++) {
          const seccionado = seccionados[i]; 
          seccionado.classList.add("rec_numerador","anima");
      }     
    }
  }
} 

document.querySelector(".btn--dame-fraccion").addEventListener('click', () => {
    dameFraccionClickado = true;
    modificadorClickado = false;

    while(rectangulo.hasChildNodes() ){
      rectangulo.removeChild(rectangulo.lastChild);
    }
    eldenominador.innerHTML = getDenominador(2,11);
    elseparador.classList.add("active");
    elnumerador.innerHTML = getNumerador(1,eldenominador.innerHTML - 1);
    elresultado.innerHTML = getResultado();

    eldenominador2.innerHTML = "";
    elnumerador2.innerHTML = "";
    elresultado2.innerHTML = "";

  })

  document.querySelector(".btn_dibuja_numerador.suma").addEventListener('click', () => {
    if(dameFraccionClickado){
      modificadorClickado = true;
        //añado un numerador a la fracción 2 (oculta)
        let denominadores = document.querySelectorAll('.rec_denominador');
        longitudDenominadores = denominadores.length;
        let coloreados = document.querySelectorAll('.rec_numerador');
        if(coloreados.length < longitudDenominadores){ // no pueden haber numerador que denominador, no más coloreados que particiones
          elnumerador2.innerHTML ++ ;
        }
        //voy coloreando
        colorear(elnumerador2.innerHTML);

        elresultado2.innerHTML = getResultado2();

      }
    
  });


  document.querySelector(".btn_dibuja_numerador.resta").addEventListener('click', () => {
    if(dameFraccionClickado){
      modificadorClickado = true;
        //descoloreo/quito un numerador del rectángulo, recorro su array y quito el último
        let coloreados = document.querySelectorAll('.rec_numerador');
        for (let i = 0; i < coloreados.length; i++) {
          if(coloreados.length >= 1){
            const lastItemNum = coloreados[coloreados.length - 1];
            lastItemNum.classList.remove("rec_numerador");
          }
        } 
        //quito un numerador a la fracción 2 (oculta)
        if(coloreados.length >= 1){
          elnumerador2.innerHTML -- ;
        }
        elresultado2.innerHTML = getResultado2();
      }
    
  });

  document.querySelector(".btn_dibuja_denominador.suma").addEventListener('click', () => {
    if(dameFraccionClickado){
      modificadorClickado = true;
      //añado un denominador a la fracción 2 (oculta)
      eldenominador2.innerHTML ++ ;
      //pinto/añado un denominador al rectángulo
      let li = document.createElement('li')
      li.className = "rec_denominador";
      rectangulo.appendChild(li);  
      elresultado2.innerHTML = getResultado2();
    }
  });


  document.querySelector(".btn_dibuja_denominador.resta").addEventListener('click', () => {
    if(dameFraccionClickado){
      modificadorClickado = true;
      //quito un denominador al rectángulo, recorro su array y quito el último
      let denominadores = document.querySelectorAll('.rec_denominador');
      
      for (let i = 0; i < denominadores.length; i++) {
        if(denominadores.length > 1){
          const lastItemDen = denominadores[denominadores.length - 1];
          lastItemDen.classList.remove("rec_denominador");
        }
      } 

      //quito un denominador a la fracción 2 (oculta)
      if(denominadores.length > 1){
        eldenominador2.innerHTML -- ;
      }
      
      elresultado2.innerHTML = getResultado2();
    }
  });

  function playSoundCorrect() {
    var audioCorrect = document.querySelector(".audio-correct");
    audioCorrect.play();
  }

  function playSoundWrong() {
    var audioWrong = document.querySelector(".audio-wrong");
    audioWrong.play();
  }

  let comparador = document.querySelector(".btn_comparador");
  comparador.addEventListener('click', () => {
      if(modificadorClickado){
         //alert("any button rectangle was clicked");
        if (elresultado.innerHTML === elresultado2.innerHTML){
          setTimeout(function(){
            rectangulo.classList.add("correct");
            playSoundCorrect();
          },  0);
          setTimeout(function(){
            rectangulo.classList.remove("correct");
          },  1000);
        } else {
           setTimeout(function(){
            rectangulo.classList.add("wrong");
            playSoundWrong();
          },  0);
          setTimeout(function(){
            rectangulo.classList.remove("wrong");
          },  1000);
        }
      }

  });
