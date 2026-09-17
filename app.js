const state = {
  products: [],
  customers: [],
  suppliers: [],
  employees: [],
  expenses: [],
  users: [],
  transactions: [],
  categories: [],
  dashboard: {},
  reports: { summary: {}, sales: [], payments: [], payroll: [] },
  currentUser: null,
  selectedProductId: null,
  selectedCustomerId: null,
  selectedSupplierId: null,
  selectedEmployeeId: null,
  selectedUserId: null,
  saleItems: [],
};

const elements = {
  appShell: document.getElementById('appShell'),
  loginScreen: document.getElementById('loginScreen'),
  loginForm: document.getElementById('loginForm'),
  logoutBtn: document.getElementById('logoutBtn'),
  navButtons: document.querySelectorAll('.nav-btn'),
  statusMessage: document.getElementById('statusMessage'),
  currentUserBadge: document.getElementById('currentUserBadge'),
  productForm: document.getElementById('productForm'),
  categorySelect: document.getElementById('categorySelect'),
  newCategoryInput: document.getElementById('newCategoryInput'),
  addCategoryBtn: document.getElementById('addCategoryBtn'),
  categoryList: document.getElementById('categoryList'),
  resetProductFormBtn: document.getElementById('resetProductFormBtn'),
  productsTableBody: document.getElementById('productsTableBody'),
  productSearch: document.getElementById('productSearch'),
  stockForm: document.getElementById('stockForm'),
  stockProductSelect: document.getElementById('stockProductSelect'),
  transactionsTableBody: document.getElementById('transactionsTableBody'),
  movementInTotal: document.getElementById('movementInTotal'),
  movementOutTotal: document.getElementById('movementOutTotal'),
  movementCountTotal: document.getElementById('movementCountTotal'),
  movementNetTotal: document.getElementById('movementNetTotal'),
  movementChart: document.getElementById('movementChart'),
  movementActivityList: document.getElementById('movementActivityList'),
  movementRecordCount: document.getElementById('movementRecordCount'),
  customerSalesSearch: document.getElementById('customerSalesSearch'),
  customerSelectionWrapper: document.getElementById('customerSelectionWrapper'),
  customerSelect: document.getElementById('customerSelect'),
  paymentTypeSelect: document.getElementById('paymentTypeSelect'),
  saleProductGrid: document.getElementById('saleProductGrid'),
  saleItemsContainer: document.getElementById('saleItemsContainer'),
  saleTotalValue: document.getElementById('saleTotalValue'),
  saleItemCount: document.getElementById('saleItemCount'),
  saleCartTotal: document.getElementById('saleCartTotal'),
  saveSaleBtn: document.getElementById('saveSaleBtn'),
  lowStockList: document.getElementById('lowStockList'),
  totalProductsValue: document.getElementById('totalProductsValue'),
  inventoryValue: document.getElementById('inventoryValue'),
  lowStockValue: document.getElementById('lowStockValue'),
  saleReadyCount: document.getElementById('saleReadyCount'),
  purchaseValue: document.getElementById('purchaseValue'),
  customerForm: document.getElementById('customerForm'),
  customerSearch: document.getElementById('customerSearch'),
  customersTableBody: document.getElementById('customersTableBody'),
  customerBalanceSearch: document.getElementById('customerBalanceSearch'),
  customerBalanceFilter: document.getElementById('customerBalanceFilter'),
  customerBalanceTotal: document.getElementById('customerBalanceTotal'),
  resetCustomerFormBtn: document.getElementById('resetCustomerFormBtn'),
  supplierForm: document.getElementById('supplierForm'),
  supplierSearch: document.getElementById('supplierSearch'),
  suppliersTableBody: document.getElementById('suppliersTableBody'),
  resetSupplierFormBtn: document.getElementById('resetSupplierFormBtn'),
  employeeForm: document.getElementById('employeeForm'),
  employeeSearch: document.getElementById('employeeSearch'),
  employeesTableBody: document.getElementById('employeesTableBody'),
  resetEmployeeFormBtn: document.getElementById('resetEmployeeFormBtn'),
  expenseForm: document.getElementById('expenseForm'),
  expenseTitle: document.getElementById('expenseTitle'),
  expenseCategory: document.getElementById('expenseCategory'),
  expenseAmount: document.getElementById('expenseAmount'),
  expenseDate: document.getElementById('expenseDate'),
  expensePaymentMethod: document.getElementById('expensePaymentMethod'),
  expenseNotes: document.getElementById('expenseNotes'),
  expenseSearch: document.getElementById('expenseSearch'),
  expenseCategoryFilter: document.getElementById('expenseCategoryFilter'),
  expensesTableBody: document.getElementById('expensesTableBody'),
  expensesTotalValue: document.getElementById('expensesTotalValue'),
  expensesMonthValue: document.getElementById('expensesMonthValue'),
  expensesMonthLabel: document.getElementById('expensesMonthLabel'),
  expensesCountValue: document.getElementById('expensesCountValue'),
  expenseCategorySummary: document.getElementById('expenseCategorySummary'),
  payrollForm: document.getElementById('payrollForm'),
  payrollEmployeeSelect: document.getElementById('payrollEmployeeSelect'),
  payrollMonth: document.getElementById('payrollMonth'),
  payrollAmount: document.getElementById('payrollAmount'),
  payrollNotes: document.getElementById('payrollNotes'),
  userForm: document.getElementById('userForm'),
  userSearch: document.getElementById('userSearch'),
  usersTableBody: document.getElementById('usersTableBody'),
  resetUserFormBtn: document.getElementById('resetUserFormBtn'),
  salesReportTableBody: document.getElementById('salesReportTableBody'),
  paymentsReportTableBody: document.getElementById('paymentsReportTableBody'),
  payrollReportTableBody: document.getElementById('payrollReportTableBody'),
  reportSalesTotal: document.getElementById('reportSalesTotal'),
  reportCashTotal: document.getElementById('reportCashTotal'),
  reportCreditTotal: document.getElementById('reportCreditTotal'),
  reportReceiptsTotal: document.getElementById('reportReceiptsTotal'),
  reportOutstandingTotal: document.getElementById('reportOutstandingTotal'),
  reportPayrollTotal: document.getElementById('reportPayrollTotal'),
  reportExpensesTotal: document.getElementById('reportExpensesTotal'),
  reportProductCostTotal: document.getElementById('reportProductCostTotal'),
  reportNetProfitTotal: document.getElementById('reportNetProfitTotal'),
  reportDateFrom: document.getElementById('reportDateFrom'),
  reportDateTo: document.getElementById('reportDateTo'),
  reportCalendarType: document.getElementById('reportCalendarType'),
  reportPeriodLabel: document.getElementById('reportPeriodLabel'),
  printReportsBtn: document.getElementById('printReportsBtn'),
  resetReportDatesBtn: document.getElementById('resetReportDatesBtn'),
  customerPaymentForm: document.getElementById('customerPaymentForm'),
  customerPaymentSearch: document.getElementById('customerPaymentSearch'),
  customerPaymentCustomerSelect: document.getElementById('customerPaymentCustomerSelect'),
  customerPaymentSummary: document.getElementById('customerPaymentSummary'),
  customerPaymentAmount: document.getElementById('customerPaymentAmount'),
  customerPaymentMethod: document.getElementById('customerPaymentMethod'),
  customerPaymentNotes: document.getElementById('customerPaymentNotes'),
  customerPaymentsTableBody: document.getElementById('customerPaymentsTableBody'),
  customerPaymentsSearch: document.getElementById('customerPaymentsSearch'),
  customerPaymentsTotal: document.getElementById('customerPaymentsTotal'),
  customerBalanceList: document.getElementById('customerBalanceList'),
};

function formatCurrency(value) {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function setStatus(message, isSuccess = true) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.style.background = isSuccess ? 'rgba(27, 169, 119, 0.12)' : 'rgba(239, 68, 68, 0.12)';
  elements.statusMessage.style.color = isSuccess ? '#1ba977' : '#ef4444';
}

function updateCurrentUserBadge() {
  const userName = state.currentUser ? state.currentUser.fullName : 'زائر';
  elements.currentUserBadge.textContent = userName;
}

