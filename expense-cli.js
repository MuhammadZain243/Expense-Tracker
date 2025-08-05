const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

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
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
const summaryExpense = (filter = null) => {
  const expenses = loadExpenses();
  let total = 0;

  const filtered = filter
    ? expenses.filter((e) => parseInt(e.date.split('-')[1]) === filter)
    : expenses;

  filtered.forEach((expense) => {
    total += expense.amount;
  });

  console.log(`Total expenses: $${total}`);
};

// export Expenses data
const exportExpenseData = () => {
  const expenses = loadExpenses();

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert JSON data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(expenses);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Export the workbook as an Excel file
  XLSX.writeFile(workbook, 'expense.xlsx');
  console.log('Export successfully');
};

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
    summaryExpense(parseInt(args[2]));
    break;

  case 'export':
    exportExpenseData();
    break;

  default:
    console.log('Unknow Command');
    break;
}
