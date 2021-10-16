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
    exercice.course_name = null;
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
        <span id="finish${this.number}" class="finish" onclick='guest["${this.course_name}"].ex.push(${this.number});'>finish</span>
        <span style="cursor:pointer;" onclick="$('#ex-${this.number}').toggle()">
            <img src='./img/hide.png'>
        </span>
    </div>

    <div id="ex-${this.number}">
        <p>${this.statment}</p>
        <pre><code>
${this.code}
    </code></pre>
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
    html_content = "";
    for (var i = 0; i < this.length; i++) {
        html_content += this[i].render_Exercice();
    }
    return html_content;
}

// ----------------------------- Class of Quiz -----------------------------

function Quiz(statment, choices) {
    var quiz = {};

    quiz.number = null;
    quiz.course_name = null;
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
    var quiz_id = this.course_name + "-" + this.number;
    var answer = [];
    var i = 0;
    while (i < 3) {
        random_number = Math.floor(Math.random() * 3);
        if (!answer.includes(random_number)) {
            answer.push(random_number);
            i++;
        }
    }
    return `<div class ="quiz" id="quiz-${quiz_id}">
    <div class="title">
        <p>${this.number} - ${this.statment}:</p>
    </div>

    <div class="choice" id="quiz-${this.number}">
        <pre>
            <span>
                <input type="radio" name="choice-${quiz_id}" id="choice-${quiz_id}-1"> <label for="choice-${quiz_id}-1" class="label-answer">${
        this.choices[answer[0]]
    }</label>
            </span>
            <span>
                <input type="radio" name="choice-${quiz_id}" id="choice-${quiz_id}-2"> <label for="choice-${quiz_id}-2" class="label-answer">${
        this.choices[answer[1]]
    }</label>
            </span>
            <span>
                <input type="radio" name="choice-${quiz_id}" id="choice-${quiz_id}-3"> <label for="choice-${quiz_id}-3" class="label-answer">${
        this.choices[answer[2]]
    }</label>
            </span>
        </pre>
    </div>

    <div class="btns-quiz">
    ${
        this.number > 1
            ? `<button id="prev-btn-${this.course_name}-${
                  this.number
              }" onclick="$('#quiz-${this.course_name}-${
                  this.number
              }').hide();$('#quiz-${this.course_name}-${
                  this.number - 1
              }').show();">Previous</button>`
            : ``
    }
    ${
        this.number < 5
            ? `<button id="next-btn-${this.course_name}-${
                  this.number
              }" onclick="$('#quiz-${this.course_name}-${
                  this.number
              }').hide();$('#quiz-${this.course_name}-${
                  this.number + 1
              }').show();">Next</button>`
            : ``
    }
        <button id="finish-btn-${this.course_name}-${
        this.number
    }" onclick="validate-quiz()">Submit</button>
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
        // console.log("Content_of_Course[i] :", data[i].content); // => {array_Exercices, array_Quizzes}
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
                    exercice.course_name = data[i].course.toLowerCase();
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
                    quiz.course_name = data[i].course.toLowerCase();
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

js_code_5 = `let length = 16;          //

let lastName = "Johnson"; //

const x = {
    firstName: "John",
    lastName: "Doe"
};                        //`;

// ------------------ HTML code content of Exercice 1 to 5 -----------------
html_code_1 = `&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;a href=&quot;html_images.asp&quot; style=&quot;write your code here&quot;&gt;HTML Images&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;`;
html_code_2 = `&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;a href=&quot;html_images.asp&quot; target=&quot;write your code here&quot;&gt;HTML Images&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;`;
html_code_3 = `&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;table&gt;

        &lt;tr&gt;
            &lt;th&gt;First Name&lt;/th&gt;
            &lt;th&gt;Last Name&lt;/th&gt;
            &lt;th&gt;Points&lt;/th&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Jill&lt;/td&gt;
            &lt;td&gt;Smith&lt;/td&gt;
            &lt;td&gt;50&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;`;
