// ---------------------- each / map / filter / reduce ---------------------

function each(myCollection, myFunction) {
    if (Array.isArray(myCollection)) {
        for (var i = 0; i < myCollection.length; i++) {
            myFunction(myCollection[i], i);
        }
    } else {
        for (var key in myCollection) {
            myFunction(myCollection[key], key);
        }
    }
}

function map(myCollection, myFunction) {
    var newAccumulator = [];
    if (!Array.isArray(myCollection)) {
        newAccumulator = {};
    }
    each(myCollection, function (element, key) {
        newAccumulator[key] = myFunction(element, key);
    });
    return newAccumulator;
}

function filter(myArray, myPredicate) {
    var newAccumulator = [];
    each(myArray, function (element) {
        if (myPredicate(element)) {
            newAccumulator.push(element);
        }
    });
    return newAccumulator;
}

function reduce(myArray, myFunction, myAccumulator) {
    if (myAccumulator === undefined) {
        myAccumulator = myArray[0];
        myArray = myArray.slice(1);
    }
    each(myArray, function (element, i) {
        myAccumulator = myFunction(myAccumulator, element, i);
    });
    return myAccumulator;
}

// --------------- numerator for exercies, quizzes & courses ---------------

function newNumber(array_Exercices) {
    this.number = array_Exercices.length + 1;
}

// --------------------------- Class of Exercice ---------------------------

function Exercice(statment, code) {
    var exercice = {};

    exercice.number = null;
    exercice.statment = statment;
    exercice.code = code;

    exercice.render_Exercice = render_Exercice; // render_Exercice;

    return exercice;
}

function render_Exercice() {
    return `
<div class="exercice">
    <div class="title">
        <h3>Exercice ${this.number}</h3>
        <span style="cursor:pointer;" onclick="$('#ex-${this.number}').toggle()">
            <img src='./img/hide.png'>
        </span>
    </div>

    <div id="ex-${this.number}">
        <p>${this.statment}</p>
        <pre><code>${this.code}</code></pre>
    </div>
<div>`;
}

// ------------------------ Class of array_Exercices -----------------------

function Array_Exercices() {
    var array_Exercices = [];

    array_Exercices.add_Exercice = add_Exercice;
    array_Exercices.render_Exercices = render_Exercices;

    return array_Exercices;
}

function add_Exercice(exercice) {
    exercice.number = this.length + 1;
    this.push(exercice);
}

function render_Exercices() {
    thml_content = "";
    for (var i = 0; i < this.length; i++) {
        thml_content += this[i].render_Exercice();
    }
    return thml_content;
}

// ----------------------------- Class of Quiz -----------------------------

function Quiz(statment, choices) {
    var quiz = {};

    quiz.number = null;
    quiz.statment = statment;
    quiz.choices = choices; // array of choices

    quiz.check = check; // boolean
    quiz.render_Quiz = render_Quiz; // boolean
    quiz.render_Quiz = render_Quiz; // boolean

    return quiz;
}

function check(answer) {
    return this.choices[0] === answer;
}

function render_Quiz() {
    console.log();
    var answer = [];
    var i = 0;
    while (i < 3) {
        random_number = Math.floor(Math.random() * 3);
        if (!answer.includes(random_number)) {
            answer.push(random_number);
            i++;
        }
    }
    return `<div class ="quiz">
    <div class="title">
        <p>${this.number} - ${this.statment}:</p>
    </div>

    <div class="choice" id="quiz-${this.number}">
        <pre>
            <span>
                <input type="radio" name="choice" id="choice-1">${
                    this.choices[answer[0]]
                }
            </span>
            <span>
                <input type="radio" name="choice" id="choice-2">${
                    this.choices[answer[1]]
                }
            </span>
            <span>
                <input type="radio" name="choice" id="choice-3">${
                    this.choices[answer[2]]
                }
            </span>
        </pre>
    </div>

    <div class="btns-quiz">
        <button id="next">next</button>
        <button id="reset">skip</button>
    </div>
</div>`;
}

