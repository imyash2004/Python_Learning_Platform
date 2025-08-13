import type { Tutorial } from '../types/index';

export const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Python Basics: Variables and Data Types',
    description: 'Learn about Python variables, strings, numbers, and basic data types.',
    content: `# Python Variables and Data Types

Welcome to your first Python lesson! In this tutorial, you'll learn about variables and the basic data types in Python.

## What are Variables?

Variables are containers that store data values. In Python, you don't need to declare the type of a variable - Python figures it out automatically!

## Basic Data Types

### 1. Strings (Text)
Strings are sequences of characters enclosed in quotes:

\`\`\`python
name = "Alice"
message = 'Hello, World!'
\`\`\`

### 2. Numbers
Python has two main numeric types:
- **Integers**: Whole numbers like 42, -17, 0
- **Floats**: Decimal numbers like 3.14, -2.5, 0.0

\`\`\`python
age = 25          # Integer
height = 5.8      # Float
\`\`\`

### 3. Booleans
Boolean values represent True or False:

\`\`\`python
is_student = True
is_graduated = False
\`\`\`

## Variable Naming Rules

1. Must start with a letter or underscore
2. Can contain letters, numbers, and underscores
3. Case-sensitive (age and Age are different)
4. Cannot use Python keywords (like if, for, while)

## Try It Yourself!

Run the example code to see variables in action. Try changing the values and see what happens!`,
    codeExample: `# Variables and Data Types Example
name = "Python Learner"
age = 20
height = 5.7
is_learning = True

print("Name:", name)
print("Age:", age)
print("Height:", height, "feet")
print("Currently learning:", is_learning)

# You can change variable values
age = age + 1
print("Next year I'll be:", age)

# Python automatically determines the type
print("Type of name:", type(name))
print("Type of age:", type(age))
print("Type of height:", type(height))
print("Type of is_learning:", type(is_learning))`,
    difficulty: 'beginner',
    estimatedTime: 15,
    order: 1
  },
  {
    id: '2',
    title: 'Working with Lists',
    description: 'Discover Python lists - how to create, modify, and work with collections of data.',
    content: `# Python Lists

Lists are one of the most useful data types in Python. They allow you to store multiple items in a single variable.

## Creating Lists

Lists are created using square brackets:

\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
\`\`\`

## Accessing List Items

You can access items using their index (starting from 0):

\`\`\`python
fruits = ["apple", "banana", "orange"]
print(fruits[0])  # "apple"
print(fruits[1])  # "banana"
print(fruits[-1]) # "orange" (last item)
\`\`\`

## Modifying Lists

Lists are mutable, meaning you can change them:

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("orange")      # Add to end
fruits.insert(1, "grape")    # Insert at position
fruits.remove("banana")      # Remove by value
\`\`\`

## Useful List Methods

- \`len(list)\` - Get the length
- \`list.sort()\` - Sort the list
- \`list.reverse()\` - Reverse the list
- \`item in list\` - Check if item exists

## List Slicing

You can get parts of a list using slicing:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(numbers[1:4])  # [2, 3, 4]
print(numbers[:3])   # [1, 2, 3]
print(numbers[2:])   # [3, 4, 5]
\`\`\``,
    codeExample: `# Working with Lists
fruits = ["apple", "banana", "orange", "grape"]

print("Original list:", fruits)
print("First fruit:", fruits[0])
print("Last fruit:", fruits[-1])
print("Number of fruits:", len(fruits))

# Adding items
fruits.append("kiwi")
print("After adding kiwi:", fruits)

# Inserting at specific position
fruits.insert(1, "mango")
print("After inserting mango:", fruits)

# Removing items
fruits.remove("banana")
print("After removing banana:", fruits)

# List slicing
print("First 3 fruits:", fruits[:3])
print("Last 2 fruits:", fruits[-2:])

# Checking if item exists
if "apple" in fruits:
    print("Apple is in the list!")

# Sorting
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print("Original numbers:", numbers)
numbers.sort()
print("Sorted numbers:", numbers)`,
    difficulty: 'beginner',
    estimatedTime: 20,
    order: 2
  },
  {
    id: '3',
    title: 'Control Flow: If Statements',
    description: 'Learn how to make decisions in your code using if, elif, and else statements.',
    content: `# Control Flow: If Statements

If statements allow your program to make decisions and execute different code based on conditions.

## Basic If Statement

\`\`\`python
age = 18
if age >= 18:
    print("You are an adult!")
\`\`\`

## If-Else Statement

\`\`\`python
temperature = 25
if temperature > 30:
    print("It's hot outside!")
else:
    print("It's not too hot.")
\`\`\`

## If-Elif-Else Statement

For multiple conditions:

\`\`\`python
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## Comparison Operators

- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

## Logical Operators

- \`and\` - Both conditions must be True
- \`or\` - At least one condition must be True
- \`not\` - Reverses the condition

\`\`\`python
age = 20
has_license = True

if age >= 18 and has_license:
    print("You can drive!")
\`\`\`

## Nested If Statements

You can put if statements inside other if statements:

\`\`\`python
weather = "sunny"
temperature = 25

if weather == "sunny":
    if temperature > 20:
        print("Perfect day for a picnic!")
    else:
        print("Sunny but a bit cold.")
\`\`\``,
    codeExample: `# Control Flow Examples
age = 20
has_license = True
score = 87

# Basic if statement
if age >= 18:
    print("You are an adult!")

# If-else statement
if score >= 90:
    print("Excellent work!")
else:
    print("Good job, keep improving!")

# If-elif-else chain
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")

# Logical operators
if age >= 18 and has_license:
    print("You can drive a car!")
elif age >= 16:
    print("You can get a learner's permit!")
else:
    print("Too young to drive.")

# Checking multiple conditions
weather = "sunny"
temperature = 25

if weather == "sunny" and temperature > 20:
    print("Perfect weather for outdoor activities!")
elif weather == "rainy":
    print("Good day to stay inside and code!")
else:
    print("Check the weather and dress appropriately.")

# Using 'in' operator
favorite_colors = ["blue", "green", "red"]
user_color = "blue"

if user_color in favorite_colors:
    print(f"{user_color} is one of my favorite colors!")
else:
    print(f"{user_color} is not in my favorites.")`,
    difficulty: 'beginner',
    estimatedTime: 25,
    order: 3
  },
  {
    id: '4',
    title: 'Loops: For and While',
    description: 'Master repetition in Python with for loops and while loops.',
    content: `# Loops in Python

Loops allow you to repeat code multiple times. Python has two main types of loops: for loops and while loops.

## For Loops

For loops are used to iterate over sequences (like lists, strings, or ranges).

### Looping through a list:
\`\`\`python
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

### Using range():
\`\`\`python
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):  # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8
    print(i)
\`\`\`

### Looping through strings:
\`\`\`python
word = "Python"
for letter in word:
    print(letter)
\`\`\`

## While Loops

While loops continue as long as a condition is True:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1  # Same as count = count + 1
\`\`\`

## Loop Control Statements

### break - Exit the loop early:
\`\`\`python
for i in range(10):
    if i == 5:
        break
    print(i)  # Prints 0, 1, 2, 3, 4
\`\`\`

### continue - Skip to next iteration:
\`\`\`python
for i in range(5):
    if i == 2:
        continue
    print(i)  # Prints 0, 1, 3, 4
\`\`\`

## Nested Loops

You can put loops inside other loops:

\`\`\`python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})")
\`\`\`

## Common Patterns

### Counting items:
\`\`\`python
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total += num
print(total)  # 15
\`\`\`

### Finding items:
\`\`\`python
names = ["Alice", "Bob", "Charlie"]
search_name = "Bob"
found = False
for name in names:
    if name == search_name:
        found = True
        break
print(f"Found {search_name}: {found}")
\`\`\``,
    codeExample: `# Loop Examples

# For loop with list
print("=== Fruits ===")
fruits = ["apple", "banana", "orange", "grape"]
for fruit in fruits:
    print(f"I like {fruit}")

# For loop with range
print("\n=== Counting ===")
for i in range(1, 6):
    print(f"Count: {i}")

# For loop with string
print("\n=== Letters in PYTHON ===")
word = "PYTHON"
for letter in word:
    print(letter)

# While loop
print("\n=== Countdown ===")
countdown = 5
while countdown > 0:
    print(f"T-minus {countdown}")
    countdown -= 1
print("Blast off! 🚀")

# Loop with break
print("\n=== Finding a number ===")
numbers = [1, 3, 7, 12, 8, 4]
target = 7
for i, num in enumerate(numbers):
    if num == target:
        print(f"Found {target} at position {i}")
        break
else:
    print(f"{target} not found")

# Loop with continue
print("\n=== Even numbers only ===")
for i in range(10):
    if i % 2 != 0:  # Skip odd numbers
        continue
    print(f"Even number: {i}")

# Nested loops - multiplication table
print("\n=== 3x3 Multiplication Table ===")
for i in range(1, 4):
    for j in range(1, 4):
        result = i * j
        print(f"{i} x {j} = {result}")
    print()  # Empty line after each row

# Practical example: sum of numbers
print("=== Sum calculation ===")
numbers = [10, 20, 30, 40, 50]
total = 0
for num in numbers:
    total += num
print(f"Numbers: {numbers}")
print(f"Sum: {total}")
print(f"Average: {total / len(numbers)}")`,
    difficulty: 'beginner',
    estimatedTime: 30,
    order: 4
  }
];