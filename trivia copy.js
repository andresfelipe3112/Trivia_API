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


//VARIABLES DE CONTROL
let questions;
let qIndex = 0;
let correct_index_answer;
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
    console.log(questions);
    questionsContainer.style.display = "flex";
    triviaForm.style.display = "none";
    points[0].style.display = "flex";



    //Variable para controlar preguntas una por una
    let currentQuestion = questions[qIndex];
    document.getElementById("questionName").innerText = currentQuestion.question;

    if (currentQuestion.incorrect_answers.length == 1) {
        document.getElementById("1").innerText = "True";
        document.getElementById("2").innerText = "False";
        document.getElementById("3").style.display = "none";
        document.getElementById("4").style.display = "none";
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

        //PINTA DE COLOR VERDE SI LA RESPUESTA ES CORRECTA 
        document.getElementById(correct_index_answer).addEventListener("click", function () {
            good.style.opacity = "1";
            console.log("felicitaciones");


        })

        //ELIMINA LAS RESPUESTA INCORRECTAS


        let boton = document.querySelectorAll("button");
        console.log(boton);


        for (let i = 1; i <= boton.length; i++) {

            if (i !== correct_index_answer) {
                document.getElementById(i).addEventListener("click", function () {
                    bad.style.opacity = "1";
                    console.log("mal");
                    setTimeout(function () {
                        bad.style.opacity = "0";
                    }, 500)
                })
            }
        }








        // CUANDO PINTA LA RESPUESTA DE VERDE 
        document.getElementById(correct_index_answer).addEventListener("click", function () {

            let second = 3;
            nextQuestion.style.opacity = "1";
            var intervalSecond = setInterval(function () {
                nextQuestion.innerText = `Next Question ${second--}`
            }, 1000);



            setTimeout(function () {

                second = 3;
                clearInterval(intervalSecond)
                startGame();// SE LLAMA OTRA VES PARA QUE HAGA RENDER DEL DOM con el nuevo qIndex    

            }, 5000)






        }, false)


    }






};

//LISTENERS
triviaForm.addEventListener("submit", getAPIData);






