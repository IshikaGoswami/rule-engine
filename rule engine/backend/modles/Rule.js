const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RuleSchema = new Schema({
    ruleString: {
        type: String,
        required: true
    },
    ast: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Rule', RuleSchema);