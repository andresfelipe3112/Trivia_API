//ELEMENTOS HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");
let points = document.getElementsByClassName("questionsContentPoints");
let nextQuestion = document.getElementById("nextQuestion");
let good = document.getElementById("good");
let bad = document.getElementById("bad");
let questionResolve = document.getElementById("Questions");
let boton = document.querySelectorAll("button")


//VARIABLES DE CONTROL
let questions;

let correct_index_answer;
let questionsResolve = 0;
let goods = 0;
let bads = 0;
let botoncoinidencia;
let second = 3;

//FUNCIONES
let getAPIData = e => {
    e.preventDefault();
    let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            questions = data.results;
            startGame();

        });
};

const startGame = () => {
    boton.forEach(boton => { boton.style.backgroundColor = "red" })
    // let array = questions.filter((pregunta) => questions[qIndex] !== pregunta ? pregunta : null)
    // questions = array;
    console.log(questions);
    questionsResolve = questions.length;
    document.getElementById("Questions").innerText = `faltan ${questions.length} preguntas`
    second = 3;
    questionsContainer.style.display = "flex";
    triviaForm.style.display = "none";
    points[0].style.display = "flex";
    nextQuestion.style.opacity = "0";
    good.style.opacity = "0";



    //Variable para controlar preguntas una por una
    let currentQuestion = questions[questionsResolve - 1];
    document.getElementById("questionName").innerText = currentQuestion.question;

    if (currentQuestion.type !== "multiple") {
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";

        correct_index_answer = Math.floor(Math.random() * 2) + 1;
        document.getElementById(correct_index_answer).innerText =
            currentQuestion.correct_answer;
        console.log(correct_index_answer);
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue;
            document.getElementById(i).innerText =
                currentQuestion.incorrect_answers[j];
            j = i;
        }

    } else {
        document.getElementById("1").style.display = "Block";
        document.getElementById("2").style.display = "Block";
        document.getElementById("3").style.display = "Block";
        document.getElementById("4").style.display = "Block";

        correct_index_answer = Math.floor(Math.random() * 4) + 1;
        document.getElementById(correct_index_answer).innerText =
            currentQuestion.correct_answer;
        console.log(correct_index_answer);
        let j = 0;
        for (let i = 1; i <= 4; i++) {
            if (i === correct_index_answer) continue;
            document.getElementById(i).innerText =
                currentQuestion.incorrect_answers[j];
            j = i;
        }

    }
    //PINTA DE good  SI LA RESPUESTA ES CORRECTA 
    for (let index = 0; index < boton.length; index++) {

        // console.log(botoncoinidencia);


        boton[index].addEventListener("click", function (e) {
            second = 3;

            if (boton[index].innerText === questions[questionsResolve - 1].correct_answer) {
                e.preventDefault();
                e.stopImmediatePropagation();
                good.style.opacity = "1";
                console.log("felicitaciones");
                boton[index].style.backgroundColor = "green"
                nextQuestion.style.opacity = "1";
                goods++
                document.getElementById("goods").innerText = `Goods ${goods}`
                document.getElementById("Questions").innerText = `faltan ${questionsResolve} preguntas`

                let intervalSecond = setInterval(function () {
                    nextQuestion.innerText = `Next Question ${second--}Seg`
                }, 1000);
                second = 3;




                setTimeout(function () {

                    let array = questions.filter((pregunta) => questions[questionsResolve - 1] !== pregunta ? pregunta : null)
                    questions = array;


                    clearInterval(intervalSecond)
                    startGame()
                }, 4000)
            }
            else {

                //ELIMINA LAS RESPUESTA INCORRECTAS poniendo bad
                e.preventDefault();
                e.stopImmediatePropagation();
                bad.style.opacity = "1";
                bads++
                document.getElementById("bads").innerText = `Bads: ${bads}`
                setTimeout(function () {
                    bad.style.opacity = "0";
                }, 700)
            }


        })



    }



}


//LISTENERS
triviaForm.addEventListener("submit", getAPIData, false);








