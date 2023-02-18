def elf_index_with_most_calories(text_input: str) -> int:
    # we're going to do one iteration. so while we're parsing, we'll keep track
    # of the max index and amount.
    max_elf_index = -1
    max_elf_amount = -1

    current_index = 0
    current_amount = 0
    for line in text_input.split('\n'):
        if line == '':
            if current_amount > max_elf_amount:
                max_elf_amount = current_amount
                max_elf_index = current_index
            current_index += 1
            current_amount = 0
        else:
            calories = int(line)
            current_amount += calories

    if current_amount > max_elf_amount:
        max_elf_amount = current_amount
        max_elf_index = current_index
    print(max_elf_amount)
    return max_elf_index

# oof, so that solution wasn't that flexible. writing another for top three
def top_three_elf_calories_sum(text_input: str) -> int:
    elf_calorie_totals = [0]
    curr_index = 0
    for line in text_input.split('\n'):
        if line == '':
            curr_index += 1
            elf_calorie_totals.append(0)
        else:
            calories = int(line)
            elf_calorie_totals[curr_index] += calories
    return sum(sorted(elf_calorie_totals)[-1:-4:-1])

if __name__ == '__main__':
    with open('example-1', 'r') as example_file:
        example_input = example_file.read()

    elf_index = elf_index_with_most_calories(example_input)
    assert(elf_index + 1 == 4)

    with open('input-1', 'r') as input_file:
        actual_input = input_file.read()
    print(elf_index_with_most_calories(actual_input) + 1)
    print(top_three_elf_calories_sum(actual_input))
