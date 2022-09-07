console.log("Hi there!");

//#region initial popup

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

modal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//#region QUIZ
var no_btn = document.getElementsByClassName("button")[1];
var no_selected = document.getElementById("no-selected");
var initial_popup = document.getElementById("page-entry-popup");

no_btn.onclick = function(event) {
  initial_popup.style.display = "none";
  no_selected.style.display = "block";
  console.log('"no" button clicked.');

  setTimeout(function() {modal.style.display = "none";}, 1700);
}

var yes_btn = document.getElementsByClassName("button")[0];
var yes_selected = document.getElementById("yes-selected");
var quiz = document.getElementById("quiz");

yes_btn.onclick = function(event) {
  console.log('"yes" button clicked.');
  initial_popup.style.display = "none";
  yes_selected.style.display = "block";
  quiz.style.display = "block";

  var questions = [{
    question: "What are your dietary preferences (if any)? Select all that apply.",
    choices: ["Vegan", "Vegetarian", "Dairy-Free", "Gluten-Free", "Nut Free/Allergy"],
  }, {
    question: "If you had to choose one, sweet or savory foods?",
    choices: ["Sweet!", "Savory!"],
  }, {
    question: "Which is your favorite meal of the day?",
    choices: ["Breakfast", "Lunch", "Dinner"],
  }, {
    question: "Would you be interested in high-protein recipes?", //you can change this later
    choices: ["Yes!", "No, not specifically."],
  }, {
    question: "Are you more of a snacker or mainly meals person?",
    choices: ["Snacks all the way.", "Both!", "I prefer a hearty meal."],
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
    
    // Display initial question
    displayNext();
    
    // Click handler for the 'next' button
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // Click handler for the 'prev' button
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // Click handler for the 'Start Over' button
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    
    // Creates and returns the div that contains the questions and 
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // Controls display of 'prev' button
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayFinal();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // synthesizes answer choices and returns a paragraph element to be displayed
    function displayFinal() {
      var result = $('<p>',{id: 'question'});
            
      result.append('You finshed the quiz!!!');
      return result;
    }

      //inject html Qs and As
    //make sure they are radio buttons
  //if user tries to go next without clicking any answer, alert the user (copy codepen code)

  //user then clicks next, so on next click 
  //make the prev button visible
  //inject new html Qs and As
      //make sure they are radio buttons
  //if user tries to go next without clicking any answer, alert the user (copy codepen code)

  //user can click next or prev
    //if next is clicked -> do this (inect next question html)
    //if prev is clicked -> do this (inject previous html, + restore new value)
}

//functions needed: displayNext(), displayPrev(), storeAnswer(), ensureResponse() - makes sure user gave an answer 
//#endregion
//#endregion

//#region search side bar
function openSearchNav() {
  // document.getElementsByClassName("translucent-layer")[0].style.display = "inherit";
  document.getElementsByClassName("translucent-layer")[0].style.width = "100%";
  document.getElementsByClassName("translucent-layer")[0].style.height = "100%";

  document.getElementById("my-search-nav").style.width = "430px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  // document.getElementsByClassName("translucent-layer")[0].style.display = "none";
  document.getElementsByClassName("translucent-layer")[0].style.width = "0";
  document.getElementsByClassName("translucent-layer")[0].style.height = "0";

  document.getElementById("my-search-nav").style.width = "0";
}

function search_entered() {
  // code that searches recipes based on users input + stores it in the "recent searches" array 
  console.log("Search entered.");
}

// function search_clicked() {
//   //code that presents the search bar on the side
//   openSearchNav();
//   console.log("Search clicked.");
// }

//#endregion

//#region hover over menu/navigation bar 
function mouseOver(menu_item) {
  //changes characteristics of selected list item 
  menu_item.style.color = "#502F37";
  menu_item.style.fontWeight = "bold";
  console.log("mouse over occured.");
  }

function mouseOut(menu_item) {
  //reverts characteristics of list item once no longer selected
  menu_item.style.color = "#9B5D31";
  menu_item.style.fontWeight = "normal";
  console.log("mouse out occured.");
}

let searchIcon = document.getElementsByClassName("search_icon")[0];
searchIcon.onmouseover = function searchIconSelected() { this.style.backgroundColor = "#502F37";
};
searchIcon.onmouseout = function searchIconUnselected() { this.style.backgroundColor = "#9B5D31";
};

//#endregion

