# 📋 دليل إعداد قاعدة البيانات Supabase

هذا الدليل سيساعدك على إنشاء قاعدة البيانات والجداول في Supabase.

## الخطوة 1: تسجيل الدخول لـ Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخول أو أنشئ حساب جديد
3. انقر على "New Project"

## الخطوة 2: إنشاء المشروع

1. اختر اسم المشروع (مثل: clinic-management)
2. اختر كلمة مرور قوية
3. اختر الفريق والمنطقة الجغرافية
4. انقر على "Create new project"

## الخطوة 3: إنشاء الجداول

بعد إنشاء المشروع:

### 1️⃣ جدول المرضى (Patients)

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age INTEGER,
  medical_history TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2️⃣ جدول المواعيد (Appointments)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3️⃣ جدول الفواتير (Invoices)

```sql
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

## الخطوة 4: تنفيذ SQL

1. اذهب إلى **SQL Editor** من القائمة اليسرى
2. انسخ والصق الكود SQL أعلاه
3. انقر على **Run** لتنفيذ الكود

## الخطوة 5: إضافة المستخدمين

للمصادقة:

1. اذهب إلى **Authentication** من القائمة اليسرى
2. انقر على **New User**
3. أضف بيانات المستخدم:
   - البريد: doctor@test.com
   - كلمة المرور: 123456

## الخطوة 6: الحصول على المفاتيح

1. اذهب إلى **Project Settings** (أسفل القائمة اليسرى)
2. انقر على **API**
3. انسخ:
   - `Project URL` → NEXT_PUBLIC_SUPABASE_URL
   - `Publishable key` → NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

## الخطوة 7: تحديث ملف .env.local

أضف المفاتيح إلى ملف `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key-here
```

## ✅ تم!

الآن يمكنك تشغيل التطبيق باستخدام:

```bash
npm run dev
```

---

**نصيحة:** تأكد من حفظ البيانات الحساسة (المفاتيح الخاصة) في ملف `.env.local` ولا تشاركها في السيطرة على الإصدار.
