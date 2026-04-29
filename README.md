# 🏥 نظام إدارة عيادة أمراض الجهاز الهضمي

نظام إدارة عيادة طبية حديث مبني باستخدام Next.js و Supabase بدعم اللغة العربية.

## ✨ المميزات الرئيسية

- 👤 **إدارة المرضى**: إضافة وتعديل وحذف بيانات المرضى
- 📅 **إدارة المواعيد**: حجز المواعيد وإدارة جدول العيادة
- 💰 **إدارة الفواتير**: إنشاء وتتبع الفواتير والدفعات
- 🔐 **مصادقة آمنة**: تسجيل دخول آمن عبر Supabase Auth
- 🌐 **واجهة عربية كاملة**: دعم كامل للغة العربية وتخطيط من اليمين لليسار

## 📋 المتطلبات

- Node.js 16+
- npm أو yarn
- حساب Supabase

## 🚀 البدء السريع

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 3. إنشاء قاعدة البيانات

اتبع هذه الخطوات في لوحة التحكم Supabase:

```sql
-- جدول المرضى
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age INTEGER,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول المواعيد
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول الفواتير
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  issue_date DATE NOT NULL,
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. تشغيل التطبيق

```bash
npm run dev
```

سيكون التطبيق متاحاً على `http://localhost:3000`

## 🔑 بيانات الدخول التجريبية

- **البريد**: doctor@test.com
- **كلمة المرور**: 123456

## 📁 هيكل المشروع

```
clinic/
├── app/
│   ├── layout.tsx          # التخطيط الرئيسي
│   ├── page.tsx            # الصفحة الرئيسية
│   └── globals.css         # الأنماط العامة
├── components/
│   ├── LoginPage.tsx       # صفحة تسجيل الدخول
│   ├── Dashboard.tsx       # لوحة التحكم الرئيسية
│   ├── PatientsManager.tsx # إدارة المرضى
│   ├── AppointmentsManager.tsx # إدارة المواعيد
│   └── BillingManager.tsx  # إدارة الفواتير
├── lib/
│   └── supabase.ts         # إعدادات Supabase
├── .env.local              # متغيرات البيئة
├── package.json            # المكتبات المطلوبة
├── tsconfig.json           # إعدادات TypeScript
├── next.config.js          # إعدادات Next.js
└── README.md              # هذا الملف
```

## 🛠️ الأوامر المتاحة

- `npm run dev` - تشغيل خادم التطوير
- `npm run build` - بناء التطبيق
- `npm start` - تشغيل التطبيق الإنتاجي
- `npm run lint` - فحص الأكواد

## 📚 التقنيات المستخدمة

- **Next.js 14** - إطار عمل React
- **React 18** - مكتبة المستخدم
- **TypeScript** - لغة البرمجة
- **Tailwind CSS** - تصميم واجهات المستخدم
- **Supabase** - قاعدة البيانات والمصادقة
- **React Icons** - رموز المستخدم

## 🔒 الأمان

- لا تشارك مفاتيح Supabase الحقيقية في قاعدة الأكواد
- استخدم Row Level Security (RLS) في Supabase
- تحقق من صحة المدخلات على الجانب الخادم
- استخدم HTTPS في الإنتاج

## 📞 الدعم

للمساعدة أو الأسئلة، يرجى التواصل عبر البريد الإلكتروني.

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

---

**تم الإنشاء بـ ❤️ لإدارة عيادة الجهاز الهضمي**
