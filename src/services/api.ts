import { Tutorial, Problem, ExecutionResult, User, UserProgress } from '../types';
import { tutorials } from '../data/tutorials';
import { problems } from '../data/problems';

// Simulated API service for the MVP
// In a real application, these would be actual HTTP requests to a backend

class ApiService {
  private baseUrl = '/api';
  private currentUser: User | null = null;
  private userProgress: Map<string, boolean> = new Map();
  private solvedProblems: Set<string> = new Set();

  constructor() {
    // Initialize with demo user
    this.currentUser = {
      id: 'demo-user',
      email: 'demo@pythonlearning.com',
      name: 'Python Learner',
      createdAt: new Date().toISOString(),
      progress: {
        tutorialsCompleted: 0,
        problemsSolved: 0,
        totalProblems: problems.length,
        completionPercentage: 0,
        streak: 0,
        lastActivity: new Date().toISOString()
      }
    };

    // Load progress from localStorage
    this.loadProgress();
  }

  private loadProgress() {
    try {
      const savedProgress = localStorage.getItem('python-learning-progress');
      if (savedProgress) {
        const data = JSON.parse(savedProgress);
        this.userProgress = new Map(data.tutorials || []);
        this.solvedProblems = new Set(data.problems || []);
        this.updateUserProgress();
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }

  private saveProgress() {
    try {
      const data = {
        tutorials: Array.from(this.userProgress.entries()),
        problems: Array.from(this.solvedProblems)
      };
      localStorage.setItem('python-learning-progress', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  private updateUserProgress() {
    if (!this.currentUser) return;

    const tutorialsCompleted = Array.from(this.userProgress.values()).filter(Boolean).length;
    const problemsSolved = this.solvedProblems.size;
    const totalItems = tutorials.length + problems.length;
    const completionPercentage = Math.round(((tutorialsCompleted + problemsSolved) / totalItems) * 100);

    this.currentUser.progress = {
      tutorialsCompleted,
      problemsSolved,
      totalProblems: problems.length,
      completionPercentage,
      streak: this.calculateStreak(),
      lastActivity: new Date().toISOString()
    };
  }

  private calculateStreak(): number {
    // Simplified streak calculation for demo
    return Math.min(this.solvedProblems.size, 7);
  }

  // Authentication
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await this.delay(1000);
    
    if (email && password) {
      return this.currentUser!;
    }
    throw new Error('Invalid credentials');
  }

  async register(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await this.delay(1000);
    
    this.currentUser = {
      id: 'user-' + Date.now(),
      email,
      name,
      createdAt: new Date().toISOString(),
      progress: {
        tutorialsCompleted: 0,
        problemsSolved: 0,
        totalProblems: problems.length,
        completionPercentage: 0,
        streak: 0,
        lastActivity: new Date().toISOString()
      }
    };
    
    return this.currentUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Tutorials
  async getTutorials(): Promise<Tutorial[]> {
    await this.delay(500);
    
    return tutorials.map(tutorial => ({
      ...tutorial,
      isCompleted: this.userProgress.get(tutorial.id) || false
    }));
  }

  async getTutorial(id: string): Promise<Tutorial | null> {
    await this.delay(300);
    
    const tutorial = tutorials.find(t => t.id === id);
    if (!tutorial) return null;
    
    return {
      ...tutorial,
      isCompleted: this.userProgress.get(tutorial.id) || false
    };
  }

  async markTutorialComplete(id: string): Promise<void> {
    await this.delay(200);
    
    this.userProgress.set(id, true);
    this.updateUserProgress();
    this.saveProgress();
  }

  // Problems
  async getProblems(): Promise<Problem[]> {
    await this.delay(500);
    
    return problems.map(problem => ({
      ...problem,
      isSolved: this.solvedProblems.has(problem.id)
    }));
  }

  async getProblem(id: string): Promise<Problem | null> {
    await this.delay(300);
    
    const problem = problems.find(p => p.id === id);
    if (!problem) return null;
    
    return {
      ...problem,
      isSolved: this.solvedProblems.has(problem.id)
    };
  }

  // Code Execution
  async executeCode(code: string, input: string = ''): Promise<ExecutionResult> {
    await this.delay(1500); // Simulate execution time
    
    try {
      // This is a mock implementation
      // In a real application, this would send code to a secure sandbox
      const result = this.mockPythonExecution(code, input);
      return result;
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Execution failed',
        executionTime: 0,
        memoryUsed: 0,
        success: false
      };
    }
  }

  private mockPythonExecution(code: string, input: string): ExecutionResult {
    // Mock Python execution for demo purposes
    // This simulates common Python operations
    
    const startTime = Date.now();
    let output = '';
    let error = '';
    
    try {
      // Simple pattern matching for demo
      if (code.includes('print("Hello, World!")')) {
        output = 'Hello, World!';
      } else if (code.includes('print(') && code.includes('Hello')) {
        output = 'Hello, World!';
      } else if (code.includes('input()') && input) {
        // Handle input-based problems
        const lines = input.trim().split('\n');
        
        if (code.includes('float(input())') && code.includes('+')) {
          // Calculator
          const num1 = parseFloat(lines[0]);
          const op = lines[1];
          const num2 = parseFloat(lines[2]);
          
          switch (op) {
            case '+': output = (num1 + num2).toString(); break;
            case '-': output = (num1 - num2).toString(); break;
            case '*': output = (num1 * num2).toString(); break;
            case '/': output = (num1 / num2).toString(); break;
            default: output = 'Invalid operation';
          }
        } else if (code.includes('% 2')) {
          // Even/Odd
          const num = parseInt(lines[0]);
          output = num % 2 === 0 ? 'Even' : 'Odd';
        } else if (code.includes('score') || code.includes('grade')) {
          // Grade calculator
          const score = parseInt(lines[0]);
          if (score >= 90) output = 'A';
          else if (score >= 80) output = 'B';
          else if (score >= 70) output = 'C';
          else if (score >= 60) output = 'D';
          else output = 'F';
        } else if (code.includes('sum') || code.includes('range')) {
          // Sum of numbers
          const n = parseInt(lines[0]);
          const sum = (n * (n + 1)) / 2;
          output = sum.toString();
        } else if (code.includes('vowel')) {
          // Count vowels
          const text = lines[0].toLowerCase();
          const vowels = 'aeiou';
          let count = 0;
          for (const char of text) {
            if (vowels.includes(char)) count++;
          }
          output = count.toString();
        } else if (code.includes('reverse') || code.includes('[::-1]')) {
          // Reverse string
          output = lines[0].split('').reverse().join('');
        } else if (code.includes('max') || code.includes('maximum')) {
          // Find maximum
          const numbers = lines[1].split(' ').map(Number);
          output = Math.max(...numbers).toString();
        } else if (code.includes('factorial')) {
          // Factorial
          const n = parseInt(lines[0]);
          let factorial = 1;
          for (let i = 1; i <= n; i++) {
            factorial *= i;
          }
          output = factorial.toString();
        } else if (code.includes('prime')) {
          // Prime checker
          const n = parseInt(lines[0]);
          let isPrime = n > 1;
          if (n > 1) {
            for (let i = 2; i <= Math.sqrt(n); i++) {
              if (n % i === 0) {
                isPrime = false;
                break;
              }
            }
          } else {
            isPrime = false;
          }
          output = isPrime ? 'Prime' : 'Not Prime';
        } else {
          output = 'Code executed successfully';
        }
      } else {
        // Try to execute simple print statements
        const printMatch = code.match(/print\((.*?)\)/g);
        if (printMatch) {
          output = printMatch.map(p => {
            const content = p.match(/print\((.*?)\)/)?.[1] || '';
            return content.replace(/['"]/g, '');
          }).join('\n');
        } else {
          output = 'Code executed successfully';
        }
      }
      
      const executionTime = Date.now() - startTime;
      
      return {
        output: output.trim(),
        error: error || undefined,
        executionTime,
        memoryUsed: Math.random() * 1024 * 1024, // Mock memory usage
        success: !error
      };
      
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Unknown error',
        executionTime: Date.now() - startTime,
        memoryUsed: 0,
        success: false
      };
    }
  }

  async submitSolution(problemId: string, code: string): Promise<boolean> {
    const problem = await this.getProblem(problemId);
    if (!problem) return false;

    let allTestsPassed = true;

    for (const testCase of problem.testCases) {
      const result = await this.executeCode(code, testCase.input);
      if (!result.success || result.output.trim() !== testCase.expectedOutput.trim()) {
        allTestsPassed = false;
        break;
      }
    }

    if (allTestsPassed) {
      this.solvedProblems.add(problemId);
      this.updateUserProgress();
      this.saveProgress();
    }

    return allTestsPassed;
  }

  // Utility
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();