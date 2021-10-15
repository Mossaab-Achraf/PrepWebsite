var guest = {};
guest.javascript = { ex: [], q: 2};
guest.html = { ex: [3, 4, 5], q: 3 };
guest.css  = { ex: [1, 2, 3], q: 5 };

$(document).ready(()=>{
     $("#logo").on('click',()=>{
          $(".main").show();
          $("#content").hide();
          $("#notif-content").hide();
     });
     $("#javascript").on('click',()=>renderContents(javascript));
     $("#html").on('click', ()=>renderContents(html));
     $("#css").on('click', ()=>renderContents(css));
     $("#notification").on('click',()=>renderNotification(guest));
     $("#guest").on('click', () => renderGuest());
});

function renderExercice(obj,i){
     // var finish = (n) => { guest.javascript.ex.push(n) };
     var $div = `
     <div class="exercice">
          <div class="title"><h3>Exercice `+ i + `</h3> <span id="finish` + i + `" class="finish" onclick="guest.javascript.ex.push(`+i+`);"> finish </span> <span style="cursor:pointer;" onclick="$('#ex`+i+`').toggle()"> <img src='./img/hide.png'> </span></div>
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

function renderContents(obj){
     $(".main").hide();
     $("#notif-content").hide();
     var content = $("#content").first();
     content.show();
     content.html("");
     for(var i = 1; i <= 5; i++){
          content.append(renderExercice(obj,i));
     }
     content.append(renderQuiz(1));
}

function renderNotification(guest){
     var notification = $("#notif-content").first();
     var addClass = (obj, i) =>{
          if(i === 'Q'){
               if(obj.q > 2){
                    return "green"
               }else if(obj.q < 3){
                    return "red"
               }
          }else if(obj.ex.indexOf(i) != -1){
               return "green"
          } 
               
     }
     var quiz = (obj) => "Q: " + obj.q + "/5";
     var $div = `
          <div class="js-notification notif-item"> Javascript &nbsp;
               <table>
               <tr>
                    <td class=` + addClass(guest.javascript,1) + `>1</td>
                    <td class=` + addClass(guest.javascript,2) + `>2</td>
                    <td class=` + addClass(guest.javascript,3) + `>3</td>
                    <td class=` + addClass(guest.javascript,4) + `>4</td>
                    <td class=` + addClass(guest.javascript,5) + `>5</td>
                    <td class=` + addClass(guest.javascript,'Q') + `>`+quiz(guest.javascript)+`</td>
               </tr>
               </table>
          </div>
          <br>
          <div class="html-notification notif-item"> HTML &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <table>
               <tr>
                    <td class=` + addClass(guest.html, 1) + `>1</td>
                    <td class=` + addClass(guest.html, 2) + `>2</td>
                    <td class=` + addClass(guest.html, 3) + `>3</td>
                    <td class=` + addClass(guest.html, 4) + `>4</td>
                    <td class=` + addClass(guest.html, 5) + `>5</td>
                    <td class=` + addClass(guest.html, 'Q') + `>` + quiz(guest.html) +`</td>
               </tr>
               </table>
          </div>
          <br>
          <div class="css-notification notif-item" > Css &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <table>
               <tr>
                    <td class=` + addClass(guest.css, 1) + `>1</td>
                    <td class=` + addClass(guest.css, 2) + `>2</td>
                    <td class=` + addClass(guest.css, 3) + `>3</td>
                    <td class=` + addClass(guest.css, 4) + `>4</td>
                    <td class=` + addClass(guest.css, 5) + `>5</td>
                    <td class=` + addClass(guest.css, 'Q') + `>` + quiz(guest.css) +`</td>
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