// ---------------------------- Class of Quizzes ---------------------------

function Array_Quizzes() {
    var array_Quizzes = [];

    array_Quizzes.add_Quiz = add_Quiz;

    return array_Quizzes;
}

function add_Quiz(quiz) {
    quiz.number = this.length + 1;
    this.push(quiz);
}

// --------------------------- Class of 1 Course ---------------------------

function Course(name, exercices, quizzes) {
    var course = {};

    course.name = name;
    course.number = null;
    course.exercices = exercices; // array of Exercices
    course.quizzes = quizzes; // Array of Quizzes

    return course;
}

// ------------------------- Class of array_Courses ------------------------

function Array_Courses() {
    var array_Courses = [];

    array_Courses.init = init;
    array_Courses.add_Course = add_Course;
    array_Courses.get_Exercice = get_Exercice;
    array_Courses.get_Exercices = get_Exercices;
    array_Courses.get_Quiz = get_Quiz;
    array_Courses.get_Quizzes = get_Quizzes;
    array_Courses.get_Course = get_Course;

    return array_Courses;
}

function add_Course(course) {
    course.number = this.length + 1;
    this.push(course);
}

function init(data) {
    for (var i = 0; i < data.length; i++) {
        var statment,
            code,
            exercice,
            array_Exercices,
            quiz,
            array_Quizzes,
            course;

        // for:
        // i = 1 (JavaScript)
        // i = 2 (HTML)
        // i = 3 (CSS)
        console.log("Content_of_Course[i] :", data[i].content); // => {array_Exercices, array_Quizzes}
        for (var key in data[i].content) {
            // console.log(key) // => "exercices" then "quizzes"
            // console.log(data[i].content[key]) // => array_Exercices & array_Quizzes
            if (key === "exercices") {
                // creating an empty array of Exercices
                array_Exercices = Array_Exercices();
                for (var j = 0; j < data[i].content[key].length; j++) {
                    // save the statment content into a temporary variable
                    statment = data[i].content[key][j].statment;
                    // save the code content into a temporary variable
                    code = data[i].content[key][j].code;

                    // Create a new Exercice an initialize the statment & the code content
                    exercice = Exercice(statment, code);
                    // Add a number to the current exercice, then add it to the array_Exercices
                    array_Exercices.add_Exercice(exercice);
                }
                // defining Exercices
            }

            if (key === "quizzes") {
                // creating an empty array of Quizzes
                array_Quizzes = Array_Quizzes();
                for (var j = 0; j < data[i].content[key].length; j++) {
                    statment = data[i].content[key][j].statment;
                    choices = data[i].content[key][j].choices;
                    quiz = Quiz(statment, choices);
                    array_Quizzes.add_Quiz(quiz);
                }
            }
        }

        // Create new array of courses
        course = Course(data[i].course, array_Exercices, array_Quizzes);
        this.add_Course(course);
    }
}

function get_Exercices(course_name) {
    var array_Courses = this; // meaningful name, instead of "that"
    return reduce(
        array_Courses,
        function (accumulator, element) {
            // if the name of the element (course) is correspending to "course_name"
            if (element.name === course_name) {
                // then, the new value of the accumulator will be our element
                return element.exercices;
            } else {
                // if the element is not yet found, it will be "null" value
                // or, it already found ... it will continue returning the previous & same value of the accumulator
                return accumulator;
            }
            // if(accumulator.name === course_name)
        },
        null // started will have a null value, & the accumulator will have the null, or the result
    );
}

function get_Exercice(course_name, exercice_number) {
    var array_Courses = this; // meaningful name, instead of "that"
    return reduce(
        array_Courses,
        function (accumulator, element) {
            // if the name of the element (course) is correspending to "course_name"
            if (element.name === course_name) {
                // then, the new value of the accumulator, will be our specific element
                return element.exercices[exercice_number - 1];
            } else {
                // if the element is not yet found, it will be "null" value
                // or, it already found ... it will continue returning the previous & same value of the accumulator
                return accumulator;
            }
            // if(accumulator.name === course_name)
        },
        null // started will have a null value, & the accumulator will have the null, or the result
    );
}

