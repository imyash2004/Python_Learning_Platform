import type { Problem } from '../types/index';

export const problems: Problem[] = [
  {
    id: '1',
    title: 'Hello World',
    description: `Write a program that prints "Hello, World!" to the console.

This is your first Python program! The print() function is used to display text on the screen.`,
    difficulty: 'beginner',
    sampleInput: '',
    sampleOutput: 'Hello, World!',
    constraints: 'No input required. Simply print the exact text.',
    testCases: [
      {
        input: '',
        expectedOutput: 'Hello, World!'
      }
    ],
    starterCode: `# Write your code here
print("Hello, World!")`,
    category: 'basics'
  },
  {
    id: '2',
    title: 'Simple Calculator',
    description: `Create a simple calculator that takes two numbers and an operation (+, -, *, /) and returns the result.

Read three inputs:
1. First number (float)
2. Operation (+, -, *, or /)
3. Second number (float)

Print the result of the calculation.`,
    difficulty: 'beginner',
    sampleInput: `5.0
+
3.0`,
    sampleOutput: '8.0',
    constraints: `- Numbers can be integers or floats
- Operations are limited to +, -, *, /
- For division, assume the second number is never 0`,
    testCases: [
      {
        input: '5.0\n+\n3.0',
        expectedOutput: '8.0'
      },
      {
        input: '10\n-\n4',
        expectedOutput: '6'
      },
      {
        input: '7\n*\n6',
        expectedOutput: '42'
      },
      {
        input: '15\n/\n3',
        expectedOutput: '5.0'
      }
    ],
    starterCode: `# Read the inputs
num1 = float(input())
operation = input()
num2 = float(input())

# Perform the calculation
# Write your code here`,
    category: 'basics'
  },
  {
    id: '3',
    title: 'Even or Odd',
    description: `Write a program that determines if a given number is even or odd.

Read an integer from input and print:
- "Even" if the number is even
- "Odd" if the number is odd

A number is even if it's divisible by 2 (remainder is 0 when divided by 2).`,
    difficulty: 'beginner',
    sampleInput: '7',
    sampleOutput: 'Odd',
    constraints: 'Input will be a valid integer between -1000 and 1000.',
    testCases: [
      {
        input: '7',
        expectedOutput: 'Odd'
      },
      {
        input: '8',
        expectedOutput: 'Even'
      },
      {
        input: '0',
        expectedOutput: 'Even'
      },
      {
        input: '-3',
        expectedOutput: 'Odd'
      }
    ],
    starterCode: `# Read the number
number = int(input())

# Check if even or odd
# Write your code here`,
    category: 'conditionals'
  },
  {
    id: '4',
    title: 'Grade Calculator',
    description: `Write a program that converts a numerical score to a letter grade.

Grade scale:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: Below 60

Read a score (integer) and print the corresponding letter grade.`,
    difficulty: 'beginner',
    sampleInput: '85',
    sampleOutput: 'B',
    constraints: 'Score will be an integer between 0 and 100.',
    testCases: [
      {
        input: '95',
        expectedOutput: 'A'
      },
      {
        input: '85',
        expectedOutput: 'B'
      },
      {
        input: '75',
        expectedOutput: 'C'
      },
      {
        input: '65',
        expectedOutput: 'D'
      },
      {
        input: '45',
        expectedOutput: 'F'
      }
    ],
    starterCode: `# Read the score
score = int(input())

# Determine the grade
# Write your code here`,
    category: 'conditionals'
  },
  {
    id: '5',
    title: 'Sum of Numbers',
    description: `Write a program that calculates the sum of all numbers from 1 to N (inclusive).

For example, if N = 5, calculate 1 + 2 + 3 + 4 + 5 = 15.

Read an integer N and print the sum of all numbers from 1 to N.`,
    difficulty: 'beginner',
    sampleInput: '5',
    sampleOutput: '15',
    constraints: 'N will be a positive integer between 1 and 1000.',
    testCases: [
      {
        input: '5',
        expectedOutput: '15'
      },
      {
        input: '1',
        expectedOutput: '1'
      },
      {
        input: '10',
        expectedOutput: '55'
      },
      {
        input: '100',
        expectedOutput: '5050'
      }
    ],
    starterCode: `# Read the number
n = int(input())

# Calculate the sum
# Write your code here`,
    category: 'loops'
  },
  {
    id: '6',
    title: 'Count Vowels',
    description: `Write a program that counts the number of vowels in a given string.

Vowels are: a, e, i, o, u (both uppercase and lowercase).

Read a string and print the number of vowels in it.`,
    difficulty: 'beginner',
    sampleInput: 'Hello World',
    sampleOutput: '3',
    constraints: 'The string can contain letters, numbers, spaces, and punctuation.',
    testCases: [
      {
        input: 'Hello World',
        expectedOutput: '3'
      },
      {
        input: 'Python Programming',
        expectedOutput: '4'
      },
      {
        input: 'AEIOU',
        expectedOutput: '5'
      },
      {
        input: 'xyz',
        expectedOutput: '0'
      }
    ],
    starterCode: `# Read the string
text = input()

# Count vowels
# Write your code here`,
    category: 'strings'
  },
  {
    id: '7',
    title: 'Reverse a String',
    description: `Write a program that reverses a given string.

For example, "hello" becomes "olleh".

Read a string and print it in reverse order.`,
    difficulty: 'beginner',
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    constraints: 'The string can contain any characters including spaces.',
    testCases: [
      {
        input: 'hello',
        expectedOutput: 'olleh'
      },
      {
        input: 'Python',
        expectedOutput: 'nohtyP'
      },
      {
        input: 'Hello World',
        expectedOutput: 'dlroW olleH'
      },
      {
        input: 'a',
        expectedOutput: 'a'
      }
    ],
    starterCode: `# Read the string
text = input()

# Reverse the string
# Write your code here`,
    category: 'strings'
  },
  {
    id: '8',
    title: 'Find Maximum in List',
    description: `Write a program that finds the maximum number in a list of integers.

First, read the number of integers N.
Then, read N integers.
Print the maximum number from the list.`,
    difficulty: 'beginner',
    sampleInput: `5
3 7 2 9 1`,
    sampleOutput: '9',
    constraints: 'N will be between 1 and 100. All numbers will be integers between -1000 and 1000.',
    testCases: [
      {
        input: '5\n3 7 2 9 1',
        expectedOutput: '9'
      },
      {
        input: '3\n-5 -2 -8',
        expectedOutput: '-2'
      },
      {
        input: '1\n42',
        expectedOutput: '42'
      },
      {
        input: '4\n10 10 10 10',
        expectedOutput: '10'
      }
    ],
    starterCode: `# Read the number of integers
n = int(input())

# Read the integers
numbers = list(map(int, input().split()))

# Find the maximum
# Write your code here`,
    category: 'lists'
  },
  {
    id: '9',
    title: 'Factorial Calculator',
    description: `Write a program that calculates the factorial of a given number.

The factorial of n (written as n!) is the product of all positive integers less than or equal to n.
For example: 5! = 5 × 4 × 3 × 2 × 1 = 120

Read a non-negative integer and print its factorial.`,
    difficulty: 'beginner',
    sampleInput: '5',
    sampleOutput: '120',
    constraints: 'Input will be a non-negative integer between 0 and 10. Note: 0! = 1.',
    testCases: [
      {
        input: '5',
        expectedOutput: '120'
      },
      {
        input: '0',
        expectedOutput: '1'
      },
      {
        input: '1',
        expectedOutput: '1'
      },
      {
        input: '4',
        expectedOutput: '24'
      }
    ],
    starterCode: `# Read the number
n = int(input())

# Calculate factorial
# Write your code here`,
    category: 'loops'
  },
  {
    id: '10',
    title: 'Prime Number Checker',
    description: `Write a program that checks if a given number is prime.

A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

Read an integer and print "Prime" if it's prime, "Not Prime" otherwise.`,
    difficulty: 'beginner',
    sampleInput: '17',
    sampleOutput: 'Prime',
    constraints: 'Input will be a positive integer between 1 and 100.',
    testCases: [
      {
        input: '17',
        expectedOutput: 'Prime'
      },
      {
        input: '1',
        expectedOutput: 'Not Prime'
      },
      {
        input: '2',
        expectedOutput: 'Prime'
      },
      {
        input: '15',
        expectedOutput: 'Not Prime'
      },
      {
        input: '29',
        expectedOutput: 'Prime'
      }
    ],
    starterCode: `# Read the number
n = int(input())

# Check if prime
# Write your code here`,
    category: 'loops'
  }
];