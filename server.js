const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const categories = [
  { id: 'CAT-001', name: 'مشروبات' },
  { id: 'CAT-002', name: 'مخابز' },
  { id: 'CAT-003', name: 'بقالة' },
  { id: 'CAT-004', name: 'حلويات' },
];

const products = [
  {
    id: 'P-1001',
    name: 'مياه غازية',
    sku: 'SKU-1001',
    category: 'مشروبات',
    purchasePrice: 2.5,
    salePrice: 5,
    currentQuantity: 45,
    minStockLevel: 15,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'P-1002',
    name: 'خبز عربي',
    sku: 'SKU-1002',
    category: 'مخابز',
    purchasePrice: 1.2,
    salePrice: 2.5,
    currentQuantity: 10,
    minStockLevel: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'P-1003',
    name: 'رز أبيض',
    sku: 'SKU-1003',
    category: 'بقالة',
    purchasePrice: 4,
    salePrice: 7,
    currentQuantity: 28,
    minStockLevel: 18,
    createdAt: new Date().toISOString(),
  },
];

const users = [
  {
    id: 'U-001',
    username: 'admin',
    password: 'admin123',
    fullName: 'مدير النظام',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'U-002',
    username: 'sales',
    password: 'sales123',
    fullName: 'مندوب المبيعات',
    role: 'sales',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

const customers = [
  { id: 'C-001', name: 'أحمد', phone: '0500000001', company: 'شركة الجودة', city: 'الرياض', creditLimit: 1500 },
  { id: 'C-002', name: 'سارة', phone: '0500000002', company: 'مجمع النور', city: 'جدة', creditLimit: 2500 },
  { id: 'C-003', name: 'محمد', phone: '0500000003', company: 'متجر الحجاز', city: 'الدمام', creditLimit: 3200 },
];

const suppliers = [
  { id: 'S-001', name: 'مؤسسة الشرق', phone: '0550000001', company: 'شرق للتوزيع', city: 'الرياض', balance: 4500 },
  { id: 'S-002', name: 'خالد', phone: '0550000002', company: 'مستودع النخبة', city: 'جدة', balance: 3200 },
];

const employees = [
  { id: 'E-001', name: 'خالد العتيبي', residencyNumber: '2345678901', phone: '0550000010', nationality: 'سعودي', salary: 4500, createdAt: new Date().toISOString() },
  { id: 'E-002', name: 'عمر أحمد', residencyNumber: '2456789012', phone: '0550000011', nationality: 'مصري', salary: 3500, createdAt: new Date().toISOString() },
];

const sales = [
  {
    id: 'S-1001',
    customerId: 'C-001',
    customerName: 'أحمد',
    paymentType: 'credit',
    items: [{ productId: 'P-1001', productName: 'مياه غازية', quantity: 5, unitPrice: 5, total: 25 }],
    total: 25,
    paidAmount: 0,
    remainingBalance: 25,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

const customerPayments = [
  {
    id: 'CP-1001',
    customerId: 'C-001',
    customerName: 'أحمد',
    amount: 25,
    method: 'cash',
    notes: 'دفعة أولية',
    createdAt: new Date().toISOString(),
  },
];

const payrollPayments = [];

const expenses = [];

const transactions = [
  {
    id: 'T-001',
    type: 'in',
    productId: 'P-1001',
    productName: 'مياه غازية',
    quantity: 30,
    unitPrice: 2.5,
    notes: 'إضافة مخزون أولية',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'T-002',
    type: 'out',
    productId: 'P-1002',
    productName: 'خبز عربي',
    quantity: 5,
    unitPrice: 1.2,
    notes: 'صرف داخلي',
    createdAt: new Date().toISOString(),
  },
];

function calculateInventoryValue() {
  return products.reduce((total, product) => total + product.currentQuantity * product.purchasePrice, 0);
}

function getLowStockProducts() {
  return products.filter((product) => product.currentQuantity <= product.minStockLevel);
}

function getDashboardSummary() {
  return {
    totalProducts: products.length,
    inventoryValue: calculateInventoryValue(),
    lowStockCount: getLowStockProducts().length,
    lowStockProducts: getLowStockProducts().map((product) => ({
      id: product.id,
      name: product.name,
      currentQuantity: product.currentQuantity,
      minStockLevel: product.minStockLevel,
    })),
  };
}

function getSalesReportSummary() {
  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCashSales = sales
    .filter((sale) => sale.paymentType === 'cash')
    .reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCreditSales = sales
    .filter((sale) => sale.paymentType === 'credit')
    .reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCollected = customerPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const outstandingReceivables = sales
    .filter((sale) => sale.paymentType === 'credit')
    .reduce((sum, sale) => sum + Number(sale.remainingBalance || 0), 0);

  return {
    totalSales,
    totalCashSales,
    totalCreditSales,
    totalCollected,
    outstandingReceivables,
    totalPayroll: payrollPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    totalExpenses: expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    activeCustomers: customers.length,
    totalSalesCount: sales.length,
    totalPaymentsCount: customerPayments.length,
    totalPayrollCount: payrollPayments.length,
    totalExpensesCount: expenses.length,
  };
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function createTransaction({ type, productId, productName, quantity, unitPrice, notes, customerId = null, customerName = null }) {
  const nextId = `T-${String(transactions.length + 1).padStart(3, '0')}`;

  const newTransaction = {
    id: nextId,
    type,
    productId,
    productName,
    quantity,
    unitPrice,
    notes: notes || 'لا يوجد ملاحظات',
    customerId,
    customerName,
    createdAt: new Date().toISOString(),
  };

  transactions.unshift(newTransaction);
  return newTransaction;
}

function sanitizeProductPayload(payload) {
  const name = String(payload.name || '').trim();
  const sku = String(payload.sku || '').trim();
  const category = String(payload.category || '').trim();
  const purchasePrice = Number(payload.purchasePrice);
  const salePrice = Number(payload.salePrice);
  const currentQuantity = Number(payload.currentQuantity);
  const minStockLevel = Number(payload.minStockLevel);

  if (!name || !sku || !category) {
    throw new Error('يجب إدخال اسم المنتج ورمز SKU والفئة');
  }

  if (!Number.isFinite(purchasePrice) || !Number.isFinite(salePrice) || !Number.isFinite(currentQuantity) || !Number.isFinite(minStockLevel)) {
    throw new Error('يجب إدخال قيم رقمية صحيحة');
  }

  return {
    name,
    sku,
    category,
    purchasePrice,
    salePrice,
    currentQuantity,
    minStockLevel,
  };
}

function sanitizeCustomerPayload(payload) {
  const name = String(payload.name || '').trim();
  const phone = String(payload.phone || '').trim();
  const company = String(payload.company || '').trim();
  const city = String(payload.city || '').trim();
  const creditLimit = Number(payload.creditLimit || 0);

  if (!name || !phone || !company || !city) {
    throw new Error('يجب إدخال اسم العميل والهاتف والشركة والمدينة');
  }

  return { name, phone, company, city, creditLimit };
}

function sanitizeSupplierPayload(payload) {
  const name = String(payload.name || '').trim();
  const phone = String(payload.phone || '').trim();
  const company = String(payload.company || '').trim();
  const city = String(payload.city || '').trim();
  const balance = Number(payload.balance || 0);

  if (!name || !phone || !company || !city) {
    throw new Error('يجب إدخال اسم المورد والهاتف والشركة والمدينة');
  }

  return { name, phone, company, city, balance };
}

function sanitizeUserPayload(payload) {
  const username = String(payload.username || '').trim();
  const password = String(payload.password || '').trim();
  const fullName = String(payload.fullName || '').trim();
  const role = String(payload.role || 'sales').trim();
  const status = String(payload.status || 'active').trim();

  if (!username || !password || !fullName) {
    throw new Error('يجب إدخال اسم المستخدم وكلمة المرور والاسم الكامل');
  }

  return { username, password, fullName, role, status };
}

function sanitizeEmployeePayload(payload) {
  const name = String(payload.name || '').trim();
  const residencyNumber = String(payload.residencyNumber || '').trim();
  const phone = String(payload.phone || '').trim();
  const nationality = String(payload.nationality || '').trim();
  const salary = Number(payload.salary);

  if (!name || !residencyNumber || !phone || !nationality || !Number.isFinite(salary) || salary < 0) {
    throw new Error('يجب إدخال بيانات العامل بشكل صحيح');
  }

  return { name, residencyNumber, phone, nationality, salary };
}

function sanitizeCategoryPayload(payload) {
  const name = String(payload.name || '').trim();

  if (!name) {
    throw new Error('يجب إدخال اسم التصنيف');
  }

  return { name };
}

function createCustomerPayment({ customerId, amount, method = 'cash', notes = '' }) {
  const customer = customers.find((item) => item.id === customerId);

  if (!customer) {
    throw new Error('العميل غير موجود');
  }

  const paymentValue = Number(amount);
  if (!Number.isFinite(paymentValue) || paymentValue <= 0) {
    throw new Error('قيمة الدفعة غير صحيحة');
  }

  const outstandingBalance = sales
    .filter((sale) => sale.customerId === customer.id && sale.paymentType === 'credit')
    .reduce((sum, sale) => sum + Number(sale.remainingBalance || 0), 0);

  if (outstandingBalance <= 0) {
    throw new Error('لا يوجد مبلغ مستحق على هذا العميل');
  }

  if (paymentValue > outstandingBalance) {
    throw new Error(`المبلغ أكبر من المتبقي (${outstandingBalance.toFixed(2)} ر.س)`);
  }

  if (!['cash', 'bank', 'card'].includes(method)) {
    throw new Error('طريقة الدفع غير صحيحة');
  }

  const payment = {
    id: `CP-${String(customerPayments.length + 1).padStart(4, '0')}`,
    customerId: customer.id,
    customerName: customer.name,
    amount: paymentValue,
    method,
    notes: notes || 'دفعة عميل',
    createdAt: new Date().toISOString(),
  };

  customerPayments.unshift(payment);

  const creditSales = sales.filter(
    (sale) => sale.customerId === customer.id && sale.paymentType === 'credit' && sale.remainingBalance > 0
  );

  let remainingPayment = paymentValue;
  creditSales.forEach((sale) => {
    if (remainingPayment <= 0) return;

    const applied = Math.min(sale.remainingBalance, remainingPayment);
    sale.paidAmount = Number((Number(sale.paidAmount) + applied).toFixed(2));
    sale.remainingBalance = Number((Number(sale.remainingBalance) - applied).toFixed(2));
    sale.status = sale.remainingBalance > 0 ? 'partial' : 'paid';
    remainingPayment = Number((remainingPayment - applied).toFixed(2));
  });

  return payment;
}

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  try {
    const payload = sanitizeCategoryPayload(req.body);
    const exists = categories.some((category) => category.name.toLowerCase() === payload.name.toLowerCase());

    if (exists) {
      return res.status(409).json({ message: 'هذا التصنيف موجود بالفعل' });
    }

    const category = {
      id: `CAT-${String(categories.length + 1).padStart(3, '0')}`,
      name: payload.name,
    };

    categories.push(category);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/dashboard', (req, res) => {
  res.json(getDashboardSummary());
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  try {
    const payload = sanitizeProductPayload(req.body);
    const existingProduct = products.find((product) => product.sku.toLowerCase() === payload.sku.toLowerCase());

    if (existingProduct) {
      return res.status(409).json({ message: 'هذا الكود موجود بالفعل' });
    }

    const productId = `P-${String(products.length + 101).padStart(4, '0')}`;

    const newProduct = {
      id: productId,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    products.unshift(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    const payload = sanitizeProductPayload(req.body);
    const duplicate = products.find(
      (item) => item.id !== product.id && item.sku.toLowerCase() === payload.sku.toLowerCase()
    );

    if (duplicate) {
      return res.status(409).json({ message: 'هذا الكود مستخدم من منتج آخر' });
    }

    Object.assign(product, payload);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex((product) => product.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'المنتج غير موجود' });
  }

  const [deletedProduct] = products.splice(productIndex, 1);
  res.json({ deletedProduct, message: 'تم حذف المنتج بنجاح' });
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
  try {
    const payload = sanitizeCustomerPayload(req.body);
    const customer = {
      id: `C-${String(customers.length + 1).padStart(3, '0')}`,
      ...payload,
    };

    customers.push(customer);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/customers/:id', (req, res) => {
  try {
    const customer = customers.find((item) => item.id === req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'العميل غير موجود' });
    }

    const payload = sanitizeCustomerPayload(req.body);
    Object.assign(customer, payload);
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  const index = customers.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'العميل غير موجود' });
  }

  const [deletedCustomer] = customers.splice(index, 1);
  res.json({ deletedCustomer, message: 'تم حذف العميل بنجاح' });
});

app.get('/api/suppliers', (req, res) => {
  res.json(suppliers);
});

app.post('/api/suppliers', (req, res) => {
  try {
    const payload = sanitizeSupplierPayload(req.body);
    const supplier = {
      id: `S-${String(suppliers.length + 1).padStart(3, '0')}`,
      ...payload,
    };

    suppliers.push(supplier);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/suppliers/:id', (req, res) => {
  try {
    const supplier = suppliers.find((item) => item.id === req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: 'المورد غير موجود' });
    }

    const payload = sanitizeSupplierPayload(req.body);
    Object.assign(supplier, payload);
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/suppliers/:id', (req, res) => {
  const index = suppliers.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'المورد غير موجود' });
  }

  const [deletedSupplier] = suppliers.splice(index, 1);
  res.json({ deletedSupplier, message: 'تم حذف المورد بنجاح' });
});

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.post('/api/employees', (req, res) => {
  try {
    const payload = sanitizeEmployeePayload(req.body);
    if (employees.some((employee) => employee.residencyNumber === payload.residencyNumber)) {
      return res.status(409).json({ message: 'رقم الإقامة مستخدم بالفعل' });
    }

    const employee = {
      id: `E-${String(employees.length + 1).padStart(3, '0')}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };
    employees.unshift(employee);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/employees/:id', (req, res) => {
  try {
    const employee = employees.find((item) => item.id === req.params.id);
    if (!employee) return res.status(404).json({ message: 'العامل غير موجود' });

    const payload = sanitizeEmployeePayload(req.body);
    if (employees.some((item) => item.id !== employee.id && item.residencyNumber === payload.residencyNumber)) {
      return res.status(409).json({ message: 'رقم الإقامة مستخدم من عامل آخر' });
    }

    Object.assign(employee, payload);
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/employees/:id', (req, res) => {
  const index = employees.findIndex((employee) => employee.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'العامل غير موجود' });

  const [deletedEmployee] = employees.splice(index, 1);
  res.json({ deletedEmployee, message: 'تم حذف العامل بنجاح' });
});

app.get('/api/payroll', (req, res) => {
  res.json(payrollPayments);
});

app.post('/api/payroll', (req, res) => {
  const employeeId = String(req.body.employeeId || '').trim();
  const paymentMonth = String(req.body.paymentMonth || '').trim();
  const amount = Number(req.body.amount);
  const notes = String(req.body.notes || '').trim() || 'راتب شهري';

  if (!employeeId || !/^\d{4}-\d{2}$/.test(paymentMonth) || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'بيانات دفعة الراتب غير صحيحة' });
  }

  const employee = employees.find((item) => item.id === employeeId);
  if (!employee) return res.status(404).json({ message: 'العامل غير موجود' });

  const payment = {
    id: `PAY-${Date.now()}`,
    employeeId,
    employeeName: employee.name,
    paymentMonth: `${paymentMonth}-01`,
    amount,
    notes,
    createdAt: new Date().toISOString(),
  };

  payrollPayments.unshift(payment);
  res.status(201).json({ payment, message: 'تم تسجيل راتب العامل بنجاح' });
});

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const title = String(req.body.title || '').trim();
  const category = String(req.body.category || '').trim();
  const paymentMethod = String(req.body.paymentMethod || '').trim();
  const expenseDate = String(req.body.expenseDate || '').trim();
  const amount = Number(req.body.amount);
  const notes = String(req.body.notes || '').trim();

  if (!title || !category || !paymentMethod || !/^\d{4}-\d{2}-\d{2}$/.test(expenseDate) || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'بيانات المصروف غير صحيحة' });
  }

  const expense = {
    id: `EXP-${Date.now()}`,
    title,
    category,
    paymentMethod,
    expenseDate,
    amount,
    notes,
    createdAt: new Date().toISOString(),
  };

  expenses.unshift(expense);
  res.status(201).json({ expense, message: 'تم تسجيل المصروف بنجاح' });
});

app.delete('/api/expenses/:id', (req, res) => {
  const index = expenses.findIndex((expense) => expense.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'المصروف غير موجود' });

  const [deletedExpense] = expenses.splice(index, 1);
  res.json({ deletedExpense, message: 'تم حذف المصروف بنجاح' });
});

app.get('/api/users', (req, res) => {
  res.json(users.map((user) => ({ ...user, password: undefined })));
});

app.post('/api/login', (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '').trim();

  if (!username || !password) {
    return res.status(400).json({ message: 'يجب إدخال اسم المستخدم وكلمة المرور' });
  }

  const user = users.find(
    (item) => item.username === username && item.password === password && item.status === 'active'
  );

  if (!user) {
    return res.status(401).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
  }

  const safeUser = { ...user };
  delete safeUser.password;
  res.json(safeUser);
});

app.post('/api/users', (req, res) => {
  try {
    const payload = sanitizeUserPayload(req.body);
    const duplicateUser = users.find((user) => user.username.toLowerCase() === payload.username.toLowerCase());

    if (duplicateUser) {
      return res.status(409).json({ message: 'اسم المستخدم موجود بالفعل' });
    }

    const user = {
      id: `U-${String(users.length + 1).padStart(3, '0')}`,
      ...payload,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const user = users.find((item) => item.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    const payload = sanitizeUserPayload(req.body);
    const duplicateUser = users.find(
      (item) => item.id !== user.id && item.username.toLowerCase() === payload.username.toLowerCase()
    );

    if (duplicateUser) {
      return res.status(409).json({ message: 'اسم المستخدم مستخدم من حساب آخر' });
    }

    Object.assign(user, payload);
    const safeUser = { ...user };
    delete safeUser.password;
    res.json(safeUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

  const [deletedUser] = users.splice(index, 1);
  const safeUser = { ...deletedUser };
  delete safeUser.password;
  res.json({ deletedUser: safeUser, message: 'تم حذف المستخدم بنجاح' });
});

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/api/payments', (req, res) => {
  res.json(customerPayments);
});

app.post('/api/payments', (req, res) => {
  try {
    const { customerId, amount, method, notes } = req.body;
    const payment = createCustomerPayment({
      customerId,
      amount,
      method: method || 'cash',
      notes,
    });

    res.status(201).json({ payment, message: 'تم تسجيل الدفعة بنجاح' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/reports', (req, res) => {
  res.json({
    summary: getSalesReportSummary(),
    sales,
    payments: customerPayments,
    payroll: payrollPayments,
    expenses,
  });
});

app.post('/api/stock', (req, res) => {
  try {
    const { productId, quantity, unitCost, type, notes } = req.body;
    const stockQuantity = Number(quantity);
    const costValue = Number(unitCost);

    if (!productId || !type || !Number.isFinite(stockQuantity) || stockQuantity <= 0) {
      return res.status(400).json({ message: 'بيانات الحركة غير صحيحة' });
    }

    const product = getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    if (type === 'out' && stockQuantity > product.currentQuantity) {
      return res.status(400).json({ message: 'الكمية المنسحبة أكبر من الكمية الحالية' });
    }

    const delta = type === 'in' ? stockQuantity : -stockQuantity;
    product.currentQuantity = Math.max(0, product.currentQuantity + delta);

    const transaction = createTransaction({
      type,
      productId: product.id,
      productName: product.name,
      quantity: stockQuantity,
      unitPrice: costValue || product.purchasePrice,
      notes: notes || (type === 'in' ? 'إضافة مخزون' : 'صرف مخزون'),
    });

    res.status(201).json({ product, transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/sales', (req, res) => {
  try {
    const { customerId, paymentType, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'يجب إضافة عناصر مباعة' });
    }

    const customer = customers.find((item) => item.id === customerId);
    if (!customer && paymentType === 'credit') {
      return res.status(404).json({ message: 'العميل غير موجود' });
    }

    const saleItems = [];
    let totalSale = 0;

    items.forEach((item) => {
      const product = getProductById(item.productId);

      if (!product) {
        throw new Error('منتج غير موجود في السلة');
      }

      const quantity = Number(item.quantity);
      if (!Number.isFinite(quantity) || quantity <= 0) {
        throw new Error('الكمية غير صحيحة');
      }

      if (quantity > product.currentQuantity) {
        throw new Error(`الكمية المطلوبة من ${product.name} أكبر من الموجود`);
      }

      const lineTotal = product.salePrice * quantity;
      saleItems.push({
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.salePrice,
        total: lineTotal,
      });

      totalSale += lineTotal;
      product.currentQuantity -= quantity;
    });

    const saleRecord = {
      id: `S-${String(Date.now()).slice(-6)}`,
      customerId: customer ? customer.id : null,
      customerName: customer ? customer.name : 'نقدي',
      paymentType,
      items: saleItems,
      total: Number(totalSale.toFixed(2)),
      paidAmount: paymentType === 'cash' ? Number(totalSale.toFixed(2)) : 0,
      remainingBalance: paymentType === 'cash' ? 0 : Number(totalSale.toFixed(2)),
      status: paymentType === 'cash' ? 'paid' : 'pending',
      createdAt: new Date().toISOString(),
    };

    sales.unshift(saleRecord);

    saleItems.forEach((item) => {
      createTransaction({
        type: 'out',
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        notes: paymentType === 'credit' ? `بيع آجل للعميل ${customer.name}` : 'بيع نقدي',
        customerId: customer ? customer.id : null,
        customerName: customer ? customer.name : 'نقدي',
      });
    });

    res.status(201).json({ sale: saleRecord, message: 'تم حفظ البيع بنجاح' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
