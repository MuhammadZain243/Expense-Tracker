const fs = require('fs');
const path = require('path');

const EXPENSE_FILE = path.join(__dirname, 'expenses.json');

// load Expenses
const loadExpenses = () => {
  if (!fs.existsSync(EXPENSE_FILE)) return [];

  const data = fs.readFileSync(EXPENSE_FILE, 'utf8');
  return data ? JSON.parse(data) : [];
};

// save Expenses
const saveExpenses = (expenses) => {
  fs.writeFileSync(EXPENSE_FILE, JSON.stringify(expenses));
};

// current Date
const now = () => {
  date = new Date();
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
};

// generate ID
const generateID = (expenses) => {
  return expenses.reduce((map, expense) => Math.max(map, expense.id), 0) + 1;
};

// add Expense
const addExpense = (description, amount) => {
  let expenses = loadExpenses();
  let expense = {
    id: generateID(expenses),
    description,
    amount,
    date: now(),
  };
  expenses.push(expense);
  saveExpenses(expenses);
  console.log(`Expense added successfully (ID: ${expense.id})`);
};

// delete Expense
const deleteExpense = (id) => {
  let expenses = loadExpenses();
  const index = expenses.findIndex((e) => e.id === id);

  // Not found case
  if (index === -1) return console.log('Expense Id not found');

  // Found case
  expenses.splice(index, 1);
  saveExpenses(expenses);
  console.log('Expense deleted successfully');
};

// list Expense
const listExpense = () => {
  const expenses = loadExpenses();
  const idWidth = 5;
  const dateWidth = 10;
  const descWidth = 10;
  const amountWidth = 10;

  console.log(
    '# ' +
      'ID'.padEnd(idWidth) +
      'Date'.padEnd(dateWidth) +
      'Description'.padEnd(descWidth) +
      'Amount'.padStart(amountWidth)
  );

  expenses.forEach((expense) => {
    console.log(
      '# ' +
        String(expense.id).padEnd(idWidth) +
        String(expense.date).padEnd(dateWidth) +
        String(expense.description || expense.desciption || '').padEnd(
          descWidth
        ) +
        String(expense.amount).padStart(amountWidth - 3)
    );
  });
};

// show summary of Expenses
const summaryExpense = () => {
  const expenses = loadExpenses();
  let total = 0;
  expenses.forEach((expenses) => {
    total += expenses.amount;
  });

  console.log(`Total expenses: $${total}`);
};

// export Expenses data
const exportExpenseData = () => {};

// CLI argument parsing
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'add':
    addExpense(args[2], parseInt(args[4]));
    break;

  case 'delete':
    deleteExpense(parseInt(args[2]));
    break;

  case 'list':
    listExpense();
    break;

  case 'summary':
    summaryExpense();
    break;

  case 'export':
    break;

  default:
    console.log('Unknow Command');
    break;
}
