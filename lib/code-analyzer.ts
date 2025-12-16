// Code analyzer untuk mendeteksi complexity patterns

export interface AnalysisResult {
    description: string;
    recurrence: string;
    recurrenceExplanation: string;
    timeComplexity: string;
    masterTheorem: string;
    steps: {
        title: string;
        code: string;
        complexity: string;
    }[];
}

// Detect recursive calls
function detectRecursiveCalls(code: string): { count: number; pattern: string } {
    const functionNameMatch = code.match(/(?:int|void|long|double|float|char)\s+(\w+)\s*\(/);
    if (!functionNameMatch) return { count: 0, pattern: '' };

    const functionName = functionNameMatch[1];
    const regex = new RegExp(`\\b${functionName}\\s*\\(`, 'g');
    const matches = code.match(regex);

    // Exclude the function definition itself
    const callCount = matches ? matches.length - 1 : 0;

    // Detect pattern
    if (callCount === 0) return { count: 0, pattern: 'iterative' };
    if (callCount === 1) return { count: 1, pattern: 'linear' };
    if (callCount === 2) {
        // Check if it's dividing by 2
        if (code.includes('/2') || code.includes('/ 2')) {
            return { count: 2, pattern: 'divide-conquer' };
        }
        if (code.includes('-1') || code.includes('- 1')) {
            return { count: 2, pattern: 'double-linear' };
        }
        return { count: 2, pattern: 'binary' };
    }
    if (callCount === 3) return { count: 3, pattern: 'ternary' };

    return { count: callCount, pattern: 'multiple' };
}

// Detect loops
function detectLoops(code: string): { count: number; nested: boolean } {
    const forLoops = (code.match(/\bfor\s*\(/g) || []).length;
    const whileLoops = (code.match(/\bwhile\s*\(/g) || []).length;
    const totalLoops = forLoops + whileLoops;

    // Simple nested loop detection
    const lines = code.split('\n');
    let nested = false;
    let loopDepth = 0;
    let maxDepth = 0;

    for (const line of lines) {
        if (line.match(/\b(for|while)\s*\(/)) {
            loopDepth++;
            maxDepth = Math.max(maxDepth, loopDepth);
        }
        if (line.includes('}')) {
            loopDepth = Math.max(0, loopDepth - 1);
        }
    }

    nested = maxDepth > 1;

    return { count: totalLoops, nested };
}

// Apply Master Theorem
function applyMasterTheorem(a: number, b: number, workComplexity: string): {
    caseNum: number;
    result: string;
    explanation: string;
} {
    const logba = Math.log(a) / Math.log(b);
    const logbaRounded = Math.round(logba * 100) / 100;

    // Extract exponent from work complexity
    let workExponent = 0;
    if (workComplexity.includes('n^2')) workExponent = 2;
    else if (workComplexity.includes('n log n')) workExponent = 1.1; // Slightly more than n
    else if (workComplexity.includes('n')) workExponent = 1;
    else if (workComplexity.includes('log n')) workExponent = 0.5;
    else if (workComplexity.includes('1')) workExponent = 0;

    let caseNum = 2;
    let result = '';
    let explanation = '';

    if (workExponent < logbaRounded - 0.01) {
        // Case 1
        caseNum = 1;
        result = `Θ(n^${logbaRounded})`;
        explanation = `a=${a}, b=${b}, f(n)=${workComplexity}. Since f(n) is polynomially smaller than n^(log_${b} ${a}), Case 1 applies.`;
    } else if (workExponent > logbaRounded + 0.01) {
        // Case 3
        caseNum = 3;
        result = workComplexity.replace('O', 'Θ');
        explanation = `a=${a}, b=${b}, f(n)=${workComplexity}. Since f(n) is polynomially larger than n^(log_${b} ${a}), Case 3 applies.`;
    } else {
        // Case 2
        caseNum = 2;
        if (logbaRounded === 0) {
            result = 'Θ(log n)';
        } else if (logbaRounded === 1) {
            result = 'Θ(n log n)';
        } else {
            result = `Θ(n^${logbaRounded} log n)`;
        }
        explanation = `a=${a}, b=${b}, f(n)=${workComplexity}. Since f(n) = Θ(n^(log_${b} ${a})), Case 2 applies.`;
    }

    return { caseNum, result, explanation };
}

// Main analysis function
export function analyzeCode(code: string): AnalysisResult {
    const recursion = detectRecursiveCalls(code);
    const loops = detectLoops(code);

    let description = '';
    let recurrence = '';
    let recurrenceExplanation = '';
    let timeComplexity = '';
    let masterTheorem = '';
    const steps: AnalysisResult['steps'] = [];

    // Determine work complexity
    let workComplexity = 'O(1)';
    if (loops.nested) {
        workComplexity = 'O(n^2)';
    } else if (loops.count === 1) {
        workComplexity = 'O(n)';
    } else if (loops.count > 1) {
        workComplexity = `O(n^${loops.count})`;
    }

    // Build steps
    if (code.includes('if') && code.includes('return')) {
        steps.push({
            title: '1. Base Case',
            code: 'if (base_condition) return value;',
            complexity: 'O(1) - Constant time check and return'
        });
    }

    if (recursion.count > 0) {
        // Recursive algorithm
        if (recursion.pattern === 'divide-conquer') {
            description = 'Divide and conquer algorithm that recursively splits the problem into smaller subproblems.';
            recurrence = `T(n) = ${recursion.count}T(n/2) + ${workComplexity}`;
            recurrenceExplanation = `${recursion.count} recursive calls on half-sized input + ${workComplexity} work for combining/processing`;

            steps.push({
                title: '2. Recursive Calls',
                code: `${recursion.count} recursive calls on n/2`,
                complexity: `${recursion.count}T(n/2) - Divide into halves`
            });

            if (loops.count > 0) {
                steps.push({
                    title: '3. Combine/Process',
                    code: 'Loop to process results',
                    complexity: `${workComplexity} - Linear/polynomial work`
                });
            }

            const master = applyMasterTheorem(recursion.count, 2, workComplexity);
            timeComplexity = master.result;
            masterTheorem = master.explanation;

        } else if (recursion.pattern === 'linear') {
            description = 'Linear recursive algorithm that reduces problem size by one each step.';
            recurrence = `T(n) = T(n-1) + ${workComplexity}`;
            recurrenceExplanation = 'One recursive call with problem size reduced by 1';

            if (workComplexity === 'O(1)') {
                timeComplexity = 'Θ(n)';
                masterTheorem = 'T(n) = T(n-1) + O(1) expands to Θ(n) - linear time';
            } else {
                timeComplexity = `Θ(n * ${workComplexity})`;
                masterTheorem = `Each of n recursive calls does ${workComplexity} work`;
            }

        } else if (recursion.pattern === 'double-linear') {
            description = 'Double linear recursion (like Fibonacci) with exponential growth.';
            recurrence = 'T(n) = T(n-1) + T(n-2) + O(1)';
            recurrenceExplanation = 'Two recursive calls, each reducing problem size by 1-2';
            timeComplexity = 'O(2^n)';
            masterTheorem = 'Exponential time complexity - each call branches into two more calls';

        } else if (recursion.pattern === 'ternary') {
            description = 'Ternary recursion with three recursive calls.';
            recurrence = `T(n) = 3T(n/2) + ${workComplexity}`;
            recurrenceExplanation = '3 recursive calls on smaller subproblems';

            const master = applyMasterTheorem(3, 2, workComplexity);
            timeComplexity = master.result;
            masterTheorem = master.explanation;
        }

    } else {
        // Iterative algorithm
        description = 'Iterative algorithm using loops.';

        if (loops.nested) {
            recurrence = 'No recursion - nested loops';
            recurrenceExplanation = 'Nested iteration over input';
            timeComplexity = workComplexity;
            masterTheorem = 'Iterative approach with nested loops';

            steps.push({
                title: '1. Nested Loops',
                code: 'for (...) { for (...) { } }',
                complexity: workComplexity
            });

        } else if (loops.count === 1) {
            recurrence = 'No recursion - single loop';
            recurrenceExplanation = 'Single iteration over input';
            timeComplexity = 'Θ(n)';
            masterTheorem = 'Linear iteration through input';

            steps.push({
                title: '1. Single Loop',
                code: 'for (... n ...) { }',
                complexity: 'O(n)'
            });

        } else if (loops.count === 0) {
            description = 'Constant time algorithm with no loops or recursion.';
            recurrence = 'No recursion or loops';
            recurrenceExplanation = 'Direct computation';
            timeComplexity = 'Θ(1)';
            masterTheorem = 'Constant time operations only';

            steps.push({
                title: '1. Direct Computation',
                code: 'return result;',
                complexity: 'O(1)'
            });
        }
    }

    return {
        description,
        recurrence,
        recurrenceExplanation,
        timeComplexity,
        masterTheorem,
        steps
    };
}
