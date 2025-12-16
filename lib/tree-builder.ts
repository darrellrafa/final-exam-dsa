export interface TreeNode {
    key: string;
    frequency: number;
    x: number;
    y: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/**
 * Calculate positions for tree visualization
 */
export function calculateTreePositions(
    node: any,
    x: number = 500,
    y: number = 50,
    horizontalSpacing: number = 200,
    level: number = 0
): TreeNode | null {
    if (!node) return null;

    const newNode: TreeNode = {
        key: node.key,
        frequency: node.frequency,
        x,
        y,
        left: null, // Initialize to null
        right: null // Initialize to null
    };

    const verticalSpacing = 80;
    const spacingReduction = 0.6; // Reduce spacing as we go down

    newNode.left = node.left ? calculateTreePositions(
        node.left,
        x - horizontalSpacing,
        y + verticalSpacing,
        horizontalSpacing * spacingReduction,
        level + 1
    ) : null;

    newNode.right = node.right ? calculateTreePositions(
        node.right,
        x + horizontalSpacing,
        y + verticalSpacing,
        horizontalSpacing * spacingReduction,
        level + 1
    ) : null;

    return newNode;
}

/**
 * Get all nodes in a flat array for rendering
 */
export function getFlatNodeList(node: TreeNode | null): TreeNode[] {
    if (!node) return [];

    return [
        node,
        ...getFlatNodeList(node.left),
        ...getFlatNodeList(node.right)
    ];
}

/**
 * Get all edges for rendering
 */
export function getEdges(node: TreeNode | null): Array<{ from: TreeNode; to: TreeNode }> {
    if (!node) return [];

    const edges: Array<{ from: TreeNode; to: TreeNode }> = [];

    if (node.left) {
        edges.push({ from: node, to: node.left });
        edges.push(...getEdges(node.left));
    }

    if (node.right) {
        edges.push({ from: node, to: node.right });
        edges.push(...getEdges(node.right));
    }

    return edges;
}
