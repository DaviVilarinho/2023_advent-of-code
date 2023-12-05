# the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

def get_calibration_value(input_line: str):
    only_numbers = 0
    for i in input_line:
        try:
            only_numbers += int(i) * 10
            break
        except ValueError:
            pass
    for i in reversed(input_line):
        try:
            only_numbers += int(i)
            break
        except ValueError:
            pass

    return only_numbers


STR_TO_NUM = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}


def is_str_number(inp: str):
    return STR_TO_NUM.get(inp.lower(), -1)


def get_first_number(inp: str):
    for i, ch in enumerate(inp):
        for j in range(i):
            number_represented = is_str_number(inp[j:i])
            if number_represented >= 0:
                return number_represented
        try:
            return int(ch)
        except ValueError:
            pass

    return -1


def get_last_number(inp: str):
    leninp = len(inp)
    i = leninp - 1
    while i >= 0:
        for j in range(leninp - i):
            number_represented = is_str_number(inp[i:(leninp-j)])
            if number_represented >= 0:
                return number_represented
        try:
            return int(inp[i])
        except ValueError:
            pass
        i -= 1
    return -1


def get_calibration_value_2(input_line: str):
    fst = get_first_number(input_line)
    fst = fst if fst >= 0 else 0
    snd = get_last_number(input_line)
    snd = snd if snd >= 0 else 0
    return fst * 10 + snd


def sum_calibration_values(input_text: str):
    return sum(list(map(get_calibration_value, input_text.split('\n'))))


def sum_calibration_values_2(input_text: str):
    return sum(list(map(get_calibration_value_2, input_text.split('\n'))))


def test_pt1():
    input_text = """1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet"""
    assert sum_calibration_values(input_text) == 142
    print("passou")


def test_pt2():
    input_text = """two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen"""
    assert sum_calibration_values_2(input_text) == 281
    print("passou")


if __name__ == '__main__':
    #    test_pt2()
    with open('day_1_input.txt', 'r') as input_file:
        inputstr = input_file.read()
        print(sum_calibration_values(inputstr))
        print(sum_calibration_values_2(inputstr))