function get_Quizzes(course_name) {
    var array_Courses = this; // meaningful name, instead of "that"
    return reduce(
        array_Courses,
        function (accumulator, element) {
            // if the name of the element (course) is correspending to "course_name"
            if (element.name === course_name) {
                // then, the new value of the accumulator, will be our specific element
                return element.quizzes;
            } else {
                // if the element is not yet found, it will be "null" value
                // or, it already found ... it will continue returning the previous & same value of the accumulator
                return accumulator;
            }
            // if(accumulator.name === course_name)
        },
        null // started will have a null value, & the accumulator will have the null, or the result
    );
}

function get_Quiz(course_name, quiz_number) {
    var array_Courses = this; // meaningful name, instead of "that"
    return reduce(
        array_Courses,
        function (accumulator, element) {
            // if the name of the element (course) is correspending to "course_name"
            if (element.name === course_name) {
                // then, the new value of the accumulator, will be our specific element
                return element.quizzes[quiz_number - 1];
            } else {
                // if the element is not yet found, it will be "null" value
                // or, it already found ... it will continue returning the previous & same value of the accumulator
                return accumulator;
            }
            // if(accumulator.name === course_name)
        },
        null // started will have a null value, & the accumulator will have the null, or the result
    );
}

function get_Course(course_name) {
    var array_Courses = this; // meaningful name, instead of "that"
    return reduce(
        array_Courses,
        function (accumulator, element) {
            // if the name of the element (course) is correspending to "course_name"
            if (element.name === course_name) {
                // then, the new value of the accumulator, will be our specific element
                return element;
            } else {
                // if the element is not yet found, it will be "null" value
                // or, it already found ... it will continue returning the previous & same value of the accumulator
                return accumulator;
            }
            // if(accumulator.name === course_name)
        },
        null // started will have a null value, & the accumulator will have the null, or the result
    );
}

// --------------- JavaScript code content of Exercice 1 to 5 --------------
js_code_1 = `function hello(name) {
    // Write your code here
}`;

js_code_2 = `function foo() {
    // Write your code here
}`;

js_code_3 = `function magic(){
    // Write your code here
}`;

js_code_4 = `function show(anything){
    // Write your code here
}`;

js_code_5 = `function nothing (){
    return;
}`;

// ------------------ HTML code content of Exercice 1 to 5 -----------------
html_code_1 = `
So many codes
`;
html_code_2 = `
another codes
`;
html_code_3 = `
simple code
`;
html_code_4 = `
beautiful code
`;
html_code_5 = `
code yourself
`;

// ------------------ CSS code content of Exercice 1 to 5 ------------------
css_code_1 = `
So many codes
`;
css_code_2 = `
So many codes
`;
css_code_3 = `
simple code
`;
css_code_4 = `
beautiful code
`;
css_code_5 = `
code yourself
`;

// ------------------------- Initialization of Data ------------------------

var javascript_Exercices = [
    {
        statment: `Create a function called greet that returns a string with like "Hello there"`,
        code: js_code_1,
    },
    {
        statment: `Create a function called foo that returns the type of the given parameter`,
        code: js_code_2,
    },
    {
        statment: `Create a function called magic, that returns a random number`,
        code: js_code_3,
    },
    {
        statment: `Create a function called show, that shows anything inside the console`,
        code: js_code_4,
    },
    {
        statment: `Test this function and understand what really happens`,
        code: js_code_5,
    },
];
var javascript_Quizzes = [
    {
        statment: `What is a JavaScript`,
        choices: [`Programming Language`, `Machine Language`, `Same as Java`],
    },
    {
        statment: `What is closure ?`,
        choices: [
            `Only the child function inside the parent one`,
            `The parent function and the child function`,
            `variables outside the child function`,
        ],
    },
    {
        statment: `What is map ?`,
        choices: [
            `High order function`,
            `Recursive function`,
            `Google's Map functionnality`,
        ],
    },
    {
        statment: `What is jquery ?`,
        choices: [`Library`, `Framework`, `Operating System`],
    },
    {
        statment: `What is recursion ?`,
        choices: [
            `Function that call her self`,
            `Class that call itself`,
            `Recusrive Function`,
        ],
    },
];

