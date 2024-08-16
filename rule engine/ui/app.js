document.getElementById('ruleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ruleString = document.getElementById('ruleString').value;

    const response = await fetch('/api/rules/create_rule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ruleString })
    });

    const result = await response.json();
    console.log(result);
});