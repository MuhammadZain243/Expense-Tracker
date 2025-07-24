const fs = require('fs');
const path = require('path');

const EXPENSE_FILE = path.join(__dirname, 'expenses.json');

// load Expenses
const loadExpenses = () => {
  if (!fs.existsSync(EXPENSE_FILE)) return [];

  const data = fs.readFileSync(EXPENSE_FILE, 'uft8');
  return data ? JSON.stringify(data) : [];
};

// save Expenses
const saveExpenses = (expenses) => {
  fs.writeFileSync(EXPENSE_FILE, JSON.stringify(expenses));
};

// current Date
const now = () => {
  return new Date().toISOString();
};

// generate ID
const generateID = (expenses) => {
  return expenses.reduce((map, expense) => Math.max(map, expense.id), 0) + 1;
};

// add Expense
const addExpense = (desciption, amount) => {};

// delete Expense
const deleteExpense = (id) => {};

// list Expense
const listExpense = () => {};

// show summary of Expenses
const summaryExpense = () => {};

// export Expenses data
const exportExpenseData = () => {};

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    break;

  case 'delete':
    break;

  case 'list':
    break;

  case 'summary':
    break;

  case 'export':
    break;

  default:
    console.log('Unknow Command');
    break;
}
