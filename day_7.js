const fs = require('fs');

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

const cardToValue = (card) => {
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

const winnerByMaxCard = (hand, otherHand) => {
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

const getCamelCardWinner = (hand, otherHand) => {
    let handRank = getCamelCardRank(hand);
    let otherHandRank = getCamelCardRank(otherHand);
    if (handRank > otherHandRank) {
        return -1;
    } else if (handRank < otherHandRank) {
        return 1;
    }
    return winnerByMaxCard(hand, otherHand);
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
    const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
    return generateHands(cards, 5);
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
    console.log(`Part 1: ${sol1(fs.readFileSync('day_7_input.txt', 'utf8'))}`);
}

test()