function showLoginScreen() {
  elements.loginScreen.classList.remove('hidden');
  elements.appShell.classList.add('hidden');
}

function showAppScreen() {
  elements.loginScreen.classList.add('hidden');
  elements.appShell.classList.remove('hidden');
  updateCurrentUserBadge();
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === `${viewName}View`);
  });

  elements.navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.view === viewName);
  });
}

function updateDashboard() {
  const { totalProducts, inventoryValue: totalInventory, lowStockCount, lowStockProducts = [] } = state.dashboard;
  const readyForSale = state.products.filter((product) => product.currentQuantity > 0).length;
  const purchaseTotal = state.products.reduce((total, product) => total + product.purchasePrice * product.currentQuantity, 0);

  elements.totalProductsValue.textContent = totalProducts || 0;
  elements.inventoryValue.textContent = formatCurrency(totalInventory || 0);
  elements.lowStockValue.textContent = lowStockCount || 0;
  elements.saleReadyCount.textContent = readyForSale;
  elements.purchaseValue.textContent = formatCurrency(purchaseTotal);

  if (!lowStockProducts.length) {
    elements.lowStockList.innerHTML = '<li class="empty-state">لا توجد تنبيهات حاليا</li>';
    return;
  }

  elements.lowStockList.innerHTML = lowStockProducts
    .map(
      (product) => `
        <li>
          <span>${product.name}</span>
          <strong>${product.currentQuantity} / ${product.minStockLevel}</strong>
        </li>
      `
    )
    .join('');
}

function renderCategoryOptions() {
  const options = state.categories
    .map((category) => `<option value="${category.name}">${category.name}</option>`)
    .join('');

  elements.categorySelect.innerHTML = options || '<option value="">لا يوجد تصنيفات</option>';
}

function renderCategoriesList() {
  if (!state.categories.length) {
    elements.categoryList.innerHTML = '<div class="empty-state">لا توجد تصنيفات حتى الآن</div>';
    return;
  }

  elements.categoryList.innerHTML = state.categories
    .map(
      (category) => `
        <button type="button" class="category-chip" data-category-name="${category.name}">
          ${category.name}
        </button>
      `
    )
    .join('');
}