html_code_4 = `&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;li&gt;Coffee&lt;/li&gt;
    &lt;li&gt;Tea&lt;/li&gt;
    &lt;li&gt;Milk&lt;/li&gt;

&lt;/body&gt;
&lt;/html&gt;`;
html_code_5 = `&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;ul style=&quot;Write your code here;&quot;&gt;
        &lt;li&gt;Coffee&lt;/li&gt;
        &lt;li&gt;Tea&lt;/li&gt;
        &lt;li&gt;Milk&lt;/li&gt;
    &lt;/ul&gt;

&lt;/body&gt;
&lt;/html&gt;`;

// ------------------ CSS code content of Exercice 1 to 5 ------------------
css_code_1 = `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;`;
css_code_2 = `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p id=&quot;para1&quot;&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;`;
css_code_3 = `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p class=&quot;colortext&quot;&gt;This is another paragraph.&lt;/p&gt;
&lt;p class=&quot;colortext&quot;&gt;This is also a paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;`;
css_code_4 = `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;style&gt;

&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This is a heading&lt;/h1&gt;
&lt;h2&gt;This is a smaller heading&lt;/h2&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;
`;
css_code_5 = `&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;

&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;`;

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
        statment: `Use comments to describe the correct data type of the following variables:`,
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
    {
        statment: `Use CSS to remove the underline from the link.`,
        code: html_code_1,
    },
    {
        statment: `Use the correct HTML attribute to make the link open in a new window.`,
        code: html_code_2,
    },
    { statment: `Add a table caption that says "Names".`, code: html_code_3 },
    {
        statment: `Finish the HTML code to make an ordered list.`,
        code: html_code_4,
    },
    {
        statment: `Use CSS to display squares instead of bullets.`,
        code: html_code_5,
    },
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
    // {
    //     statment: `What is the correct syntax for referring to an external script called "main.js"?`,
    //     choices: [
    //         `<script src="main.js">`,
    //         `<script href="main.js">`,
    //         `<script name="xxx.js">`,
    //     ],
    // },
    {
        statment: `Where is the meta tag only found?`,
        choices: [`The home page`, `The second page`, `The last page`],
    },
    {
        statment: `What is a comment on HTML ?`,
        choices: [
            `/// This is a comment ///`,
            `// This is a comment`,
            `/* This is a comment */`,
        ],
    },
];

var css_Exercices = [
    {
        statment: `Change the color of all &lt;p&gt; elements to "red".`,
        code: css_code_1,
    },
    {
        statment: `Change the color of the element with id="para1", to "red".`,
        code: css_code_2,
    },
    {
        statment: `Change the color of all elements with the class "colortext", to "red".`,
        code: css_code_3,
    },
    {
        statment: `Change the color of all &lt;p&gt; and &lt;h1&gt; elements, to &quot;red&quot;. Group the selectors to minimize code.`,
        code: css_code_4,
    },
    {
        statment: `Add an external style sheet with the URL: "mystyle.css".`,
        code: css_code_5,
    },
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
        statment: `What is a selector?`,
        choices: [
            `An attribute that allows you to select an HTML element for styling within CSS`,
            `Elements that connect HTML and CSS`,
            `A class or ID`,
        ],
    },
    {
        statment: `How do you insert a comment in a CSS file?`,
        choices: [
            ` /* this is a comment */`,
            `// this is a comment`,
            `/// This is a comment ///`,
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

array_Courses = Array_Courses();
array_Courses.init(data);
// console.log(array_Courses.get_Exercice("JavaScript", 1).render_Exercice());
// console.log(array_Courses.get_Exercices("JavaScript").render_Exercices());
// console.log(array_Courses.get_Exercice("HTML", 5));
// console.log(array_Courses.get_Quizzes("HTML"));

for (var i = 1; i <= 5; i++) {
    array_Courses.get_Quiz("HTML", i).render_Quiz();
}

array_Courses.get_Quiz("JavaScript", 1).render_Quiz();

array_Courses.get_Course("JavaScript");
