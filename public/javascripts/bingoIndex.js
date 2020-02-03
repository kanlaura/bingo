// buttons
const getCard = document.getElementById('getCard');
const getNumber = document.getElementById('getNumber');
const numBox = document.getElementsByClassName('numDiv');

// output fields
const bingoCard = document.getElementById('bingoCard');
const genNum = document.getElementById('genNum');
const errorField = document.getElementById('errorField');

// eventListeners
getCard.addEventListener('click', getNumbers);
getNumber.addEventListener('click', generateNumber);
bingoCard.addEventListener('click', checkNumber);

function getNumbers() {
    bingoCard.innerHTML = "";
    fetch('http://localhost:3000/api/bingo/start')
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            let numbers = json;
            console.log(numbers)

            for (let i = 0; i < numbers.length; i++) {
                let newDiv = document.createElement('div')
                newDiv.classList.add("numDiv");
                newDiv.innerHTML += numbers[i]

                bingoCard.appendChild(newDiv);
            }
        })
}

function generateNumber() {
    fetch('http://localhost:3000/api/bingo/call')
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            let call = json;

            console.log(call)
            genNum.innerHTML = `${call}`
        })
};

function checkNumber(event) {
    let testNumber = genNum.innerHTML
    let number = event.target.innerText

    console.dir(number)

    fetch(`http://localhost:3000/api/bingo/call/:${number}/:${testNumber}`)
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            let call = json;

            if (json == 'error') {
                errorField.innerHTML = `<p>Try again!!</p>`;
            } else {
                errorField.innerHTML = ``;
                genNum.innerHTML = `${call}`
                event.target.style.backgroundColor = "lightblue"
            }
        })
};
