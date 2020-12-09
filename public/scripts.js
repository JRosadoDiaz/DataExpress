// const url ="http://localhost:3000/api";
// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     });
let total = 10;

const question1Data = [
    { answer: "Cheese", num: 2 },
    { answer: "Pepperoni", num: 3 },
    { answer: "Sausage", num: 4 },
    { answer: "Crust", num: 1 }
];

const question2Data = [
    { answer: "Sage", num: 1 },
    { answer: "Rosemary", num: 4 },
    { answer: "Thyme", num: 5 }
];

const question3Data = [
    { answer: "Yes", num: 2 },
    { answer: "No", num: 2 },
    { answer: "Only on Mondays", num: 6 }
];


function fillCanvas(elementId, data) {
    function drawBar(start, length) {
        context.strokeStyle = "#fff";
        context.beginPath();
        context.moveTo(0, start);
        context.lineTo(length, start);
        context.lineTo(length, start+20);
        context.lineTo(0, start+20);
        context.fill();
    }
    
    const canvas = document.getElementById(elementId);
    const context = canvas.getContext("2d");
    canvas.height = data.length*50;

    for(i = 0; i < data.length; i++) {
        let percent = data[i].num / total;
        context.fillStyle = "#fff";
        context.font = "16px Arial";
        context.fillText(data[i].answer, 0, (18+(i*50)));
        drawBar((22+(i*50)), (canvas.width * percent));
    }  
}

// Question 1
fillCanvas("question_1", question1Data);

// Question 2
fillCanvas("question_2", question2Data);

// Question 3
fillCanvas("question_3", question3Data);