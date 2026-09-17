require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL غير موجود. أنشئ ملف .env وضع فيه رابط PostgreSQL ثم أعد تشغيل npm start.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const query = (text, params) => pool.query(text, params);
const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

const productFromRow = (row) => ({
  id: row.id,
  name: row.name,
  sku: row.sku,
  category: row.category,
  purchasePrice: Number(row.purchase_price),
  salePrice: Number(row.sale_price),
  currentQuantity: Number(row.current_quantity),
  minStockLevel: Number(row.min_stock_level),
  createdAt: row.created_at,
});

const customerFromRow = (row) => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  company: row.company,
  city: row.city,
  creditLimit: Number(row.credit_limit),
});

const supplierFromRow = (row) => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  company: row.company,
  city: row.city,
  balance: Number(row.balance),
});

const transactionFromRow = (row) => ({
  id: row.id,
  type: row.type,
  productId: row.product_id,
  productName: row.product_name,
  quantity: Number(row.quantity),
  unitPrice: Number(row.unit_price),
  notes: row.notes,
  customerId: row.customer_id,
  customerName: row.customer_name,
  createdAt: row.created_at,
});

const paymentFromRow = (row) => ({
  id: row.id,
  customerId: row.customer_id,
  customerName: row.customer_name,
  amount: Number(row.amount),
  method: row.method,
  notes: row.notes,
  createdAt: row.created_at,
});

const saleFromRow = (row) => ({
  id: row.id,
  customerId: row.customer_id,
  customerName: row.customer_name,
  paymentType: row.payment_type,
  items: row.items || [],
  total: Number(row.total),
  paidAmount: Number(row.paid_amount),
  remainingBalance: Number(row.remaining_balance),
  status: row.status,
  createdAt: row.created_at,
});

const employeeFromRow = (row) => ({
  id: row.id,
  name: row.name,
  residencyNumber: row.residency_number,
  phone: row.phone,
  nationality: row.nationality,
  salary: Number(row.salary),
  createdAt: row.created_at,
});

const payrollFromRow = (row) => ({
  id: row.id,
  employeeId: row.employee_id,
  employeeName: row.employee_name,
  paymentMonth: row.payment_month,
  amount: Number(row.amount),
  notes: row.notes,
  createdAt: row.created_at,
});

const expenseFromRow = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  paymentMethod: row.payment_method,
  expenseDate: row.expense_date,
  amount: Number(row.amount),
  notes: row.notes,
  createdAt: row.created_at,
});

