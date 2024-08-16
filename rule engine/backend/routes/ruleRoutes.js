const express = require('express');
const router = express.Router();
const Node = require('../ast');
const Rule = require('../models/Rule');
const { parseRule, combineASTs, evaluateAST } = require('../utils/astUtils');

// Create a new rule
router.post('/create_rule', async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ast = parseRule(ruleString);
        const rule = new Rule({ ruleString, ast });
        await rule.save();
        res.json(rule);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Combine rules into a single AST
router.post('/combine_rules', async (req, res) => {
    try {
        const { rules } = req.body;
        const asts = rules.map(parseRule);
        const combinedAST = combineASTs(asts);
        res.json(combinedAST);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Evaluate a rule against data
router.post('/evaluate_rule', (req, res) => {
    try {
        const { ast, data } = req.body;
        const result = evaluateAST(ast, data);
        res.json({ result });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;