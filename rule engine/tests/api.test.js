const request = require('supertest');
const app = require('../backend/app');
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

describe('API Endpoints', () => {
    test('should create a rule', async () => {
        const response = await request(app)
            .post('/api/rules/create_rule')
            .send({ ruleString: 'age > 30 AND department == Sales' });
        expect(response.statusCode).toBe(200);
        expect(response.body.ruleString).toBe('age > 30 AND department == Sales');
        expect(response.body.ast).toBeDefined();
    });

    test('should combine rules', async () => {
        const response = await request(app)
            .post('/api/rules/combine_rules')
            .send({
                rules: [
                    'age > 30',
                    'department == Sales'
                ]
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    test('should evaluate rule', async () => {
        const ast = { type: 'operator', left: { type: 'operand', value: 'age > 30' }, right: { type: 'operand', value: 'department == Sales' } };
        const response = await request(app)
            .post('/api/rules/evaluate_rule')
            .send({ ast, data: { age: 35, department: 'Sales' } });
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBe(true);
    });
});