async function initializeDatabase() {
  await query(`
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(120) NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      sku VARCHAR(120) NOT NULL UNIQUE,
      category VARCHAR(120) NOT NULL,
      purchase_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
      sale_price NUMERIC(12, 2) NOT NULL DEFAULT 0,
      current_quantity NUMERIC(12, 2) NOT NULL DEFAULT 0,
      min_stock_level NUMERIC(12, 2) NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      company VARCHAR(200) NOT NULL,
      city VARCHAR(120) NOT NULL,
      credit_limit NUMERIC(12, 2) NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS suppliers (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      company VARCHAR(200) NOT NULL,
      city VARCHAR(120) NOT NULL,
      balance NUMERIC(12, 2) NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(30) PRIMARY KEY,
      username VARCHAR(120) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL,
      full_name VARCHAR(200) NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'sales',
      status VARCHAR(40) NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS sales (
      id VARCHAR(40) PRIMARY KEY,
      customer_id VARCHAR(30) REFERENCES customers(id) ON DELETE SET NULL,
      customer_name VARCHAR(200) NOT NULL,
      payment_type VARCHAR(20) NOT NULL,
      total NUMERIC(12, 2) NOT NULL,
      paid_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
      remaining_balance NUMERIC(12, 2) NOT NULL DEFAULT 0,
      status VARCHAR(30) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS sale_items (
      id BIGSERIAL PRIMARY KEY,
      sale_id VARCHAR(40) NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
      product_id VARCHAR(30) NOT NULL,
      product_name VARCHAR(200) NOT NULL,
      quantity NUMERIC(12, 2) NOT NULL,
      unit_price NUMERIC(12, 2) NOT NULL,
      total NUMERIC(12, 2) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS customer_payments (
      id VARCHAR(40) PRIMARY KEY,
      customer_id VARCHAR(30) NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
      customer_name VARCHAR(200) NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      method VARCHAR(20) NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS transactions (
      id VARCHAR(40) PRIMARY KEY,
      type VARCHAR(20) NOT NULL,
      product_id VARCHAR(30) NOT NULL,
      product_name VARCHAR(200) NOT NULL,
      quantity NUMERIC(12, 2) NOT NULL,
      unit_price NUMERIC(12, 2) NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      customer_id VARCHAR(30),
      customer_name VARCHAR(200),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS employees (
      id VARCHAR(30) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      residency_number VARCHAR(80) NOT NULL UNIQUE,
      phone VARCHAR(60) NOT NULL,
      nationality VARCHAR(120) NOT NULL,
      salary NUMERIC(12, 2) NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS payroll_payments (
      id VARCHAR(40) PRIMARY KEY,
      employee_id VARCHAR(30) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      employee_name VARCHAR(200) NOT NULL,
      payment_month DATE NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS expenses (
      id VARCHAR(40) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      category VARCHAR(100) NOT NULL,
      payment_method VARCHAR(20) NOT NULL,
      expense_date DATE NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const defaults = await query('SELECT COUNT(*)::int AS count FROM categories');
  if (defaults.rows[0].count === 0) {
    await query(`INSERT INTO categories (id, name) VALUES
      ('CAT-001', 'مشروبات'), ('CAT-002', 'مخابز'), ('CAT-003', 'بقالة'), ('CAT-004', 'حلويات')`);
  }

  const users = await query('SELECT COUNT(*)::int AS count FROM users');
  if (users.rows[0].count === 0) {
    await query(`INSERT INTO users (id, username, password, full_name, role, status) VALUES
      ('U-001', 'admin', 'admin123', 'مدير النظام', 'admin', 'active'),
      ('U-002', 'sales', 'sales123', 'مندوب المبيعات', 'sales', 'active')`);
  }

  const products = await query('SELECT COUNT(*)::int AS count FROM products');
  if (products.rows[0].count === 0) {
    await query(`INSERT INTO products (id, name, sku, category, purchase_price, sale_price, current_quantity, min_stock_level) VALUES
      ('P-1001', 'مياه غازية', 'SKU-1001', 'مشروبات', 2.5, 5, 45, 15),
      ('P-1002', 'خبز عربي', 'SKU-1002', 'مخابز', 1.2, 2.5, 10, 12),
      ('P-1003', 'رز أبيض', 'SKU-1003', 'بقالة', 4, 7, 28, 18)`);
  }
}

function productPayload(payload) {
  const values = {
    name: String(payload.name || '').trim(), sku: String(payload.sku || '').trim(), category: String(payload.category || '').trim(),
    purchasePrice: Number(payload.purchasePrice), salePrice: Number(payload.salePrice), currentQuantity: Number(payload.currentQuantity), minStockLevel: Number(payload.minStockLevel),
  };
  if (!values.name || !values.sku || !values.category || Object.values(values).slice(3).some((value) => !Number.isFinite(value))) throw new Error('بيانات المنتج غير صحيحة');
  return values;
}

function contactPayload(payload, type) {
  const values = { name: String(payload.name || '').trim(), phone: String(payload.phone || '').trim(), company: String(payload.company || '').trim(), city: String(payload.city || '').trim() };
  if (!values.name || !values.phone || !values.company || !values.city) throw new Error(`يجب إدخال بيانات ${type} كاملة`);
  return { ...values, ...(type === 'العميل' ? { creditLimit: Number(payload.creditLimit || 0) } : { balance: Number(payload.balance || 0) }) };
}

function userPayload(payload) {
  const values = { username: String(payload.username || '').trim(), password: String(payload.password || '').trim(), fullName: String(payload.fullName || '').trim(), role: String(payload.role || 'sales').trim(), status: String(payload.status || 'active').trim() };
  if (!values.username || !values.password || !values.fullName) throw new Error('يجب إدخال بيانات المستخدم كاملة');
  return values;
}

function employeePayload(payload) {
  const values = {
    name: String(payload.name || '').trim(),
    residencyNumber: String(payload.residencyNumber || '').trim(),
    phone: String(payload.phone || '').trim(),
    nationality: String(payload.nationality || '').trim(),
    salary: Number(payload.salary),
  };
  if (!values.name || !values.residencyNumber || !values.phone || !values.nationality || !Number.isFinite(values.salary) || values.salary < 0) {
    throw new Error('يجب إدخال بيانات العامل والراتب بشكل صحيح');
  }
  return values;
}

async function nextId(prefix, table, width = 3) {
  const result = await query(`SELECT COUNT(*)::int + 1 AS next FROM ${table}`);
  return `${prefix}-${String(result.rows[0].next).padStart(width, '0')}`;
}

app.get('/api/categories', asyncHandler(async (req, res) => res.json((await query('SELECT id, name FROM categories ORDER BY id')).rows)));
app.post('/api/categories', asyncHandler(async (req, res) => {
  const name = String(req.body.name || '').trim();
  if (!name) return res.status(400).json({ message: 'يجب إدخال اسم التصنيف' });
  try { const result = await query('INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING id, name', [await nextId('CAT', 'categories'), name]); res.status(201).json(result.rows[0]); } catch (error) { res.status(409).json({ message: 'هذا التصنيف موجود بالفعل' }); }
}));

app.get('/api/products', asyncHandler(async (req, res) => res.json((await query('SELECT * FROM products ORDER BY created_at DESC')).rows.map(productFromRow))));
app.post('/api/products', asyncHandler(async (req, res) => { const p = productPayload(req.body); const id = await nextId('P', 'products', 4); const result = await query('INSERT INTO products (id, name, sku, category, purchase_price, sale_price, current_quantity, min_stock_level) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [id,p.name,p.sku,p.category,p.purchasePrice,p.salePrice,p.currentQuantity,p.minStockLevel]); res.status(201).json(productFromRow(result.rows[0])); }));
app.put('/api/products/:id', asyncHandler(async (req, res) => { const p = productPayload(req.body); const result = await query('UPDATE products SET name=$1, sku=$2, category=$3, purchase_price=$4, sale_price=$5, current_quantity=$6, min_stock_level=$7 WHERE id=$8 RETURNING *', [p.name,p.sku,p.category,p.purchasePrice,p.salePrice,p.currentQuantity,p.minStockLevel,req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المنتج غير موجود' }); res.json(productFromRow(result.rows[0])); }));
app.delete('/api/products/:id', asyncHandler(async (req, res) => { const result = await query('DELETE FROM products WHERE id=$1 RETURNING *', [req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المنتج غير موجود' }); res.json({ deletedProduct: productFromRow(result.rows[0]), message: 'تم حذف المنتج بنجاح' }); }));

app.get('/api/customers', asyncHandler(async (req, res) => res.json((await query('SELECT * FROM customers ORDER BY id')).rows.map(customerFromRow))));
app.post('/api/customers', asyncHandler(async (req, res) => { const p = contactPayload(req.body, 'العميل'); const id = await nextId('C', 'customers'); const result = await query('INSERT INTO customers (id,name,phone,company,city,credit_limit) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id,p.name,p.phone,p.company,p.city,p.creditLimit]); res.status(201).json(customerFromRow(result.rows[0])); }));
app.put('/api/customers/:id', asyncHandler(async (req, res) => { const p = contactPayload(req.body, 'العميل'); const result = await query('UPDATE customers SET name=$1,phone=$2,company=$3,city=$4,credit_limit=$5 WHERE id=$6 RETURNING *', [p.name,p.phone,p.company,p.city,p.creditLimit,req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'العميل غير موجود' }); res.json(customerFromRow(result.rows[0])); }));
app.delete('/api/customers/:id', asyncHandler(async (req, res) => { const result = await query('DELETE FROM customers WHERE id=$1 RETURNING *', [req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'العميل غير موجود' }); res.json({ deletedCustomer: customerFromRow(result.rows[0]), message: 'تم حذف العميل بنجاح' }); }));

app.get('/api/suppliers', asyncHandler(async (req, res) => res.json((await query('SELECT * FROM suppliers ORDER BY id')).rows.map(supplierFromRow))));
app.post('/api/suppliers', asyncHandler(async (req, res) => { const p = contactPayload(req.body, 'المورد'); const id = await nextId('S', 'suppliers'); const result = await query('INSERT INTO suppliers (id,name,phone,company,city,balance) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id,p.name,p.phone,p.company,p.city,p.balance]); res.status(201).json(supplierFromRow(result.rows[0])); }));
app.put('/api/suppliers/:id', asyncHandler(async (req, res) => { const p = contactPayload(req.body, 'المورد'); const result = await query('UPDATE suppliers SET name=$1,phone=$2,company=$3,city=$4,balance=$5 WHERE id=$6 RETURNING *', [p.name,p.phone,p.company,p.city,p.balance,req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المورد غير موجود' }); res.json(supplierFromRow(result.rows[0])); }));
app.delete('/api/suppliers/:id', asyncHandler(async (req, res) => { const result = await query('DELETE FROM suppliers WHERE id=$1 RETURNING *', [req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المورد غير موجود' }); res.json({ deletedSupplier: supplierFromRow(result.rows[0]), message: 'تم حذف المورد بنجاح' }); }));

app.get('/api/users', asyncHandler(async (req, res) => res.json((await query('SELECT id,username,full_name,role,status,created_at FROM users ORDER BY id')).rows.map((row) => ({ id: row.id, username: row.username, fullName: row.full_name, role: row.role, status: row.status, createdAt: row.created_at })))));
app.post('/api/login', asyncHandler(async (req, res) => { const result = await query('SELECT * FROM users WHERE username=$1 AND password=$2 AND status=$3', [String(req.body.username || '').trim(), String(req.body.password || '').trim(), 'active']); if (!result.rowCount) return res.status(401).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' }); const row = result.rows[0]; res.json({ id: row.id, username: row.username, fullName: row.full_name, role: row.role, status: row.status }); }));
app.post('/api/users', asyncHandler(async (req, res) => { const p = userPayload(req.body); const id = await nextId('U', 'users'); const result = await query('INSERT INTO users (id,username,password,full_name,role,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id,username,full_name,role,status,created_at', [id,p.username,p.password,p.fullName,p.role,p.status]); const row = result.rows[0]; res.status(201).json({ id: row.id, username: row.username, fullName: row.full_name, role: row.role, status: row.status, createdAt: row.created_at }); }));
app.put('/api/users/:id', asyncHandler(async (req, res) => { const p = userPayload(req.body); const result = await query('UPDATE users SET username=$1,password=$2,full_name=$3,role=$4,status=$5 WHERE id=$6 RETURNING id,username,full_name,role,status,created_at', [p.username,p.password,p.fullName,p.role,p.status,req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المستخدم غير موجود' }); const row=result.rows[0]; res.json({ id:row.id,username:row.username,fullName:row.full_name,role:row.role,status:row.status,createdAt:row.created_at }); }));
app.delete('/api/users/:id', asyncHandler(async (req, res) => { const result = await query('DELETE FROM users WHERE id=$1 RETURNING id,username,full_name,role,status', [req.params.id]); if (!result.rowCount) return res.status(404).json({ message: 'المستخدم غير موجود' }); const row=result.rows[0]; res.json({ deletedUser:{id:row.id,username:row.username,fullName:row.full_name,role:row.role,status:row.status}, message:'تم حذف المستخدم بنجاح' }); }));

app.get('/api/employees', asyncHandler(async (req, res) => {
  const result = await query('SELECT * FROM employees ORDER BY created_at DESC');
  res.json(result.rows.map(employeeFromRow));
}));
app.post('/api/employees', asyncHandler(async (req, res) => {
  const employee = employeePayload(req.body);
  const id = await nextId('E', 'employees');
  const result = await query('INSERT INTO employees (id,name,residency_number,phone,nationality,salary) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id, employee.name, employee.residencyNumber, employee.phone, employee.nationality, employee.salary]);
  res.status(201).json(employeeFromRow(result.rows[0]));
}));
app.put('/api/employees/:id', asyncHandler(async (req, res) => {
  const employee = employeePayload(req.body);
  const result = await query('UPDATE employees SET name=$1,residency_number=$2,phone=$3,nationality=$4,salary=$5 WHERE id=$6 RETURNING *', [employee.name, employee.residencyNumber, employee.phone, employee.nationality, employee.salary, req.params.id]);
  if (!result.rowCount) return res.status(404).json({ message: 'العامل غير موجود' });
  res.json(employeeFromRow(result.rows[0]));
}));
app.delete('/api/employees/:id', asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM employees WHERE id=$1 RETURNING *', [req.params.id]);
  if (!result.rowCount) return res.status(404).json({ message: 'العامل غير موجود' });
  res.json({ deletedEmployee: employeeFromRow(result.rows[0]), message: 'تم حذف العامل بنجاح' });
}));

app.get('/api/payroll', asyncHandler(async (req, res) => {
  const result = await query('SELECT * FROM payroll_payments ORDER BY payment_month DESC, created_at DESC');
  res.json(result.rows.map(payrollFromRow));
}));
app.post('/api/payroll', asyncHandler(async (req, res) => {
  const employeeId = String(req.body.employeeId || '').trim();
  const paymentMonth = String(req.body.paymentMonth || '').trim();
  const amount = Number(req.body.amount);
  const notes = String(req.body.notes || '').trim() || 'راتب شهري';
  if (!employeeId || !/^\d{4}-\d{2}$/.test(paymentMonth) || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'بيانات دفعة الراتب غير صحيحة' });
  }
  const employeeResult = await query('SELECT * FROM employees WHERE id=$1', [employeeId]);
  if (!employeeResult.rowCount) return res.status(404).json({ message: 'العامل غير موجود' });
  const employee = employeeResult.rows[0];
  const id = `PAY-${Date.now()}`;
  const result = await query('INSERT INTO payroll_payments (id,employee_id,employee_name,payment_month,amount,notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [id, employeeId, employee.name, `${paymentMonth}-01`, amount, notes]);
  res.status(201).json({ payment: payrollFromRow(result.rows[0]), message: 'تم تسجيل راتب العامل بنجاح' });
}));

app.get('/api/expenses', asyncHandler(async (req, res) => {
  const result = await query('SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC');
  res.json(result.rows.map(expenseFromRow));
}));
app.post('/api/expenses', asyncHandler(async (req, res) => {
  const title = String(req.body.title || '').trim();
  const category = String(req.body.category || '').trim();
  const paymentMethod = String(req.body.paymentMethod || '').trim();
  const expenseDate = String(req.body.expenseDate || '').trim();
  const amount = Number(req.body.amount);
  const notes = String(req.body.notes || '').trim();
  if (!title || !category || !['cash', 'bank', 'card'].includes(paymentMethod) || !/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'بيانات المصروف غير صحيحة' });
  }
  const id = `EXP-${Date.now()}`;
  const result = await query('INSERT INTO expenses (id,title,category,payment_method,expense_date,amount,notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [id, title, category, paymentMethod, expenseDate, amount, notes]);
  res.status(201).json({ expense: expenseFromRow(result.rows[0]), message: 'تم تسجيل المصروف بنجاح' });
}));
app.delete('/api/expenses/:id', asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM expenses WHERE id=$1 RETURNING *', [req.params.id]);
  if (!result.rowCount) return res.status(404).json({ message: 'المصروف غير موجود' });
  res.json({ deletedExpense: expenseFromRow(result.rows[0]), message: 'تم حذف المصروف بنجاح' });
}));

app.get('/api/transactions', asyncHandler(async (req, res) => res.json((await query('SELECT * FROM transactions ORDER BY created_at DESC')).rows.map(transactionFromRow))));
app.get('/api/payments', asyncHandler(async (req, res) => res.json((await query('SELECT * FROM customer_payments ORDER BY created_at DESC')).rows.map(paymentFromRow))));

async function reportData() {
  const salesResult = await query(`SELECT s.*, COALESCE(json_agg(json_build_object('productId', i.product_id, 'productName', i.product_name, 'quantity', i.quantity, 'unitPrice', i.unit_price, 'total', i.total) ORDER BY i.id) FILTER (WHERE i.id IS NOT NULL), '[]') AS items FROM sales s LEFT JOIN sale_items i ON i.sale_id=s.id GROUP BY s.id ORDER BY s.created_at DESC`);
  const paymentsResult = await query('SELECT * FROM customer_payments ORDER BY created_at DESC');
  const payrollResult = await query('SELECT * FROM payroll_payments ORDER BY payment_month DESC, created_at DESC');
  const expensesResult = await query('SELECT * FROM expenses ORDER BY expense_date DESC, created_at DESC');
  const sales = salesResult.rows.map(saleFromRow); const payments = paymentsResult.rows.map(paymentFromRow); const payroll = payrollResult.rows.map(payrollFromRow); const expenses = expensesResult.rows.map(expenseFromRow);
  return { sales, payments, payroll, expenses, summary: { totalSales: sales.reduce((sum, s) => sum + s.total, 0), totalCashSales: sales.filter((s) => s.paymentType === 'cash').reduce((sum, s) => sum + s.total, 0), totalCreditSales: sales.filter((s) => s.paymentType === 'credit').reduce((sum, s) => sum + s.total, 0), totalCollected: payments.reduce((sum, p) => sum + p.amount, 0), outstandingReceivables: sales.reduce((sum, s) => sum + s.remainingBalance, 0), totalPayroll: payroll.reduce((sum, p) => sum + p.amount, 0), totalExpenses: expenses.reduce((sum, expense) => sum + expense.amount, 0), activeCustomers: (await query('SELECT COUNT(*)::int AS count FROM customers')).rows[0].count, totalSalesCount: sales.length, totalPaymentsCount: payments.length, totalPayrollCount: payroll.length, totalExpensesCount: expenses.length } };
}
app.get('/api/reports', asyncHandler(async (req, res) => res.json(await reportData())));
app.get('/api/dashboard', asyncHandler(async (req, res) => { const result = await query('SELECT COUNT(*)::int AS total_products, COALESCE(SUM(current_quantity * purchase_price),0) AS inventory_value, COUNT(*) FILTER (WHERE current_quantity <= min_stock_level)::int AS low_stock_count FROM products'); const low = await query('SELECT id,name,current_quantity,min_stock_level FROM products WHERE current_quantity <= min_stock_level'); const row=result.rows[0]; res.json({ totalProducts:row.total_products, inventoryValue:Number(row.inventory_value), lowStockCount:row.low_stock_count, lowStockProducts:low.rows.map((p)=>({id:p.id,name:p.name,currentQuantity:Number(p.current_quantity),minStockLevel:Number(p.min_stock_level)})) }); }));

app.post('/api/stock', asyncHandler(async (req, res) => { const { productId, quantity, unitCost, type, notes } = req.body; const amount=Number(quantity); if (!productId || !['in','out'].includes(type) || !Number.isFinite(amount) || amount<=0) return res.status(400).json({message:'بيانات الحركة غير صحيحة'}); const client=await pool.connect(); try { await client.query('BEGIN'); const productResult=await client.query('SELECT * FROM products WHERE id=$1 FOR UPDATE',[productId]); if(!productResult.rowCount) throw new Error('المنتج غير موجود'); const product=productResult.rows[0]; if(type==='out' && amount>Number(product.current_quantity)) throw new Error('الكمية المنسحبة أكبر من الكمية الحالية'); const updated=await client.query('UPDATE products SET current_quantity=current_quantity+$1 WHERE id=$2 RETURNING *',[type==='in'?amount:-amount,productId]); const id=await nextId('T','transactions'); const transaction=await client.query('INSERT INTO transactions (id,type,product_id,product_name,quantity,unit_price,notes) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[id,type,productId,product.name,amount,Number(unitCost)||Number(product.purchase_price),notes || (type==='in'?'إضافة مخزون':'صرف مخزون')]); await client.query('COMMIT'); res.status(201).json({product:productFromRow(updated.rows[0]),transaction:transactionFromRow(transaction.rows[0])}); } catch(error) { await client.query('ROLLBACK'); res.status(400).json({message:error.message}); } finally { client.release(); } }));

app.post('/api/sales', asyncHandler(async (req, res) => { const { customerId, paymentType, items }=req.body; if(!Array.isArray(items)||!items.length||!['cash','credit'].includes(paymentType)) return res.status(400).json({message:'بيانات البيع غير صحيحة'}); const client=await pool.connect(); try { await client.query('BEGIN'); const customerResult=customerId?await client.query('SELECT * FROM customers WHERE id=$1',[customerId]):{rows:[]}; const customer=customerResult.rows[0]; if(paymentType==='credit'&&!customer) throw new Error('العميل غير موجود'); const saleItems=[]; let total=0; for(const item of items){ const result=await client.query('SELECT * FROM products WHERE id=$1 FOR UPDATE',[item.productId]); if(!result.rowCount) throw new Error('منتج غير موجود في السلة'); const product=result.rows[0]; const quantity=Number(item.quantity); if(!Number.isFinite(quantity)||quantity<=0||quantity>Number(product.current_quantity)) throw new Error(`الكمية المطلوبة من ${product.name} أكبر من الموجود`); const lineTotal=Number(product.sale_price)*quantity; saleItems.push({productId:product.id,productName:product.name,quantity,unitPrice:Number(product.sale_price),total:lineTotal}); total+=lineTotal; await client.query('UPDATE products SET current_quantity=current_quantity-$1 WHERE id=$2',[quantity,product.id]); } total=Number(total.toFixed(2)); const saleId=`S-${Date.now()}`; const sale=await client.query('INSERT INTO sales (id,customer_id,customer_name,payment_type,total,paid_amount,remaining_balance,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',[saleId,customer?customer.id:null,customer?customer.name:'نقدي',paymentType,paymentType==='cash'?total:0,paymentType==='cash'?0:total,paymentType==='cash'?'paid':'pending']); for(const item of saleItems){ await client.query('INSERT INTO sale_items (sale_id,product_id,product_name,quantity,unit_price,total) VALUES ($1,$2,$3,$4,$5,$6)',[saleId,item.productId,item.productName,item.quantity,item.unitPrice,item.total]); const transactionId=await nextId('T','transactions'); await client.query('INSERT INTO transactions (id,type,product_id,product_name,quantity,unit_price,notes,customer_id,customer_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',[transactionId,'out',item.productId,item.productName,item.quantity,item.unitPrice,paymentType==='credit'?`بيع آجل للعميل ${customer.name}`:'بيع نقدي',customer?customer.id:null,customer?customer.name:'نقدي']); } await client.query('COMMIT'); const saved=(await query(`SELECT s.*, COALESCE(json_agg(json_build_object('productId', i.product_id, 'productName', i.product_name, 'quantity', i.quantity, 'unitPrice', i.unit_price, 'total', i.total) ORDER BY i.id), '[]') AS items FROM sales s LEFT JOIN sale_items i ON i.sale_id=s.id WHERE s.id=$1 GROUP BY s.id`,[saleId])).rows[0]; res.status(201).json({sale:saleFromRow(saved),message:'تم حفظ البيع بنجاح'}); } catch(error){ await client.query('ROLLBACK'); res.status(400).json({message:error.message}); } finally{client.release();} }));

app.post('/api/payments', asyncHandler(async (req,res)=>{ const {customerId,amount,method='cash',notes=''}=req.body; const value=Number(amount); if(!customerId||!Number.isFinite(value)||value<=0||!['cash','bank','card'].includes(method)) return res.status(400).json({message:'بيانات الدفعة غير صحيحة'}); const client=await pool.connect(); try { await client.query('BEGIN'); const customer=(await client.query('SELECT * FROM customers WHERE id=$1',[customerId])).rows[0]; if(!customer) throw new Error('العميل غير موجود'); const outstanding=Number((await client.query("SELECT COALESCE(SUM(remaining_balance),0) AS total FROM sales WHERE customer_id=$1 AND payment_type='credit'",[customerId])).rows[0].total); if(value>outstanding) throw new Error(`المبلغ أكبر من المتبقي (${outstanding.toFixed(2)} ر.س)`); const id=`CP-${Date.now()}`; const payment=(await client.query('INSERT INTO customer_payments (id,customer_id,customer_name,amount,method,notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[id,customerId,customer.name,value,method,notes||'دفعة عميل'])).rows[0]; let remaining=value; const credits=(await client.query("SELECT id,remaining_balance,paid_amount FROM sales WHERE customer_id=$1 AND payment_type='credit' AND remaining_balance>0 ORDER BY created_at",[customerId])).rows; for(const sale of credits){if(remaining<=0)break;const applied=Math.min(Number(sale.remaining_balance),remaining);await client.query("UPDATE sales SET paid_amount=paid_amount+$1, remaining_balance=remaining_balance-$1, status=CASE WHEN remaining_balance-$1>0 THEN 'partial' ELSE 'paid' END WHERE id=$2",[applied,sale.id]);remaining-=applied;} await client.query('COMMIT'); res.status(201).json({payment:paymentFromRow(payment),message:'تم تسجيل الدفعة بنجاح'}); } catch(error){await client.query('ROLLBACK');res.status(400).json({message:error.message});}finally{client.release();} }));

app.use((error, req, res, next) => { console.error(error); if (!res.headersSent) res.status(400).json({ message: error.code === '23505' ? 'القيمة موجودة بالفعل' : error.message || 'حدث خطأ في الخادم' }); });
app.get('*', (req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));

initializeDatabase().then(()=>app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))).catch((error)=>{console.error('فشل الاتصال بقاعدة PostgreSQL:', error.message || error);process.exit(1);});

process.on('SIGTERM', async () => { await pool.end(); process.exit(0); });
