def sol_1(inp: str):
    inp_blocks = inp.split('\n\n')
    seeds = [int(seed) for seed in inp_blocks[0].split(':').pop().split()]

    ranges = []
    for block in inp_blocks[1:]:
        current_range = []
        for range_str in block.split('\n')[1:]:
            if range_str == '':
                continue
            destination_start, origin_start, length = map(
                int, range_str.split())
            current_range += [(origin_start,
                               origin_start + length - 1, destination_start - origin_start)]
        current_range.sort()
        ranges += [current_range]

    min_location = float('inf')
    for seed in seeds:
        location = seed
        for rng in ranges:
            for minimum, maximum, jump in rng:
                if location < minimum:
                    break
                if location <= maximum:
                    location += jump
                    break
        min_location = min(min_location, location)

    return min_location


def test_1():
    assert sol_1("""seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4""") == 35


def test_2():
    assert sol_2("""seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4""") == 46


if __name__ == '__main__':
    test_1()
    test_2()
    with open('day_5_input.txt', 'r') as f:
        inp = f.read()
        print(sol_1(inp))
        print(sol_2(inp))
