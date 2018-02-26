// elements
let start = document.getElementById('start');
// jquery to simplify fade in-out process
let front = $('#front');
let loader = $('#loader');

// initial first question indentifier and score-table
let n = 1;
const score = {
    rightAnswers: 0,
    totalQuestions: undefined
}

// on load start screen is shown
document.addEventListener('DOMContentLoaded', function() {
    // load total number of questions for reference later
    fetch('http://localhost:3001/totalQuestions')
        .then(response => response.json())
        .then(json => {
            score.totalQuestions = parseInt(json[0], 10);
            console.log(score.totalQuestions);
        });

    // listen on start quiz click
    start.addEventListener('click', function(e) {
        // fade out start screen and load first question
        front.fadeOut(200);
        loadQuestion(n);
    }, false);

});

// handle answer selection
function handleAnswer(value) {
    // reference btn & right answer for current question
    let submit = document.getElementById('submit');
    let theAnswer = document.getElementById('theAnswer').value;
    // if answer selected allow to proceed
    submit.removeAttribute('disabled');
    // proceed to next question
    submit.addEventListener('click', (e) => {
        // show loader while fetching new question
        loader.fadeIn(10);
        // if answer is true log-it
        if (theAnswer === value) {
            score.rightAnswers += 1;
        }
        // if last question is answered calculateResult if not load next question
        if (n <= score.totalQuestions) {
            loadQuestion(n);
        } else {
            loader.fadeOut(200);
            calculateResult();
        }
    }, false);
}

// calculate result function
function calculateResult() {
    questionare.innerHTML = `<h1 class="final-score">Right Answers: ${score.rightAnswers}</h1>`
}

// fetch new question, compile hbs and append it
function loadQuestion(questId) {
    let questionare = document.getElementById('questionare');
    let url = `http://localhost:3001/questions/${questId}`;
    // compile template
    let source = document.getElementById('questionare-template').innerHTML;
    let template = Handlebars.compile(source);

    fetch(url)
        .then(response => response.json())
        .then(json => {
            let question = json.question;
            let answers = json.answers;
            let theAnswer = json.theAnswer;
            let html = template({ question, theAnswer, answers });
            questionare.innerHTML = html;
            loader.fadeOut(60);
            n += 1;
        });
}