var html_Exercices = [
    { statment: `Statement`, code: html_code_1 },
    { statment: `Another statments`, code: html_code_2 },
    { statment: `Not the same statment`, code: html_code_3 },
    { statment: `very usefull & informative statment`, code: html_code_4 },
    { statment: `finaly the last statment to understand`, code: html_code_5 },
];
var html_Quizzes = [
    {
        statment: `What does HTML stands for ?`,
        choices: [
            `Hyper Text Markup Language`,
            `Hyperlinks and Text Markup Language`,
            `Home Tool Markup Language`,
        ],
    },
    {
        statment: `Where is the correct place to insert a JavaScript?`,
        choices: [
            `Both the <head> section and the <body> section are correct`,
            `The <body> section`,
            `The <head> section`,
        ],
    },
    {
        statment: `Where is the correct place to insert a CSS?`,
        choices: [
            `Both the <head> section and the <body> section are correct`,
            `The <body> section`,
            `The <head> section`,
        ],
    },
    {
        statment: `What is the correct syntax for referring to an external script called "main.js"?`,
        choices: [
            `<script src="main.js">`,
            `<script href="main.js">`,
            `<script name="xxx.js">`,
        ],
    },
    {
        statment: `What is a comment on HTML ?`,
        choices: [
            `<!-- This is a comment -->`,
            `// This is a comment`,
            `/* This is a comment */`,
        ],
    },
];

var css_Exercices = [
    { statment: `Statement`, code: css_code_1 },
    { statment: `Another statments`, code: css_code_2 },
    { statment: `Not the same statment`, code: css_code_3 },
    { statment: `very usefull & informative statment`, code: css_code_4 },
    { statment: `finaly the last statment to understand`, code: css_code_5 },
];
var css_Quizzes = [
    {
        statment: `What does CSS stands for`,
        choices: [
            `Cascading Style Sheets`,
            `Computer Style Sheets`,
            `Colorful Style Sheets`,
        ],
    },
    {
        statment: `Which HTML tag is used to define an internal style sheet?`,
        choices: [`<style>`, `<script>`, `<css>`],
    },
    {
        statment: `How do you insert a comment in a CSS file?`,
        choices: [
            ` /* this is a comment */`,
            `// this is a comment`,
            `<!-- This is a comment -->`,
        ],
    },
    {
        statment: `Which property is used to change the background color?`,
        choices: [`background-color`, `backgroundColor`, `background.color`],
    },
    {
        statment: `Which CSS property is used to change the text color of an element ?`,
        choices: [`color`, `text-color`, `text`],
    },
];

var data = [
    {
        course: "JavaScript",
        content: {
            exercices: javascript_Exercices,
            quizzes: javascript_Quizzes,
        },
    },
    {
        course: "HTML",
        content: {
            exercices: html_Exercices,
            quizzes: html_Quizzes,
        },
    },
    {
        course: "CSS",
        content: {
            exercices: css_Exercices,
            quizzes: css_Quizzes,
        },
    },
];

// -------------------------- Initializing System --------------------------

window.array_Courses = Array_Courses();
array_Courses.init(data);

console.log(array_Courses.get_Exercice("JavaScript", 1).render_Exercice());
console.log(array_Courses.get_Exercices("JavaScript").render_Exercices());
console.log(array_Courses.get_Exercice("HTML", 5));
console.log(array_Courses.get_Quizzes("HTML"));

for (var i = 1; i <= 5; i++) {
    console.log(
        "New Iteration :",
        array_Courses.get_Quiz("HTML", i).render_Quiz()
    );
}
