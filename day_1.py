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

def sum_calibration_values(input_text: str):
    return sum(list(map(get_calibration_value, input_text.split('\n'))))

def test():
    input_text = """1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet"""
    assert sum_calibration_values(input_text) == 142
    print("passou")

if __name__ == '__main__':
    #test()
    with open('day_1_input.txt', 'r') as input_file:
        print(sum_calibration_values(input_file.read()))
