Rule Engine with AST
Overview
The Rule Engine with AST project is a three-tier application designed to determine user eligibility based on various attributes like age, department, income, and spend. It uses an Abstract Syntax Tree (AST) to represent and evaluate conditional rules. The project is built using Node.js and Express for the backend, and a simple HTML/JavaScript frontend.

Features
Rule Creation: Define rules using a string format and parse them into an AST.
Rule Combination: Combine multiple rules into a single AST for more complex logic.
Rule Evaluation: Evaluate rules against user data to determine eligibility.
Simple UI: Basic interface for rule creation.
Error Handling: Handle invalid rules and data formats.
Validation: Validate attributes against a catalog.
Project Structure
rule-engine/
│
├── backend/
│ ├── app.js # Entry point for the backend server
│ ├── ast.js # AST data structure definition
│ ├── database.js # MongoDB connection setup
│ ├── models/
│ │ ├── Rule.js # Mongoose schema for rules
│ ├── routes/
│ │ ├── ruleRoutes.js # API routes for rule operations
│ └── utils/
│ ├── astUtils.js # Utility functions for AST operations
│
├── ui/
│ ├── index.html # Simple HTML UI for rule creation
│ └── app.js # JavaScript to interact with the backend API
│
├── tests/
│ ├── ast.test.js # Tests for AST operations
│ ├── database.test.js # Tests for database operations
│ ├── api.test.js # Tests for API routes
│
├── package.json # Project dependencies and scripts
└── README.md # This file

Setup
Backend
Clone the Repository:

Use the command git clone <repository-url>
Change directory into the project folder using cd rule-engine
Install Dependencies:

Run npm install
Start MongoDB:

Ensure MongoDB is running locally or adjust the connection string in backend/database.js.
Run the Server:

Execute node backend/app.js
Frontend
Open the UI:
Open the file ui/index.html in your web browser.
API Endpoints
Create Rule

Endpoint: POST /api/rules/create_rule
Request Body:
{
"ruleString": "age > 30 AND department == Sales"
}
Response: The created rule with its AST.
Combine Rules

Endpoint: POST /api/rules/combine_rules
Request Body:
{
"rules": [
"age > 30",
"department == Sales"
]
}
Response: Combined AST of the rules.
Evaluate Rule

Endpoint: POST /api/rules/evaluate_rule
Request Body:
{
"ast": {
"type": "operator",
"left": { "type": "operand", "value": "age > 30" },
"right": { "type": "operand", "value": "department == Sales" }
},
"data": {
"age": 35,
"department": "Sales"
}
}
Response: Evaluation result (true/false).
Testing
Run Tests:
Use the command npm test
