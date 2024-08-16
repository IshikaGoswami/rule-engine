const mongoose = require('mongoose');
const Rule = require('../backend/models/Rule');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ruleEngineTest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Database Operations', () => {
    test('should create a new rule in the database', async () => {
        const rule = new Rule({
            ruleString: 'age > 30 AND department == Sales',
            ast: { type: 'operator', left: { type: 'operand', value: 'age > 30' }, right: { type: 'operand', value: 'department == Sales' } }
        });
        const savedRule = await rule.save();
        expect(savedRule.ruleString).toBe('age > 30 AND department == Sales');
    });

    test('should retrieve rules from the database', async () => {
        const rules = await Rule.find();
        expect(rules.length).toBeGreaterThan(0);
    });
});