function renderProductsTable() {
  const searchTerm = elements.productSearch.value.trim().toLowerCase();
  const filteredProducts = state.products.filter((product) => {
    const searchableText = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
    return searchableText.includes(searchTerm);
  });

  if (!filteredProducts.length) {
    elements.productsTableBody.innerHTML = '<tr><td colspan="10" class="empty-state">لا توجد نتائج</td></tr>';
    return;
  }

  elements.productsTableBody.innerHTML = filteredProducts
    .map((product, index) => {
      const stockState = product.currentQuantity <= product.minStockLevel ? 'warning' : 'safe';
      const stockText = product.currentQuantity <= product.minStockLevel ? 'منخفض' : 'مستقر';

      return `
        <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.sku}</td>
          <td>${product.category}</td>
          <td>${formatCurrency(product.purchasePrice)}</td>
          <td>${formatCurrency(product.salePrice)}</td>
          <td>${product.currentQuantity}</td>
          <td>${product.minStockLevel}</td>
          <td><span class="badge ${stockState}">${stockText}</span></td>
          <td>
            <div class="action-group">
              <button class="action-btn edit" data-action="edit" data-id="${product.id}">تعديل</button>
              <button class="action-btn delete" data-action="delete" data-id="${product.id}">حذف</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function renderTransactionsTable() {
  const incomingQuantity = state.transactions
    .filter((transaction) => transaction.type === 'in')
    .reduce((total, transaction) => total + Number(transaction.quantity || 0), 0);
  const outgoingQuantity = state.transactions
    .filter((transaction) => transaction.type === 'out' || transaction.type === 'sale')
    .reduce((total, transaction) => total + Number(transaction.quantity || 0), 0);
  const netQuantity = incomingQuantity - outgoingQuantity;

  elements.movementInTotal.textContent = incomingQuantity.toLocaleString('ar-SA');
  elements.movementOutTotal.textContent = outgoingQuantity.toLocaleString('ar-SA');
  elements.movementCountTotal.textContent = state.transactions.length.toLocaleString('ar-SA');
  elements.movementNetTotal.textContent = `${netQuantity < 0 ? '-' : ''}${Math.abs(netQuantity).toLocaleString('ar-SA')}`;
  elements.movementNetTotal.classList.toggle('negative', netQuantity < 0);
  elements.movementRecordCount.textContent = `${state.transactions.length.toLocaleString('ar-SA')} سجل`;

  renderMovementChart(incomingQuantity, outgoingQuantity);
  renderMovementActivity();

  if (!state.transactions.length) {
    elements.transactionsTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد عمليات حتى الآن</td></tr>';
    return;
  }

  elements.transactionsTableBody.innerHTML = state.transactions
    .map(
      (transaction) => `
        <tr>
          <td>${transaction.type === 'in' ? 'إضافة' : transaction.type === 'out' ? 'صرف' : 'بيع'}</td>
          <td>${transaction.productName}</td>
          <td>${transaction.quantity}</td>
          <td>${formatCurrency(transaction.unitPrice)}</td>
          <td>${new Date(transaction.createdAt).toLocaleString('ar-SA')}</td>
          <td>${transaction.notes}</td>
        </tr>
      `
    )
    .join('');
}

function renderMovementChart(incomingQuantity, outgoingQuantity) {
  const maximumQuantity = Math.max(incomingQuantity, outgoingQuantity, 1);
  elements.movementChart.innerHTML = `
    <div class="movement-chart-axis"><span>حجم الوحدات</span><span>${Math.max(incomingQuantity, outgoingQuantity).toLocaleString('ar-SA')}</span></div>
    <div class="movement-chart-bars">
      <div class="movement-bar-group">
        <div class="movement-bar-value">${incomingQuantity.toLocaleString('ar-SA')}</div>
        <div class="movement-bar in" style="height: ${Math.max(10, (incomingQuantity / maximumQuantity) * 100)}%"><span></span></div>
        <strong>إضافة</strong>
      </div>
      <div class="movement-bar-group">
        <div class="movement-bar-value">${outgoingQuantity.toLocaleString('ar-SA')}</div>
        <div class="movement-bar out" style="height: ${Math.max(10, (outgoingQuantity / maximumQuantity) * 100)}%"><span></span></div>
        <strong>صرف</strong>
      </div>
    </div>
  `;
}

function renderMovementActivity() {
  const latestTransactions = state.transactions.slice(0, 4);
  if (!latestTransactions.length) {
    elements.movementActivityList.innerHTML = '<div class="empty-state">ستظهر آخر الحركات هنا</div>';
    return;
  }

  elements.movementActivityList.innerHTML = latestTransactions.map((transaction) => {
    const isIncoming = transaction.type === 'in';
    return `
      <div class="movement-activity-item">
        <span class="movement-activity-icon ${isIncoming ? 'in' : 'out'}">${isIncoming ? '↗' : '↘'}</span>
        <div class="movement-activity-info">
          <strong>${transaction.productName}</strong>
          <small>${isIncoming ? 'إضافة للمخزون' : 'صرف من المخزون'} · ${new Date(transaction.createdAt).toLocaleDateString('ar-SA')}</small>
        </div>
        <b class="${isIncoming ? 'in' : 'out'}">${isIncoming ? '+' : '-'}${transaction.quantity}</b>
      </div>
    `;
  }).join('');
}

function renderProductSelects() {
  const options = state.products
    .map((product) => `<option value="${product.id}">${product.name} - ${product.currentQuantity} متوفر</option>`)
    .join('');

  elements.stockProductSelect.innerHTML = options || '<option value="">لا توجد منتجات</option>';
}

function getCustomerAccountSummary(customerId) {
  const customerSales = (state.reports.sales || []).filter((sale) => sale.customerId === customerId);
  const customerPayments = (state.reports.payments || []).filter((payment) => payment.customerId === customerId);

  const totalPurchases = customerSales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalPayments = customerPayments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const remaining = customerSales.reduce((sum, sale) => sum + Number(sale.remainingBalance || 0), 0);

  return {
    totalPurchases,
    totalPayments,
    remaining,
    salesCount: customerSales.length,
    paymentCount: customerPayments.length,
  };
}

function renderCustomersTable() {
  const searchTerm = elements.customerSearch.value.trim().toLowerCase();
  const filteredCustomers = state.customers.filter((customer) => {
    const searchText = `${customer.name} ${customer.phone} ${customer.company} ${customer.city}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  if (!filteredCustomers.length) {
    elements.customersTableBody.innerHTML = '<tr><td colspan="9" class="empty-state">لا توجد نتائج</td></tr>';
    return;
  }

  elements.customersTableBody.innerHTML = filteredCustomers
    .map((customer) => {
      const summary = getCustomerAccountSummary(customer.id);

      return `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.phone}</td>
          <td>${customer.company}</td>
          <td>${customer.city}</td>
          <td>${formatCurrency(customer.creditLimit)}</td>
          <td>${formatCurrency(summary.totalPurchases)}</td>
          <td>${formatCurrency(summary.totalPayments)}</td>
          <td>${formatCurrency(summary.remaining)}</td>
          <td>
            <div class="action-group">
              <button class="action-btn edit" data-customer-action="edit" data-id="${customer.id}">تعديل</button>
              <button class="action-btn delete" data-customer-action="delete" data-id="${customer.id}">حذف</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function renderCustomerBalanceList() {
  const searchTerm = (elements.customerBalanceSearch?.value || '').trim().toLowerCase();
  const filter = elements.customerBalanceFilter?.value || 'all';
  const filteredCustomers = state.customers
    .map((customer) => ({ customer, summary: getCustomerAccountSummary(customer.id) }))
    .filter(({ customer, summary }) => {
      const searchText = `${customer.name} ${customer.phone} ${customer.company} ${customer.city}`.toLowerCase();
      const matchesSearch = searchText.includes(searchTerm);
      const matchesFilter = filter === 'all' || (filter === 'outstanding' ? summary.remaining > 0 : summary.remaining <= 0);
      return matchesSearch && matchesFilter;
    })
    .sort((first, second) => second.summary.remaining - first.summary.remaining);

  const totalOutstanding = filteredCustomers.reduce((sum, item) => sum + item.summary.remaining, 0);
  elements.customerBalanceTotal.textContent = `المستحق: ${formatCurrency(totalOutstanding)}`;

  if (!filteredCustomers.length) {
    elements.customerBalanceList.innerHTML = '<div class="empty-state">لا يوجد عملاء</div>';
    return;
  }

  elements.customerBalanceList.innerHTML = filteredCustomers
    .map(({ customer, summary }) => {
      const tone = summary.remaining > 0 ? 'warning' : 'safe';
      const lastActivity = [...(state.reports.sales || []), ...(state.reports.payments || [])]
        .filter((record) => record.customerId === customer.id)
        .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))[0];
      const availableCredit = Math.max(0, Number(customer.creditLimit || 0) - summary.remaining);

      return `
        <div class="customer-balance-item ${tone}">
          <div class="customer-balance-head">
            <div>
              <strong>${customer.name}</strong>
              <span>${customer.company} - ${customer.phone}</span>
            </div>
            <span class="customer-account-status">${summary.remaining > 0 ? 'عليه مستحقات' : 'مسدد'}</span>
          </div>
          <div class="customer-balance-metrics">
            <div>
              <label>إجمالي المشتريات</label>
              <strong>${formatCurrency(summary.totalPurchases)}</strong>
            </div>
            <div>
              <label>إجمالي الدفعات</label>
              <strong>${formatCurrency(summary.totalPayments)}</strong>
            </div>
            <div>
              <label>المتبقي</label>
              <strong>${formatCurrency(summary.remaining)}</strong>
            </div>
            <div>
              <label>المتاح من الحد</label>
              <strong>${formatCurrency(availableCredit)}</strong>
            </div>
          </div>
          <div class="customer-balance-footer">
            <small>آخر نشاط: ${lastActivity ? new Date(lastActivity.createdAt).toLocaleDateString('ar-SA') : 'لا يوجد'}</small>
            <button type="button" class="secondary-btn" data-customer-balance-id="${customer.id}">تسجيل دفعة</button>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderSuppliersTable() {
  const searchTerm = elements.supplierSearch.value.trim().toLowerCase();
  const filteredSuppliers = state.suppliers.filter((supplier) => {
    const searchText = `${supplier.name} ${supplier.phone} ${supplier.company} ${supplier.city}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  if (!filteredSuppliers.length) {
    elements.suppliersTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد نتائج</td></tr>';
    return;
  }

  elements.suppliersTableBody.innerHTML = filteredSuppliers
    .map(
      (supplier) => `
        <tr>
          <td>${supplier.name}</td>
          <td>${supplier.phone}</td>
          <td>${supplier.company}</td>
          <td>${supplier.city}</td>
          <td>${formatCurrency(supplier.balance)}</td>
          <td>
            <div class="action-group">
              <button class="action-btn edit" data-supplier-action="edit" data-id="${supplier.id}">تعديل</button>
              <button class="action-btn delete" data-supplier-action="delete" data-id="${supplier.id}">حذف</button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
}

function renderEmployeesTable() {
  const searchTerm = elements.employeeSearch.value.trim().toLowerCase();
  const filteredEmployees = state.employees.filter((employee) => {
    const searchText = `${employee.name} ${employee.residencyNumber} ${employee.phone} ${employee.nationality}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  if (!filteredEmployees.length) {
    elements.employeesTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد نتائج</td></tr>';
    return;
  }

  elements.employeesTableBody.innerHTML = filteredEmployees
    .map((employee) => `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.residencyNumber}</td>
        <td>${employee.phone}</td>
        <td>${employee.nationality}</td>
        <td>${formatCurrency(employee.salary)}</td>
        <td>
          <div class="action-group">
            <button class="action-btn edit" data-employee-action="edit" data-id="${employee.id}">تعديل</button>
            <button class="action-btn delete" data-employee-action="delete" data-id="${employee.id}">حذف</button>
          </div>
        </td>
      </tr>
    `)
    .join('');
}

function renderPayrollEmployeeOptions() {
  const selectedEmployeeId = elements.payrollEmployeeSelect.value;
  elements.payrollEmployeeSelect.innerHTML = state.employees
    .map((employee) => `<option value="${employee.id}">${employee.name} - ${formatCurrency(employee.salary)}</option>`)
    .join('') || '<option value="">لا يوجد عامل</option>';

  if (state.employees.some((employee) => employee.id === selectedEmployeeId)) {
    elements.payrollEmployeeSelect.value = selectedEmployeeId;
  }
  updatePayrollAmount();
}

function updatePayrollAmount() {
  const employee = state.employees.find((item) => item.id === elements.payrollEmployeeSelect.value);
  if (employee && !elements.payrollAmount.value) {
    elements.payrollAmount.value = employee.salary;
  }
}

function handleEmployeeAction(event) {
  const actionButton = event.target.closest('[data-employee-action]');
  if (!actionButton) return;

  const employeeId = actionButton.dataset.id;
  const action = actionButton.dataset.employeeAction;
  const employee = state.employees.find((item) => item.id === employeeId);
  if (!employee) return;

  if (action === 'edit') {
    state.selectedEmployeeId = employeeId;
    Object.entries({
      name: employee.name,
      residencyNumber: employee.residencyNumber,
      phone: employee.phone,
      nationality: employee.nationality,
      salary: employee.salary,
    }).forEach(([key, value]) => {
      const field = elements.employeeForm.elements.namedItem(key);
      if (field) field.value = value;
    });
    elements.employeeForm.querySelector('button[type="submit"]').textContent = 'تحديث العامل';
    showView('employees');
    return;
  }

  if (action === 'delete') {
    fetchJson(`/api/employees/${employeeId}`, { method: 'DELETE' })
      .then(async () => {
        setStatus('تم حذف العامل بنجاح');
        await refreshAll();
      })
      .catch((error) => setStatus(error.message, false));
  }
}

function updateCustomerSelectionVisibility() {
  const isCredit = elements.paymentTypeSelect.value === 'credit';
  elements.customerSelectionWrapper.classList.toggle('hidden', !isCredit);

  if (!isCredit) {
    elements.customerSelect.value = '';
    return;
  }

  if (!elements.customerSelect.value && state.customers.length) {
    elements.customerSelect.value = state.customers[0].id;
  }
}

function renderCustomers() {
  const searchTerm = (elements.customerSalesSearch?.value || '').trim().toLowerCase();
  const filteredCustomers = state.customers.filter((customer) => {
    const searchText = `${customer.name} ${customer.phone} ${customer.company} ${customer.city}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  const customerOptions = filteredCustomers
    .map((customer) => `<option value="${customer.id}">${customer.name} - ${customer.company}</option>`)
    .join('');

  elements.customerSelect.innerHTML = customerOptions || '<option value="">لا يوجد عميل</option>';

  updateCustomerSelectionVisibility();
}

function renderSaleProductCards() {
  const productCards = state.products
    .map((product) => {
      const icon = product.category?.toLowerCase().includes('مياه') || product.name?.includes('ماء') ? '💧' :
        product.category?.toLowerCase().includes('لبن') || product.name?.includes('لبن') ? '🥛' :
        product.category?.toLowerCase().includes('حلويات') || product.name?.includes('كيك') ? '🍰' :
        product.category?.toLowerCase().includes('عصير') || product.name?.includes('عصير') ? '🧃' :
        product.category?.toLowerCase().includes('معلبات') ? '📦' : '🛒';

      return `
        <button type="button" class="sale-product-card" data-sale-product="${product.id}">
          <div class="sale-product-icon">${icon}</div>
          <div class="sale-product-text">
            <h5>${product.name}</h5>
            <span>${product.category}</span>
          </div>
          <div class="sale-product-footer">
            <strong>${formatCurrency(product.salePrice)}</strong>
            <small>${product.currentQuantity} متاح</small>
          </div>
        </button>
      `;
    })
    .join('');

  elements.saleProductGrid.innerHTML = productCards || '<div class="empty-state">لا توجد منتجات متاحة</div>';
}

function renderUsersTable() {
  const searchTerm = elements.userSearch.value.trim().toLowerCase();
  const filteredUsers = state.users.filter((user) => {
    const searchText = `${user.fullName} ${user.username} ${user.role}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  if (!filteredUsers.length) {
    elements.usersTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">لا توجد نتائج</td></tr>';
    return;
  }

  elements.usersTableBody.innerHTML = filteredUsers
    .map(
      (user) => `
        <tr>
          <td>${user.fullName}</td>
          <td>${user.username}</td>
          <td>${user.role}</td>
          <td><span class="badge ${user.status === 'active' ? 'safe' : 'warning'}">${user.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
          <td>
            <div class="action-group">
              <button class="action-btn edit" data-user-action="edit" data-id="${user.id}">تعديل</button>
              <button class="action-btn delete" data-user-action="delete" data-id="${user.id}">حذف</button>
            </div>
          </td>
        </tr>
      `
    )
    .join('');
}

const hijriDateFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatHijriDate(isoDate) {
  const parts = hijriDateFormatter.formatToParts(new Date(`${isoDate}T00:00:00Z`));
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function hijriToGregorian(value) {
  const match = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/.exec(value.trim());
  if (!match) return '';

  const [, year, month, day] = match.map(Number);
  const approximateYear = Math.floor(year * 0.970224 + 621.5643);
  const approximateDate = Date.UTC(approximateYear, month - 1, day);

  for (let offset = -450; offset <= 450; offset += 1) {
    const candidate = new Date(approximateDate + offset * 86400000);
    if (formatHijriDate(candidate.toISOString().slice(0, 10)) === `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`) {
      return candidate.toISOString().slice(0, 10);
    }
  }

  return '';
}

function getReportDateValue(element) {
  if (!element.value) return '';
  return elements.reportCalendarType.value === 'hijri' ? hijriToGregorian(element.value) : element.value;
}

function getFilteredReportRecords() {
  const fromDate = getReportDateValue(elements.reportDateFrom);
  const toDate = getReportDateValue(elements.reportDateTo);
  const matchesDateRange = (record) => {
    const recordDate = new Date(record.createdAt).toISOString().slice(0, 10);
    return (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
  };

  return {
    sales: (state.reports.sales || []).filter(matchesDateRange),
    payments: (state.reports.payments || []).filter(matchesDateRange),
    payroll: (state.reports.payroll || []).filter((record) => {
      const recordDate = new Date(record.paymentMonth).toISOString().slice(0, 10);
      return (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
    }),
    expenses: (state.reports.expenses || []).filter((expense) => {
      const recordDate = String(expense.expenseDate).slice(0, 10);
      return (!fromDate || recordDate >= fromDate) && (!toDate || recordDate <= toDate);
    }),
  };
}

function renderReportPeriodLabel() {
  const fromDate = getReportDateValue(elements.reportDateFrom);
  const toDate = getReportDateValue(elements.reportDateTo);
  const formatDate = (value) => value
    ? elements.reportCalendarType.value === 'hijri' ? formatHijriDate(value) : new Date(`${value}T00:00:00`).toLocaleDateString('ar-SA')
    : '';

  if (fromDate && toDate) {
    elements.reportPeriodLabel.textContent = `من ${formatDate(fromDate)} إلى ${formatDate(toDate)}`;
  } else if (fromDate) {
    elements.reportPeriodLabel.textContent = `من ${formatDate(fromDate)}`;
  } else if (toDate) {
    elements.reportPeriodLabel.textContent = `حتى ${formatDate(toDate)}`;
  } else {
    elements.reportPeriodLabel.textContent = 'كل الفترات';
  }
}

function renderReportSummary() {
  const { sales, payments, payroll, expenses } = getFilteredReportRecords();
  const totalSales = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCashSales = sales
    .filter((sale) => sale.paymentType === 'cash')
    .reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCreditSales = sales
    .filter((sale) => sale.paymentType === 'credit')
    .reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const totalCollected = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const outstandingReceivables = sales
    .filter((sale) => sale.paymentType === 'credit')
    .reduce((sum, sale) => sum + Number(sale.remainingBalance || 0), 0);
  const totalPayroll = payroll.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const productCostById = new Map(state.products.map((product) => [product.id, Number(product.purchasePrice || 0)]));
  const totalProductCost = sales.reduce((salesTotal, sale) => salesTotal + (sale.items || []).reduce(
    (itemsTotal, item) => itemsTotal + Number(item.quantity || 0) * (productCostById.get(item.productId) || 0),
    0
  ), 0);
  const netProfit = totalSales - totalProductCost - totalExpenses - totalPayroll;

  elements.reportSalesTotal.textContent = formatCurrency(totalSales);
  elements.reportCashTotal.textContent = formatCurrency(totalCashSales);
  elements.reportCreditTotal.textContent = formatCurrency(totalCreditSales);
  elements.reportReceiptsTotal.textContent = formatCurrency(totalCollected);
  elements.reportOutstandingTotal.textContent = formatCurrency(outstandingReceivables);
  elements.reportPayrollTotal.textContent = formatCurrency(totalPayroll);
  elements.reportExpensesTotal.textContent = formatCurrency(totalExpenses);
  elements.reportProductCostTotal.textContent = formatCurrency(totalProductCost);
  elements.reportNetProfitTotal.textContent = formatCurrency(netProfit);
  elements.reportNetProfitTotal.style.color = netProfit >= 0 ? 'var(--success)' : 'var(--danger)';
  renderReportPeriodLabel();
}

function renderSalesReportTable() {
  const { sales } = getFilteredReportRecords();

  if (!sales.length) {
    elements.salesReportTableBody.innerHTML = '<tr><td colspan="7" class="empty-state">لا توجد مبيعات</td></tr>';
    return;
  }

  elements.salesReportTableBody.innerHTML = sales
    .map((sale) => `
      <tr>
        <td>${sale.id}</td>
        <td>${sale.customerName || 'نقدي'}</td>
        <td>${sale.paymentType === 'credit' ? 'آجل' : 'نقدي'}</td>
        <td>${formatCurrency(sale.total || 0)}</td>
        <td>${formatCurrency(sale.paidAmount || 0)}</td>
        <td>${formatCurrency(sale.remainingBalance || 0)}</td>
        <td>${new Date(sale.createdAt).toLocaleString('ar-SA')}</td>
      </tr>
    `)
    .join('');
}

function renderPaymentsReportTable() {
  const { payments } = getFilteredReportRecords();

  if (!payments.length) {
    elements.paymentsReportTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد دفعات</td></tr>';
    return;
  }

  elements.paymentsReportTableBody.innerHTML = payments
    .map((payment) => `
      <tr>
        <td>${payment.id}</td>
        <td>${payment.customerName}</td>
        <td>${formatCurrency(payment.amount || 0)}</td>
        <td>${payment.method === 'bank' ? 'حوالة' : payment.method === 'card' ? 'بطاقة' : 'نقد'}</td>
        <td>${payment.notes || 'بدون ملاحظات'}</td>
        <td>${new Date(payment.createdAt).toLocaleString('ar-SA')}</td>
      </tr>
    `)
    .join('');
}

function renderPayrollReportTable() {
  const { payroll } = getFilteredReportRecords();

  if (!payroll.length) {
    elements.payrollReportTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">لا توجد دفعات رواتب</td></tr>';
    return;
  }

  elements.payrollReportTableBody.innerHTML = payroll
    .map((payment) => `
      <tr>
        <td>${payment.id}</td>
        <td>${payment.employeeName}</td>
        <td>${payment.paymentMonth}</td>
        <td>${formatCurrency(payment.amount)}</td>
        <td>${payment.notes || 'بدون ملاحظات'}</td>
        <td>${new Date(payment.createdAt).toLocaleString('ar-SA')}</td>
      </tr>
    `)
    .join('');
}

function getExpensePaymentMethodLabel(method) {
  return method === 'bank' ? 'تحويل بنكي' : method === 'card' ? 'بطاقة' : 'نقدي';
}

function renderExpenseCategoryOptions() {
  const selectedCategory = elements.expenseCategoryFilter.value;
  const categories = [...new Set(state.expenses.map((expense) => expense.category))].sort((first, second) => first.localeCompare(second, 'ar'));
  elements.expenseCategoryFilter.innerHTML = '<option value="all">كل التصنيفات</option>'
    + categories.map((category) => `<option value="${category}">${category}</option>`).join('');

  if (categories.includes(selectedCategory)) elements.expenseCategoryFilter.value = selectedCategory;
}

function renderExpenseCategorySummary() {
  const totalsByCategory = state.expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount || 0);
    return totals;
  }, {});
  const sortedCategories = Object.entries(totalsByCategory).sort(([, firstTotal], [, secondTotal]) => secondTotal - firstTotal);

  if (!sortedCategories.length) {
    elements.expenseCategorySummary.innerHTML = '<div class="empty-state">ستظهر التصنيفات بعد تسجيل أول مصروف</div>';
    return;
  }

  const maximumTotal = sortedCategories[0][1] || 1;
  elements.expenseCategorySummary.innerHTML = sortedCategories.slice(0, 5).map(([category, total]) => `
    <div class="expense-category-row">
      <div class="expense-category-heading">
        <span>${category}</span>
        <strong>${formatCurrency(total)}</strong>
      </div>
      <div class="expense-category-bar"><span style="width: ${(total / maximumTotal) * 100}%"></span></div>
    </div>
  `).join('');
}

function renderExpenses() {
  const searchTerm = elements.expenseSearch.value.trim().toLowerCase();
  const selectedCategory = elements.expenseCategoryFilter.value;
  const filteredExpenses = state.expenses.filter((expense) => {
    const searchText = `${expense.title} ${expense.category} ${expense.notes || ''}`.toLowerCase();
    return searchText.includes(searchTerm) && (selectedCategory === 'all' || expense.category === selectedCategory);
  });

  const totalExpenses = state.expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthTotal = state.expenses
    .filter((expense) => String(expense.expenseDate).slice(0, 7) === currentMonth)
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  elements.expensesTotalValue.textContent = formatCurrency(totalExpenses);
  elements.expensesMonthValue.textContent = formatCurrency(currentMonthTotal);
  elements.expensesMonthLabel.textContent = new Date(`${currentMonth}-01T00:00:00`).toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' });
  elements.expensesCountValue.textContent = state.expenses.length;

  if (!filteredExpenses.length) {
    elements.expensesTableBody.innerHTML = '<tr><td colspan="7" class="empty-state">لا توجد مصروفات مطابقة</td></tr>';
    renderExpenseCategorySummary();
    return;
  }

  elements.expensesTableBody.innerHTML = filteredExpenses.map((expense) => `
    <tr>
      <td><strong>${expense.title}</strong></td>
      <td><span class="expense-category-tag">${expense.category}</span></td>
      <td><strong class="expense-amount">${formatCurrency(expense.amount)}</strong></td>
      <td>${getExpensePaymentMethodLabel(expense.paymentMethod)}</td>
      <td>${new Date(`${expense.expenseDate}T00:00:00`).toLocaleDateString('ar-SA')}</td>
      <td>${expense.notes || 'بدون ملاحظات'}</td>
      <td><button class="action-btn delete" data-expense-id="${expense.id}">حذف</button></td>
    </tr>
  `).join('');

  renderExpenseCategorySummary();
}

function renderFilteredReports() {
  const fromDate = getReportDateValue(elements.reportDateFrom);
  const toDate = getReportDateValue(elements.reportDateTo);

  if ((elements.reportDateFrom.value && !fromDate) || (elements.reportDateTo.value && !toDate)) {
    setStatus('أدخل التاريخ الهجري بصيغة سنة-شهر-يوم مثل 1447-01-15', false);
    return;
  }

  if (fromDate && toDate && fromDate > toDate) {
    setStatus('تاريخ البداية يجب أن يكون قبل تاريخ النهاية', false);
  }

  renderReportSummary();
  renderSalesReportTable();
  renderPaymentsReportTable();
  renderPayrollReportTable();
}

function updateReportCalendarType() {
  const fromDate = getReportDateValue(elements.reportDateFrom);
  const toDate = getReportDateValue(elements.reportDateTo);
  const isHijri = elements.reportCalendarType.value === 'hijri';

  [elements.reportDateFrom, elements.reportDateTo].forEach((input) => {
    input.type = isHijri ? 'text' : 'date';
    input.placeholder = isHijri ? 'سنة-شهر-يوم' : '';
  });

  elements.reportDateFrom.value = fromDate ? isHijri ? formatHijriDate(fromDate) : fromDate : '';
  elements.reportDateTo.value = toDate ? isHijri ? formatHijriDate(toDate) : toDate : '';
  renderFilteredReports();
}

function printReports() {
  document.body.classList.add('reports-print-mode');
  window.addEventListener('afterprint', () => document.body.classList.remove('reports-print-mode'), { once: true });
  window.print();
}

function renderCustomerPaymentsTable() {
  const searchTerm = (elements.customerPaymentsSearch?.value || '').trim().toLowerCase();
  const records = (state.reports.payments || []).filter((record) => {
    const searchText = `${record.customerName} ${record.method} ${record.notes || ''}`.toLowerCase();
    return searchText.includes(searchTerm);
  });

  const filteredTotal = records.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  elements.customerPaymentsTotal.textContent = formatCurrency(filteredTotal);

  if (!records.length) {
    elements.customerPaymentsTableBody.innerHTML = '<tr><td colspan="5" class="empty-state">لا توجد دفعات</td></tr>';
    return;
  }

  elements.customerPaymentsTableBody.innerHTML = records
    .map((record) => `
      <tr>
        <td>${record.customerName}</td>
        <td>${formatCurrency(record.amount || 0)}</td>
        <td>${record.method === 'bank' ? 'حوالة' : record.method === 'card' ? 'بطاقة' : 'نقد'}</td>
        <td>${new Date(record.createdAt).toLocaleString('ar-SA')}</td>
        <td>${record.notes || 'بدون ملاحظات'}</td>
      </tr>
    `)
    .join('');
}

function renderCustomerPaymentOptions() {
  const selectedCustomerId = elements.customerPaymentCustomerSelect.value;
  const searchTerm = (elements.customerPaymentSearch?.value || '').trim().toLowerCase();
  const filteredCustomers = state.customers.filter((customer) => {
    const searchText = `${customer.name} ${customer.company} ${customer.phone} ${customer.city}`.toLowerCase();
    return searchText.includes(searchTerm);
  });
  const options = filteredCustomers
    .map((customer) => `<option value="${customer.id}">${customer.name} - ${customer.company}</option>`)
    .join('');

  elements.customerPaymentCustomerSelect.innerHTML = options || '<option value="">لا يوجد عميل مطابق</option>';
  if (filteredCustomers.some((customer) => customer.id === selectedCustomerId)) {
    elements.customerPaymentCustomerSelect.value = selectedCustomerId;
  }
  renderCustomerPaymentSummary();
}

function renderCustomerPaymentSummary() {
  const customerId = elements.customerPaymentCustomerSelect.value;
  const customer = state.customers.find((item) => item.id === customerId);

  if (!customer) {
    elements.customerPaymentSummary.innerHTML = '<span class="empty-state">اختر عميلًا لعرض رصيده الحالي</span>';
    elements.customerPaymentAmount.max = '';
    return;
  }

  const summary = getCustomerAccountSummary(customer.id);
  const remaining = Math.max(0, summary.remaining);
  elements.customerPaymentAmount.max = remaining || '';
  elements.customerPaymentSummary.innerHTML = `
    <div>
      <span>المتبقي على العميل</span>
      <strong>${formatCurrency(remaining)}</strong>
    </div>
    <div>
      <span>الفواتير الآجلة</span>
      <strong>${summary.salesCount}</strong>
    </div>
    <button type="button" class="secondary-btn" id="fillCustomerBalanceBtn" ${remaining <= 0 ? 'disabled' : ''}>استخدام المتبقي</button>
  `;
}

function renderSaleItems() {
  const itemCount = state.saleItems.reduce((sum, item) => sum + item.quantity, 0);
  elements.saleItemCount.textContent = itemCount;

  if (!state.saleItems.length) {
    elements.saleItemsContainer.innerHTML = '<div class="empty-state">لا توجد عناصر مضافة حتى الآن</div>';
    elements.saleTotalValue.textContent = formatCurrency(0);
    elements.saleCartTotal.textContent = formatCurrency(0);
    return;
  }

  const total = state.saleItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  elements.saleTotalValue.textContent = formatCurrency(total);
  elements.saleCartTotal.textContent = formatCurrency(total);

  elements.saleItemsContainer.innerHTML = state.saleItems
    .map(
      (item) => `
        <div class="sale-item">
          <div>
            <strong>${item.name}</strong>
            <div>${item.quantity} × ${formatCurrency(item.unitPrice)}</div>
          </div>
          <div class="action-group">
            <strong>${formatCurrency(item.quantity * item.unitPrice)}</strong>
            <button class="remove-item-btn" data-remove-id="${item.productId}">حذف</button>
          </div>
        </div>
      `
    )
    .join('');
}

let saleAudioContext;

function playProductSelectionSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    saleAudioContext ||= new AudioContext();
    saleAudioContext.resume();
    const oscillator = saleAudioContext.createOscillator();
    const gain = saleAudioContext.createGain();
    const now = saleAudioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, now);
    oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    oscillator.connect(gain);
    gain.connect(saleAudioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.13);
  } catch (error) {
  }
}

async function fetchJson(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  } catch (error) {
    throw new Error('تعذر الاتصال بالخادم. شغّل npm start وتأكد من إعداد PostgreSQL في ملف .env');
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'حدث خطأ غير متوقع');
  }

  return payload;
}

async function loadDashboard() {
  state.dashboard = await fetchJson('/api/dashboard');
  updateDashboard();
}

async function loadCategories() {
  state.categories = await fetchJson('/api/categories');
  renderCategoryOptions();
  renderCategoriesList();
}

async function loadProducts() {
  state.products = await fetchJson('/api/products');
  renderProductsTable();
  renderProductSelects();
  renderSaleProductCards();
}

async function loadCustomers() {
  state.customers = await fetchJson('/api/customers');
  renderCustomers();
  renderCustomersTable();
}

async function loadSuppliers() {
  state.suppliers = await fetchJson('/api/suppliers');
  renderSuppliersTable();
}

async function loadEmployees() {
  const employees = await fetchJson('/api/employees');
  if (!Array.isArray(employees)) {
    throw new Error('تعذر تحميل العاملين من قاعدة البيانات');
  }
  state.employees = employees;
  renderEmployeesTable();
  renderPayrollEmployeeOptions();
}

async function loadExpenses() {
  state.expenses = await fetchJson('/api/expenses');
  renderExpenseCategoryOptions();
  renderExpenses();
}

async function loadUsers() {
  state.users = await fetchJson('/api/users');
  renderUsersTable();
}

async function loadTransactions() {
  state.transactions = await fetchJson('/api/transactions');
  renderTransactionsTable();
}

async function loadReports() {
  state.reports = await fetchJson('/api/reports');
  renderReportSummary();
  renderSalesReportTable();
  renderPaymentsReportTable();
  renderPayrollReportTable();
  renderCustomerPaymentsTable();
  renderCustomerBalanceList();
}

async function refreshAll() {
  await Promise.all([loadDashboard(), loadCategories(), loadProducts(), loadCustomers(), loadSuppliers(), loadUsers(), loadTransactions(), loadReports(), loadExpenses()]);
  await loadEmployees();
  renderReportSummary();
  renderCustomerPaymentOptions();
}

function resetProductForm() {
  elements.productForm.reset();
  state.selectedProductId = null;
  const submitButton = elements.productForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'حفظ المنتج';
}

function resetCustomerForm() {
  elements.customerForm.reset();
  state.selectedCustomerId = null;
  const submitButton = elements.customerForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'حفظ العميل';
}

function resetSupplierForm() {
  elements.supplierForm.reset();
  state.selectedSupplierId = null;
  const submitButton = elements.supplierForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'حفظ المورد';
}

function resetEmployeeForm() {
  elements.employeeForm.reset();
  state.selectedEmployeeId = null;
  elements.employeeForm.querySelector('button[type="submit"]').textContent = 'حفظ العامل';
  updatePayrollAmount();
}

function resetUserForm() {
  elements.userForm.reset();
  state.selectedUserId = null;
  const submitButton = elements.userForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'حفظ المستخدم';
}

async function addCategory() {
  const categoryName = elements.newCategoryInput.value.trim();

  if (!categoryName) {
    setStatus('يرجى إدخال اسم التصنيف', false);
    return;
  }

  try {
    const category = await fetchJson('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ name: categoryName }),
    });

    elements.newCategoryInput.value = '';
    state.categories.push(category);
    renderCategoryOptions();
    renderCategoriesList();
    elements.categorySelect.value = category.name;
    setStatus('تمت إضافة التصنيف بنجاح');
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleProductSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.productForm);
  const payload = {
    name: formData.get('name'),
    sku: formData.get('sku'),
    category: formData.get('category'),
    purchasePrice: Number(formData.get('purchasePrice')),
    salePrice: Number(formData.get('salePrice')),
    currentQuantity: Number(formData.get('currentQuantity')),
    minStockLevel: Number(formData.get('minStockLevel')),
  };

  try {
    const url = state.selectedProductId ? `/api/products/${state.selectedProductId}` : '/api/products';
    const method = state.selectedProductId ? 'PUT' : 'POST';

    await fetchJson(url, {
      method,
      body: JSON.stringify(payload),
    });

    setStatus(state.selectedProductId ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
    resetProductForm();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleCustomerSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.customerForm);
  const payload = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    city: formData.get('city'),
    creditLimit: Number(formData.get('creditLimit')),
  };

  try {
    const url = state.selectedCustomerId ? `/api/customers/${state.selectedCustomerId}` : '/api/customers';
    const method = state.selectedCustomerId ? 'PUT' : 'POST';

    await fetchJson(url, {
      method,
      body: JSON.stringify(payload),
    });

    setStatus(state.selectedCustomerId ? 'تم تحديث العميل بنجاح' : 'تم إضافة العميل بنجاح');
    resetCustomerForm();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleSupplierSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.supplierForm);
  const payload = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    city: formData.get('city'),
    balance: Number(formData.get('balance')),
  };

  try {
    const url = state.selectedSupplierId ? `/api/suppliers/${state.selectedSupplierId}` : '/api/suppliers';
    const method = state.selectedSupplierId ? 'PUT' : 'POST';

    await fetchJson(url, {
      method,
      body: JSON.stringify(payload),
    });

    setStatus(state.selectedSupplierId ? 'تم تحديث المورد بنجاح' : 'تم إضافة المورد بنجاح');
    resetSupplierForm();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleExpenseSubmit(event) {
  event.preventDefault();

  const payload = {
    title: elements.expenseTitle.value.trim(),
    category: elements.expenseCategory.value,
    amount: Number(elements.expenseAmount.value),
    expenseDate: elements.expenseDate.value,
    paymentMethod: elements.expensePaymentMethod.value,
    notes: elements.expenseNotes.value.trim(),
  };

  try {
    await fetchJson('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    elements.expenseForm.reset();
    elements.expenseDate.value = new Date().toISOString().slice(0, 10);
    setStatus('تم تسجيل المصروف بنجاح');
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleExpenseAction(event) {
  const deleteButton = event.target.closest('[data-expense-id]');
  if (!deleteButton) return;

  try {
    await fetchJson(`/api/expenses/${deleteButton.dataset.expenseId}`, { method: 'DELETE' });
    setStatus('تم حذف المصروف بنجاح');
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleEmployeeSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.employeeForm);
  const payload = {
    name: formData.get('name'),
    residencyNumber: formData.get('residencyNumber'),
    phone: formData.get('phone'),
    nationality: formData.get('nationality'),
    salary: Number(formData.get('salary')),
  };

  try {
    const url = state.selectedEmployeeId ? `/api/employees/${state.selectedEmployeeId}` : '/api/employees';
    const method = state.selectedEmployeeId ? 'PUT' : 'POST';
    await fetchJson(url, { method, body: JSON.stringify(payload) });
    setStatus(state.selectedEmployeeId ? 'تم تحديث العامل بنجاح' : 'تم إضافة العامل بنجاح');
    resetEmployeeForm();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handlePayrollSubmit(event) {
  event.preventDefault();

  const payload = {
    employeeId: elements.payrollEmployeeSelect.value,
    paymentMonth: elements.payrollMonth.value,
    amount: Number(elements.payrollAmount.value),
    notes: elements.payrollNotes.value.trim(),
  };

  try {
    await fetchJson('/api/payroll', { method: 'POST', body: JSON.stringify(payload) });
    elements.payrollForm.reset();
    updatePayrollAmount();
    setStatus('تم تسجيل دفعة الراتب بنجاح');
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleUserSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.userForm);
  const payload = {
    username: formData.get('username'),
    fullName: formData.get('fullName'),
    password: formData.get('password'),
    role: formData.get('role'),
    status: formData.get('status'),
  };

  try {
    const url = state.selectedUserId ? `/api/users/${state.selectedUserId}` : '/api/users';
    const method = state.selectedUserId ? 'PUT' : 'POST';

    await fetchJson(url, {
      method,
      body: JSON.stringify(payload),
    });

    setStatus(state.selectedUserId ? 'تم تحديث المستخدم بنجاح' : 'تم إضافة المستخدم بنجاح');
    resetUserForm();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleProductAction(event) {
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const productId = actionButton.dataset.id;
  const action = actionButton.dataset.action;

  if (action === 'edit') {
    const product = state.products.find((item) => item.id === productId);
    if (!product) return;

    state.selectedProductId = productId;
    Object.entries({
      name: product.name,
      sku: product.sku,
      category: product.category,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      currentQuantity: product.currentQuantity,
      minStockLevel: product.minStockLevel,
    }).forEach(([key, value]) => {
      const field = elements.productForm.elements.namedItem(key);
      if (field) field.value = value;
    });

    const submitButton = elements.productForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'تحديث المنتج';
    showView('products');
    return;
  }

  if (action === 'delete') {
    try {
      await fetchJson(`/api/products/${productId}`, { method: 'DELETE' });
      setStatus('تم حذف المنتج بنجاح');
      await refreshAll();
    } catch (error) {
      setStatus(error.message, false);
    }
  }
}

async function handleCustomerAction(event) {
  const actionButton = event.target.closest('[data-customer-action]');
  if (!actionButton) return;

  const customerId = actionButton.dataset.id;
  const action = actionButton.dataset.customerAction;

  if (action === 'edit') {
    const customer = state.customers.find((item) => item.id === customerId);
    if (!customer) return;

    state.selectedCustomerId = customerId;
    Object.entries({
      name: customer.name,
      phone: customer.phone,
      company: customer.company,
      city: customer.city,
      creditLimit: customer.creditLimit,
    }).forEach(([key, value]) => {
      const field = elements.customerForm.elements.namedItem(key);
      if (field) field.value = value;
    });

    const submitButton = elements.customerForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'تحديث العميل';
    showView('customers');
    return;
  }

  if (action === 'delete') {
    try {
      await fetchJson(`/api/customers/${customerId}`, { method: 'DELETE' });
      setStatus('تم حذف العميل بنجاح');
      await refreshAll();
    } catch (error) {
      setStatus(error.message, false);
    }
  }
}

async function handleSupplierAction(event) {
  const actionButton = event.target.closest('[data-supplier-action]');
  if (!actionButton) return;

  const supplierId = actionButton.dataset.id;
  const action = actionButton.dataset.supplierAction;

  if (action === 'edit') {
    const supplier = state.suppliers.find((item) => item.id === supplierId);
    if (!supplier) return;

    state.selectedSupplierId = supplierId;
    Object.entries({
      name: supplier.name,
      phone: supplier.phone,
      company: supplier.company,
      city: supplier.city,
      balance: supplier.balance,
    }).forEach(([key, value]) => {
      const field = elements.supplierForm.elements.namedItem(key);
      if (field) field.value = value;
    });

    const submitButton = elements.supplierForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'تحديث المورد';
    showView('suppliers');
    return;
  }

  if (action === 'delete') {
    try {
      await fetchJson(`/api/suppliers/${supplierId}`, { method: 'DELETE' });
      setStatus('تم حذف المورد بنجاح');
      await refreshAll();
    } catch (error) {
      setStatus(error.message, false);
    }
  }
}

async function handleUserAction(event) {
  const actionButton = event.target.closest('[data-user-action]');
  if (!actionButton) return;

  const userId = actionButton.dataset.id;
  const action = actionButton.dataset.userAction;

  if (action === 'edit') {
    const user = state.users.find((item) => item.id === userId);
    if (!user) return;

    state.selectedUserId = userId;
    Object.entries({
      username: user.username,
      fullName: user.fullName,
      password: user.password || '',
      role: user.role,
      status: user.status,
    }).forEach(([key, value]) => {
      const field = elements.userForm.elements.namedItem(key);
      if (field) field.value = value;
    });

    const submitButton = elements.userForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'تحديث المستخدم';
    showView('users');
    return;
  }

  if (action === 'delete') {
    try {
      await fetchJson(`/api/users/${userId}`, { method: 'DELETE' });
      setStatus('تم حذف المستخدم بنجاح');
      await refreshAll();
    } catch (error) {
      setStatus(error.message, false);
    }
  }
}

async function handleStockSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.stockForm);
  const payload = {
    productId: formData.get('productId'),
    type: formData.get('type'),
    quantity: Number(formData.get('quantity')),
    unitCost: Number(formData.get('unitCost')),
    notes: formData.get('notes'),
  };

  try {
    await fetchJson('/api/stock', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setStatus('تم تسجيل الحركة بنجاح');
    elements.stockForm.reset();
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

function addSaleItem(productIdOverride = null) {
  const productId = productIdOverride;
  const quantity = 1;

  if (!productId || !quantity || quantity <= 0) {
    setStatus('يرجى اختيار منتج وكمية صحيحة', false);
    return false;
  }

  const product = state.products.find((item) => item.id === productId);

  if (!product) {
    setStatus('المنتج غير موجود', false);
    return false;
  }

  if (quantity > product.currentQuantity) {
    setStatus('الكمية المطلوبة أكبر من المتاح في المخزون', false);
    return false;
  }

  const existingItem = state.saleItems.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.saleItems.push({
      productId: product.id,
      name: product.name,
      quantity,
      unitPrice: product.salePrice,
    });
  }

  renderSaleItems();
  setStatus('تمت إضافة العنصر إلى البيع');
  return true;
}

function removeSaleItem(productId) {
  state.saleItems = state.saleItems.filter((item) => item.productId !== productId);
  renderSaleItems();
}

async function handleSaleSave() {
  if (!state.saleItems.length) {
    setStatus('لا توجد عناصر في السلة', false);
    return;
  }

  try {
    const payload = {
      customerId: elements.customerSelect.value,
      paymentType: elements.paymentTypeSelect.value,
      items: state.saleItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    await fetchJson('/api/sales', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    state.saleItems = [];
    renderSaleItems();
    setStatus('تم حفظ البيع بنجاح');
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleCustomerPaymentSubmit(event) {
  event.preventDefault();

  const customerId = elements.customerPaymentCustomerSelect.value;
  const amount = Number(elements.customerPaymentAmount.value);
  const method = elements.customerPaymentMethod.value;
  const notes = elements.customerPaymentNotes.value.trim();

  if (!customerId || !Number.isFinite(amount) || amount <= 0) {
    setStatus('يرجى اختيار عميل ومبلغ صحيح', false);
    return;
  }

  const summary = getCustomerAccountSummary(customerId);
  if (amount > summary.remaining) {
    setStatus(`المبلغ أكبر من المتبقي (${formatCurrency(summary.remaining)})`, false);
    return;
  }

  try {
    await fetchJson('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ customerId, amount, method, notes }),
    });

    elements.customerPaymentForm.reset();
    setStatus('تم تسجيل الدفعة بنجاح');
    await refreshAll();
  } catch (error) {
    setStatus(error.message, false);
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.loginForm);
  const payload = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const user = await fetchJson('/api/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    state.currentUser = user;
    updateCurrentUserBadge();
    showAppScreen();
    setStatus('تم تسجيل الدخول بنجاح');
    await refreshAll();
    showView('dashboard');
  } catch (error) {
    setStatus(error.message, false);
  }
}

function handleLogout() {
  state.currentUser = null;
  setStatus('تم تسجيل الخروج');
  showLoginScreen();
  elements.loginForm.reset();
}

elements.navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!state.currentUser) {
      showLoginScreen();
      return;
    }

    playProductSelectionSound();
    showView(button.dataset.view);
  });
});

window.addEventListener('DOMContentLoaded', async () => {
  showLoginScreen();

  elements.loginForm.addEventListener('submit', handleLoginSubmit);
  elements.logoutBtn.addEventListener('click', handleLogout);
  elements.productForm.addEventListener('submit', handleProductSubmit);
  elements.addCategoryBtn.addEventListener('click', addCategory);
  elements.categoryList.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-category-name]');
    if (!chip) return;

    const selectedCategory = chip.dataset.categoryName;
    elements.categorySelect.value = selectedCategory;
    setStatus(`تم تحديد التصنيف: ${selectedCategory}`);
  });
  elements.customerForm.addEventListener('submit', handleCustomerSubmit);
  elements.customerPaymentForm.addEventListener('submit', handleCustomerPaymentSubmit);
  elements.supplierForm.addEventListener('submit', handleSupplierSubmit);
  elements.expenseForm.addEventListener('submit', handleExpenseSubmit);
  elements.employeeForm.addEventListener('submit', handleEmployeeSubmit);
  elements.payrollForm.addEventListener('submit', handlePayrollSubmit);
  elements.userForm.addEventListener('submit', handleUserSubmit);
  elements.productSearch.addEventListener('input', renderProductsTable);
  elements.customerSearch.addEventListener('input', renderCustomersTable);
  elements.customerBalanceSearch.addEventListener('input', renderCustomerBalanceList);
  elements.customerBalanceFilter.addEventListener('change', renderCustomerBalanceList);
  elements.customerBalanceList.addEventListener('click', (event) => {
    const paymentButton = event.target.closest('[data-customer-balance-id]');
    if (!paymentButton) return;

    elements.customerPaymentSearch.value = '';
    renderCustomerPaymentOptions();
    elements.customerPaymentCustomerSelect.value = paymentButton.dataset.customerBalanceId;
    renderCustomerPaymentSummary();
    elements.customerPaymentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    elements.customerPaymentAmount.focus();
  });
  elements.customerSalesSearch.addEventListener('input', renderCustomers);
  elements.customerPaymentSearch.addEventListener('input', renderCustomerPaymentOptions);
  elements.customerPaymentCustomerSelect.addEventListener('change', renderCustomerPaymentSummary);
  elements.customerPaymentsSearch.addEventListener('input', renderCustomerPaymentsTable);
  elements.customerPaymentSummary.addEventListener('click', (event) => {
    if (event.target.id !== 'fillCustomerBalanceBtn') return;

    const customer = state.customers.find((item) => item.id === elements.customerPaymentCustomerSelect.value);
    if (customer) {
      elements.customerPaymentAmount.value = getCustomerAccountSummary(customer.id).remaining.toFixed(2);
    }
  });
  elements.reportDateFrom.addEventListener('change', renderFilteredReports);
  elements.reportDateTo.addEventListener('change', renderFilteredReports);
  elements.reportCalendarType.addEventListener('change', updateReportCalendarType);
  elements.resetReportDatesBtn.addEventListener('click', () => {
    elements.reportDateFrom.value = '';
    elements.reportDateTo.value = '';
    renderFilteredReports();
  });
  elements.printReportsBtn.addEventListener('click', printReports);
  elements.paymentTypeSelect.addEventListener('change', updateCustomerSelectionVisibility);
  elements.supplierSearch.addEventListener('input', renderSuppliersTable);
  elements.expenseSearch.addEventListener('input', renderExpenses);
  elements.expenseCategoryFilter.addEventListener('change', renderExpenses);
  elements.employeeSearch.addEventListener('input', renderEmployeesTable);
  elements.payrollEmployeeSelect.addEventListener('change', updatePayrollAmount);
  elements.userSearch.addEventListener('input', renderUsersTable);
  elements.productsTableBody.addEventListener('click', handleProductAction);
  elements.customersTableBody.addEventListener('click', handleCustomerAction);
  elements.suppliersTableBody.addEventListener('click', handleSupplierAction);
  elements.expensesTableBody.addEventListener('click', handleExpenseAction);
  elements.employeesTableBody.addEventListener('click', handleEmployeeAction);
  elements.usersTableBody.addEventListener('click', handleUserAction);
  elements.resetProductFormBtn.addEventListener('click', resetProductForm);
  elements.resetCustomerFormBtn.addEventListener('click', resetCustomerForm);
  elements.resetSupplierFormBtn.addEventListener('click', resetSupplierForm);
  elements.resetEmployeeFormBtn.addEventListener('click', resetEmployeeForm);
  elements.resetUserFormBtn.addEventListener('click', resetUserForm);
  elements.expenseDate.value = new Date().toISOString().slice(0, 10);
  elements.stockForm.addEventListener('submit', handleStockSubmit);
  elements.saleProductGrid.addEventListener('click', (event) => {
    const productButton = event.target.closest('[data-sale-product]');
    if (productButton) {
      const productId = productButton.dataset.saleProduct;
      if (addSaleItem(productId)) {
        playProductSelectionSound();
        productButton.classList.add('is-selected');
        window.setTimeout(() => productButton.classList.remove('is-selected'), 220);
      }
    }
  });
  elements.saleItemsContainer.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-id]');
    if (removeButton) {
      removeSaleItem(removeButton.dataset.removeId);
    }
  });
  elements.saveSaleBtn.addEventListener('click', handleSaleSave);
  renderSaleItems();
  updateCustomerSelectionVisibility();

  await refreshAll();
});
