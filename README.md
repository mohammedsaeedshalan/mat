# نظام إدارة المخزون والمبيعات

نظام ويب لإدارة المخزون، المبيعات، العملاء، الموردين، الموظفين، الرواتب، والنفقات. تم تصميمه باستخدام Node.js و Express وقاعدة بيانات PostgreSQL، مع واجهة ويب HTML/CSS/JavaScript.

## المميزات

- إدارة المنتجات والمخزون
- إدارة العملاء والموردين
- تسجيل المبيعات والمعاملات
- متابعة المدفوعات المتبقيّة
- إدارة الموظفين ورواتبهم
- إدارة النفقات
- نظام تسجيل دخول بسيط
- جاهز للنشر على Render

## متطلبات التشغيل

- Node.js 18 أو أعلى
- PostgreSQL
- متغير بيئة DATABASE_URL

## تثبيت التبعيات

```bash
npm install
```

## إعداد متغير البيئة

أنشئ ملف .env في جذر المشروع ثم أضف الرابط التالي:

```env
DATABASE_URL=postgresql://username:password@host:5432/database_name
NODE_ENV=development
```

مثال:

```env
DATABASE_URL=postgresql://postgres:123456@localhost:5432/warehouse_db
NODE_ENV=development
```

## تشغيل المشروع محلياً

```bash
npm start
```

ثم افتح الرابط التالي في المتصفح:

```text
http://localhost:3000
```

## رفع المشروع على Render

1. ارفع المشروع إلى GitHub.
2. افتح Render واذهب إلى Dashboard.
3. اختر New > Web Service.
4. اربط المستودع.
5. استخدم الإعدادات التالية:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. أضف متغير البيئة:
   - DATABASE_URL = رابط PostgreSQL الخاص بك
   - NODE_ENV = production
7. اضغط Deploy.

## هيكل المشروع

```text
.
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── package.json
├── render.yaml
├── server-db.js
├── README.md
└── .env
```

## بيانات المستخدم الافتراضية

عند تشغيل المشروع لأول مرة، يتم إنشاء مستخدمين افتراضيين تلقائياً:

- اسم المستخدم: `admin`
- كلمة المرور: `admin123`
- اسم المستخدم: `sales`
- كلمة المرور: `sales123`

## ملاحظات

- إذا لم يتم تعيين DATABASE_URL، سيظهر خطأ ويوقف التشغيل.
- عند التشغيل في بيئة الإنتاج، يتم استخدام SSL للاتصال بـ PostgreSQL.

## الترخيص

MIT
