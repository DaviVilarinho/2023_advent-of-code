import re
from functools import reduce


def game_condition(game_dict: dict):
    return game_dict.get('red', 0) <= 12 and game_dict.get('green', 0) <= 13 and game_dict.get('blue', 0) <= 14


def parse_games(inp: str):
    games = {}
    for game_string in inp.split('\n'):
        game, rest = game_string.split(':')
        _, game_id = game.split(' ')
        game_id = int(game_id)
        games[game_id] = {}
        for set_colors in rest.split(';'):
            games[game_id][set_colors] = {}
            for color_str in set_colors.split(','):
                number, color = color_str.lower().strip().split(' ')
                games[game_id][set_colors][color] = games[game_id][set_colors].get(
                    color, 0) + int(number)
    return games


def sol_1(inp: str):
    games = parse_games(inp)
    id_sum = 0
    for id, sets in games.items():
        id_sum += id * \
            reduce(lambda acc, set_dict: acc and game_condition(
                set_dict), sets.values(), True)
    return id_sum


def to_the_power(game: dict):
    return reduce(lambda x, y: x * y, game.values(), 1)


def sol_2(inp: str):
    games = parse_games(inp)

    power_sum = 0
    for id, sets in games.items():
        min_game = {}
        for dicts in sets.values():
            for color, count in dicts.items():
                if min_game.get(color, 0) < count:
                    min_game[color] = count

        power_sum += to_the_power(min_game)
    return power_sum


def test_1():
    assert sol_1("""Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green""") == 8


def test_2():
    assert sol_2("""Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green""") == 2286


if __name__ == "__main__":
    test_1()
    test_2()
    with open('day_2_input.txt', 'r') as f:
        inp = f.read()
        print(sol_1(inp))
        print(sol_2(inp))
