def sol_1(inp: str):
    cards = inp.split('\n')
    cards_original_and_bets = list(
        map(lambda c: c.split(':').pop().split('|'), cards))

    total_points = 0
    for card_tuple in cards_original_and_bets:
        card_int_tuple = [list(map(int, card.split()))
                          for card in card_tuple]
        occurrences = -1
        for card in card_int_tuple[1]:
            if card in card_int_tuple[0]:
                occurrences += 1
        if occurrences >= 0:
            total_points += 2 ** occurrences
    return total_points


def sol_2(inp: str):
    cards = inp.split('\n')
    cards_original_and_bets = list(
        map(lambda c: c.split(':').pop().split('|'), cards))

    recurrent_cards = {i: 1 for i, _ in enumerate(cards_original_and_bets)}
    for i, card_tuple in enumerate(cards_original_and_bets):
        card_int_tuple = [list(map(int, card.split()))
                          for card in card_tuple]
        occurrences = 0
        for card in card_int_tuple[1]:
            if card in card_int_tuple[0]:
                occurrences += 1
                recurrent_cards[i +
                                occurrences] = recurrent_cards.get(i+occurrences, 0) + recurrent_cards.get(i, 0)
    return sum(recurrent_cards.values())


def test_1():
    assert sol_1("""Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11""") == 13


def test_2():
    assert sol_2("""Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11""") == 30


if __name__ == '__main__':
    test_1()
    test_2()
    with open('day_4_input.txt', 'r') as f:
        inp = f.read()
        print(sol_1(inp))
        print(sol_2(inp))
