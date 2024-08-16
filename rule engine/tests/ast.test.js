const { parseRule, combineASTs, evaluateAST } = require('../backend/utils/astUtils');

describe('AST Utilities', () => {
    test('should parse rule correctly', () => {
        const ruleString = 'age > 30 AND department == Sales';
        const ast = parseRule(ruleString);
        expect(ast).toBeDefined();
        expect(ast.type).toBe('operator');
    });

    test('should combine multiple ASTs', () => {
        const ast1 = parseRule('age > 30');
        const ast2 = parseRule('department == Sales');
        const combinedAST = combineASTs([ast1, ast2]);
        expect(combinedAST).toBeDefined();
        expect(combinedAST.type).toBe('operator');
    });

    test('should evaluate AST correctly', () => {
        const ast = parseRule('age > 30 AND department == Sales');
        const data = { age: 35, department: 'Sales' };
        const result = evaluateAST(ast, data);
        expect(result).toBe(true);
    });

    test('should evaluate AST with false result', () => {
        const ast = parseRule('age > 30 AND department == Sales');
        const data = { age: 25, department: 'Marketing' };
        const result = evaluateAST(ast, data);
        expect(result).toBe(false);
    });
});