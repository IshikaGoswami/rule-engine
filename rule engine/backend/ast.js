class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;   // 'operator' or 'operand'
        this.left = left;   // Reference to another Node (left child)
        this.right = right; // Reference to another Node (right child for operators)
        this.value = value; // Optional value for operand nodes (e.g., number for comparisons)
    }
}

module.exports = Node;