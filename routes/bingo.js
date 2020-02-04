var express = require('express');
var router = express.Router();

var lodash = require('lodash');

let bingoOrder;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('This is the start of a bingo site');
})

    .get('/start', function (req, res, next) {
        let amount = 25;
        let bingoRange = lodash.range(100)
        let bingoNumbers = lodash.shuffle(bingoRange);
        let bingoCard = bingoNumbers.slice(0, amount);
        bingoOrder = lodash.shuffle(bingoCard);

        console.log(bingoCard)
        res.json(bingoCard)
    })

    .get('/call', function (req, res, next) {
        let number = bingoOrder.pop();

        console.log(bingoOrder)
        res.json(number);
        return;
    })

    .get('/call/:num/:testnum', function (req, res, next) {
        testNumber = req.params.testnum
        number = req.params.num

        if (number === testNumber) {
            let nextNumber = bingoOrder.pop();

            res.json(nextNumber);
            return;
        }
        res.json('error');
    }
    )


module.exports = router;
