var inquirer = require("inquirer");

var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");

var cards = []

function start() {
    
    inquirer
        .prompt([
            {
                type: "list",
                message: "Do you want to make a Basic or Cloze Flashcard?",
                choices: ["Basic Card", "Cloze Card"],
                name: "type"
            },
            {
                type: "confirm",
                message: "Are you sure: ",
                name: "confirm",
                default: true
            }
        ])
        .then(function (response) {
            if (!response.confirm) {
                start();
            }

            else if (response.type === 'Basic Card') {
                createBasic();
            }

            else if (response.type === 'Cloze Card') {
                createCloze();
            }
        })
        .catch(function (error){
            console.log("Error: "+error)
        })
}

function createBasic() {
    console.log("You are now creating a Basic Flashcard...");
    inquirer
        .prompt([
            {
                type: "input",
                message: "What do you want the question to be?",
                name: "front"
            },
            {
                type: "input",
                message: "What do you want the answer to be?",
                name: 'back'
            },
            {
                type: "confirm",
                message: "Are you sure: ",
                name: 'confirm',
                default: true
            }

        ])
        .then(function (basicResponse) {
            if (!basicResponse.confirm) {
                createBasic();
            }
            else {
              
                var c = BasicCard.BasicCard(basicResponse.front, basicResponse.back);
                cards.push(c);
                printCards();
                start();
                
            }
        })
        .catch(function (error){
            console.log("Error: "+error)
        })
}

function createCloze() {
    console.log("You are now creating a Cloze Flashcard...");
    inquirer
        .prompt([
            {
                type: "input",
                message: "What do you want your full text to be?",
                name: "fullText"
            },
            {
                type: "input",
                message: "What is/are your cloze word(s)?",
                name: 'cloze'
            },
            {
                type: "confirm",
                message: "Are you sure: ",
                name: "confirm",
                default: true
            }
        ])
        .then(function (clozeResponse) {
            if (!clozeResponse.confirm) {
                createCloze()
            }
            else {
                cards.push(ClozeCard.ClozeCard(clozeResponse.fullText, clozeResponse.cloze))
                printCards();
                start();
            }
        })
        .catch(function (error){
            console.log("Error: "+error)
        })
}

function printCards(){
    console.log("You have the following card(s) in your inventory now...")
    
    for (var i = 0; i < cards.length; i++){
        console.log("----------------------------------");
        console.log(cards[i]);
        console.log("----------------------------------");
    }
}


start();