export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  progress: UserProgress;
}

export interface UserProgress {
  tutorialsCompleted: number;
  problemsSolved: number;
  totalProblems: number;
  completionPercentage: number;
  streak: number;
  lastActivity: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExample: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  order: number;
  isCompleted?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sampleInput: string;
  sampleOutput: string;
  constraints: string;
  testCases: TestCase[];
  starterCode: string;
  isSolved?: boolean;
  category: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodeExecution {
  code: string;
  input?: string;
}

export interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  memoryUsed: number;
  success: boolean;
}

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  result: ExecutionResult;
  isCorrect: boolean;
  submittedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  tutorials: Tutorial[];
  problems: Problem[];
  estimatedDuration: string;
}