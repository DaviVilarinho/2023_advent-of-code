const fs = require('fs');
const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const getCamelCardRank = (hand) => {
    let cardOccurence = {};
    for (card of hand) {
        if (cardOccurence[card]) {
            cardOccurence[card] += 1;
        } else {
            cardOccurence[card] = 1;
        }
    }
    if (Object.keys(cardOccurence).length == 1) {
        return 6;
    }
    if (Object.keys(cardOccurence).filter(card => cardOccurence[card] == 4).length > 0) {
        return 5;
    }
    if (Object.keys(cardOccurence).filter(card => cardOccurence[card] == 3).length == 1 &&
        Object.keys(cardOccurence).filter(card => cardOccurence[card] == 2).length == 1) {
        return 4;
    }
    if (Object.keys(cardOccurence).filter(card => cardOccurence[card] >= 3).length == 1) {
        return 3;
    }
    if (Object.keys(cardOccurence).filter(card => cardOccurence[card] == 2).length == 2) {
        return 2;
    }
    if (Object.keys(cardOccurence).filter(card => cardOccurence[card] == 2).length == 1) {
        return 1;
    }
    return 0;
}

const cardToValueBase = (card) => {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        case 'T':
            return 10;
        default:
            return Number(card);
    }
}

const compareFirstAndSecond = (first, second) => {
    if (first > second) {
        return -1;
    } else if (first < second) {
        return 1;
    }
    return 0;
}

const winnerByMaxCard = (hand, otherHand, cardToValue) => {
    for (let i = 0; i < hand.length; i++) {
        let handMax = cardToValue(hand[i]);
        let otherHandMax = cardToValue(otherHand[i]);
        let result = compareFirstAndSecond(handMax, otherHandMax);
        if (result != 0) {
            return result;
        }
    }
    return 0;
}

const cardToValueWithJoker = (card) => {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 1;
        case 'T':
            return 10;
        default:
            return Number(card);
    }
}

const getCamelCardWinner = (hand, otherHand) => {
    let handRank = getCamelCardRank(hand);
    let otherHandRank = getCamelCardRank(otherHand);
    if (handRank > otherHandRank) {
        return -1;
    } else if (handRank < otherHandRank) {
        return 1;
    }
    return winnerByMaxCard(hand, otherHand, cardToValueBase);
}

const getCamelCardWinnerWithJoker = (hand, otherHand) => {

    let jokerHand = undefined;
    if (hand.includes('J')) {
        jokerHand = CARDS.map(card => hand.replaceAll('J', card)).sort((hand1, hand2) => {
            return getCamelCardWinner(hand1, hand2);
        })[0]
    }
    let jokerOtherHand = undefined;
    if (otherHand.includes('J')) {
        jokerOtherHand = CARDS.map(card => otherHand.replaceAll('J', card)).sort((hand1, hand2) => {
            return getCamelCardWinner(hand1, hand2);
        })[0];
    }
    let handRank = getCamelCardRank(jokerHand ?? hand);
    let otherHandRank = getCamelCardRank(jokerOtherHand ?? otherHand);
    if (handRank > otherHandRank) {
        return -1;
    } else if (handRank < otherHandRank) {
        return 1;
    }
    return winnerByMaxCard(hand, otherHand, cardToValueWithJoker);
}

const generateHands = (cards, handSize) => {
    if (!handSize) {
        return [[]];
    }
    if (!cards.length) {
        return [];
    }
    const firstCard = cards[0];
    const restCards = cards.slice(1);
    const handsWithFirstCard = generateHands(restCards, handSize - 1).map(hand => [firstCard, ...hand]);
    const handsWithoutFirstCard = generateHands(restCards, handSize);
    return [...handsWithFirstCard, ...handsWithoutFirstCard];
}

const getAllPossible5Hands = () => {
    return generateHands(CARDS, 5).map(hand => hand.join(''));
}

const sol1 = (input) => {
    let lines = input.split('\n');
    lines.pop();
    let games = lines.map(line =>
        line.trim().split(' ')).map(line => {
            return {
                hand: line[0],
                bet: Number(line.pop()),
                waysOfWinning: 0,
                rank: getCamelCardRank(line[0])
            }
        });
    for (let game of games) {
        for (let everyPossibleWay of getAllPossible5Hands()) {
            if (getCamelCardWinner(everyPossibleWay, game.hand) == 1) {
                game.waysOfWinning += 1;
            }
        }
    }
    let sortedGames = games.sort((game1, game2) => {
        return getCamelCardWinner(game1.hand, game2.hand);
    }).reverse();
    let rank = 1;
    let totalWinnings = rank * sortedGames[0].bet;
    for (let i = 1; i < sortedGames.length; i++) {
        if (getCamelCardWinner(sortedGames[i].hand, sortedGames[i - 1].hand) == 0) {
            totalWinnings += rank * sortedGames[i].bet;
        } else {
            rank += 1;
            totalWinnings += rank * sortedGames[i].bet;
        }
    }
    return totalWinnings;
}

const sol2 = (input) => {
    let lines = input.split('\n');
    lines.pop();
    let games = lines.map(line =>
        line.trim().split(' ')).map(line => {
            return {
                hand: line[0],
                bet: Number(line.pop()),
                waysOfWinning: 0,
                rank: getCamelCardRank(line[0])
            }
        });
    for (let game of games) {
        for (let everyPossibleWay of getAllPossible5Hands()) {
            if (getCamelCardWinnerWithJoker(everyPossibleWay, game.hand) == 1) {
                game.waysOfWinning += 1;
            }
        }
    }
    let sortedGames = games.sort((game1, game2) => {
        return getCamelCardWinnerWithJoker(game1.hand, game2.hand);
    }).reverse();
    let rank = 1;
    let totalWinnings = rank * sortedGames[0].bet;
    for (let i = 1; i < sortedGames.length; i++) {
        if (getCamelCardWinnerWithJoker(sortedGames[i].hand, sortedGames[i - 1].hand) == 0) {
            totalWinnings += rank * sortedGames[i].bet;
        } else {
            rank += 1;
            totalWinnings += rank * sortedGames[i].bet;
        }
    }
    return totalWinnings;
}


const test = () => {
    console.log(getCamelCardRank('32T3K'.split('')), 1);
    console.log(getCamelCardRank('KK677'.split('')), 2);
    console.log(getCamelCardRank('KTJJT'.split('')), 2);
    console.log(getCamelCardRank('T55J5'.split('')), 3);
    console.log(getCamelCardRank('QQQJA'.split('')), 3);
    console.log(sol1(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`), 6440);
    //console.log(`Part 1: ${sol1(fs.readFileSync('day_7_input.txt', 'utf8'))}`);
    console.log(getCamelCardWinnerWithJoker('AAAAJ', 'KKKKT'), -1);
    console.log(getCamelCardWinnerWithJoker('T55J5', 'KTJJT'), 1);
    console.log(getCamelCardWinnerWithJoker('T55J5', 'QQQJA'), 1);
    console.log(getCamelCardWinnerWithJoker('QQQJA', 'KTJJT'), 1);
    console.log(getCamelCardWinnerWithJoker('KTJJT', 'T55J5'), -1);
    console.log(sol2(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`), 5905);
    console.log(`Part 2: ${sol2(fs.readFileSync('day_7_input.txt', 'utf8'))}`);
}

test()