def is_symbol(ch):
    return not ch.isnumeric() and ch != '.'


def find_number_by_grow(matrix_line, j):
    number_start = j
    number_end = j + 1
    while number_start > 0 and matrix_line[number_start - 1].isnumeric():
        number_start -= 1
    while number_end < len(matrix_line) and matrix_line[number_end].isnumeric():
        number_end += 1
    return int(''.join(matrix_line[number_start:number_end])), number_start, number_end


def sol_1(inp: str):
    sum_adjacent = 0
    matrix_inp = list(map(list, inp.split('\n')))
    for i in range(len(matrix_inp)):
        for j in range(len(matrix_inp[i])):
            if not is_symbol(matrix_inp[i][j]):
                continue
            for k in range(i - 1, i + 2):
                for l in range(j - 1, j + 2):
                    if not (k < 0 or l < 0 or k >= len(matrix_inp) or l >= len(matrix_inp[i])) and not (k == i and l == j):
                        try:
                            number, number_start, number_end = find_number_by_grow(
                                matrix_inp[k], l)
                            sum_adjacent += number
                            for m in range(number_start, number_end):
                                matrix_inp[k][m] = '.'
                        except ValueError:
                            pass
    return sum_adjacent


def is_gear(ch):
    return ch == '*'


def sol_2(inp: str):
    sum_gear_ratios = 0
    matrix_inp = list(map(list, inp.split('\n')))
    for i in range(len(matrix_inp)):
        for j in range(len(matrix_inp[i])):
            if not is_gear(matrix_inp[i][j]):
                continue
            gear_ratio = 1
            multiplied = 0
            for k in range(i - 1, i + 2):
                for l in range(j - 1, j + 2):
                    if not (k < 0 or l < 0 or k >= len(matrix_inp) or l >= len(matrix_inp[i])) and not (k == i and l == j):
                        try:
                            number, number_start, number_end = find_number_by_grow(
                                matrix_inp[k], l)
                            gear_ratio *= number
                            multiplied += 1
                            for m in range(number_start, number_end):
                                matrix_inp[k][m] = '.'
                        except ValueError:
                            pass
            if multiplied == 2:
                sum_gear_ratios += gear_ratio
    return sum_gear_ratios


def test_1():
    inp = """467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598.."""
    assert sol_1(inp) == 4361


def test_2():
    inp = """467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598.."""
    assert sol_2(inp) == 467835


if __name__ == "__main__":
    test_1()
    test_2()
    with open('day_3_input.txt') as f:
        inp = f.read()
        print(sol_1(inp))
        print(sol_2(inp))
