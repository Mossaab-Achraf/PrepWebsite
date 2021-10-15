$(document).ready(()=>{
     $("#logo").on('click',()=>{
          $(".main").show();
          $("#content").hide();
          $("#notif-content").hide();
     });
     $("#javascript").on('click',()=>renderContents());
     $("#html").on('click', ()=>renderContents());
     $("#css").on('click', ()=>renderContents());
     $("#notification").on('click',()=>renderNotification());
     $("#guest").on('click', () => renderGuest());
});

function renderExercice(i){
     var $div = `
     <div class="exercice">
          <div class="title"><h3>Exercice `+i+`</h3> <span style="cursor:pointer;" onclick="$('#ex`+i+`').toggle()"> <img src='./img/hide.png'> </span></div>
          <div id="ex`+i+`">
          <p>We have two ways of writing a function. The function declaration is what we've used so far, and the function
          expression is new to us. Rewrite the following function declarations using a function expression:</p>
          <pre>
          <code>
          // 1.
          function cube(x) {
          return x * x * x;
          }
          // 2.
          function fullname(first, last) {
          return first + ' ' + last;
          }
          // 3.
          function power(base, exp) {
          if (exp === 0) {
          return 1;
          }
          return base * power(base, exp - 1);
          }
          // 4.
          function sumCubes(numbers) {
          var total = 0;
               for (var i = 0; i < numbers.length; i++) {
                    total=total + cube(numbers[i]); 
               }
          return total;
          }
          </code>
          </pre>
          </div>
     </div> `;
     return $div;
}

function renderQuiz(i){
     var $quiz = `
          <div class="quiz">
               <div class="title"><p> `+ i + ` We have two ways of writing a function. The function declaration is what we've used so far, and the function
               expression is new to us. Rewrite the following function declarations using a function expression:</p></div>
               <div class="choice" id="quiz`+ i +`">
               <pre>


                    <span><input type="radio" name="choice" id=""> choice 1</span> <span><input type="radio" name="choice" id=""> choice 2</span> <span><input type="radio" name="choice" id=""> choice 3</span>
               
               
               </pre>
               </div>
               <div class="btns-quiz"><button id="next">next</button><button id="reset">skip</button></div>
          </div>
          `;
     return $quiz;
}

function renderContents(){
     $(".main").hide();
     $("#notif-content").hide();
     var content = $("#content").first();
     content.show();
     content.html("");
     for(var i = 1; i <= 5; i++){
          content.append(renderExercice(i));
     }
     content.append(renderQuiz(1));
}

function renderNotification(){
     var notification = $("#notif-content").first();
     var $div = `
          <div class="js-notification notif-item"  > Javascript &nbsp;
               <table>
               <tr>
                    <td class="green">1</td>
                    <td class="green">2</td>
                    <td class="">3</td>
                    <td class="">4</td>
                    <td class="">5</td>
                    <td class="red">Q: 2/5</td>
               </tr>
               </table>
          </div>
          <br>
          <div class="html-notification notif-item"> HTML &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <table>
               <tr>
                    <td class="green">1</td>
                    <td class="green">2</td>
                    <td class="green">3</td>
                    <td class="green">4</td>
                    <td class="green">5</td>
                    <td class="green">Q: 3/5</td>
               </tr>
               </table>
          </div>
          <br>
          <div class="css-notification notif-item" > Css &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <table>
               <tr>
                    <td class="">1</td>
                    <td class="">2</td>
                    <td class="">3</td>
                    <td class="green">4</td>
                    <td class="green">5</td>
                    <td class="red">Q: 0/5</td>
               </tr>
               </table>
          </div>
     `;
     $(".main").hide();
     $("#content").hide();
     notification.show();
     notification.html("");
     notification.append($div);
}




//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          mybutton.style.display = "block";
     } else {
          mybutton.style.display = "none";
     }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
}