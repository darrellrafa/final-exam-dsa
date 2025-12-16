export interface BSTNode {
    key: string;
    frequency: number;
    left: BSTNode | null;
    right: BSTNode | null;
}

export interface BSTData {
    key: string;
    frequency: number;
}

export interface BSTResult {
    tree: BSTNode | null;
    costTable: number[][];
    rootTable: number[][];
    keys: string[];
    frequencies: number[];
    totalCost: number;
}

/**
 * Constructs an optimal Binary Search Tree using dynamic programming
 * Based on the algorithm discussed in class
 */
export function constructOptimalBST(data: BSTData[]): BSTResult {
    // Sort data by keys (alphabetically)
    const sortedData = [...data].sort((a, b) => a.key.localeCompare(b.key));

    const n = sortedData.length;
    const keys = sortedData.map(d => d.key);
    const freq = sortedData.map(d => d.frequency);

    // Initialize cost and root tables
    // cost[i][j] represents the minimum cost of BST containing keys from i to j
    const cost: number[][] = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));

    // root[i][j] represents the root of optimal BST containing keys from i to j
    const root: number[][] = Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));

    // For a single key, cost equals frequency
    for (let i = 0; i < n; i++) {
        cost[i][i] = freq[i];
        root[i][i] = i;
    }

    // Calculate cost for chains of length 2 to n
    for (let L = 2; L <= n; L++) {
        for (let i = 0; i <= n - L; i++) {
            const j = i + L - 1;
            cost[i][j] = Infinity;

            // Sum of frequencies from i to j
            const sum = freq.slice(i, j + 1).reduce((a, b) => a + b, 0);

            // Try making each key in range [i, j] as root
            for (let r = i; r <= j; r++) {
                const leftCost = r > i ? cost[i][r - 1] : 0;
                const rightCost = r < j ? cost[r + 1][j] : 0;
                const currentCost = leftCost + rightCost + sum;

                if (currentCost < cost[i][j]) {
                    cost[i][j] = currentCost;
                    root[i][j] = r;
                }
            }
        }
    }

    // Build the tree structure from root table
    const tree = buildTree(keys, freq, root, 0, n - 1);

    return {
        tree,
        costTable: cost,
        rootTable: root,
        keys,
        frequencies: freq,
        totalCost: cost[0][n - 1]
    };
}

/**
 * Recursively builds the tree structure from the root table
 */
function buildTree(
    keys: string[],
    freq: number[],
    root: number[][],
    i: number,
    j: number
): BSTNode | null {
    if (i > j) return null;

    const rootIndex = root[i][j];
    const node: BSTNode = {
        key: keys[rootIndex],
        frequency: freq[rootIndex],
        left: null,
        right: null
    };

    node.left = buildTree(keys, freq, root, i, rootIndex - 1);
    node.right = buildTree(keys, freq, root, rootIndex + 1, j);

    return node;
}

/**
 * Get a text representation of the tree structure
 */
export function getTreeStructure(node: BSTNode | null, prefix = '', isRight = true): string {
    if (!node) return '';

    let result = prefix;
    result += isRight ? '└── ' : '├── ';
    result += `${node.key} (${node.frequency})\n`;

    const children = [];
    if (node.left) children.push({ node: node.left, isRight: false });
    if (node.right) children.push({ node: node.right, isRight: true });

    children.forEach((child, index) => {
        const extension = isRight ? '    ' : '│   ';
        const isLast = index === children.length - 1;
        result += getTreeStructure(
            child.node,
            prefix + extension,
            child.isRight && isLast
        );
    });

    return result;
}
