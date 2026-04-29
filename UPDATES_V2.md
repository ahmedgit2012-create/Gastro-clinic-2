# دليل استخدام نظام إدارة العيادة - النسخة المحسّنة

## التحديثات الجديدة

### 1. ✅ نظام الصلاحيات والأدوار (Role-Based Access Control)

تم إضافة نظام صلاحيات متقدم يتحكم في من يمكنه الوصول إلى أي ميزة:

#### الأدوار المتاحة:

- **مدير النظام (Admin)**
  - إدارة المستخدمين
  - عرض التقارير
  - إدارة المرضى
  - إدارة المواعيد
  - إدارة الفواتير
  - حذف البيانات

- **الطبيب (Doctor)**
  - عرض التقارير
  - إدارة المرضى
  - إدارة المواعيد
  - إدارة الفواتير

- **موظف الاستقبال (Receptionist)**
  - إدارة المرضى
  - إدارة المواعيد

### 2. 📊 نظام التقارير الإحصائية

تم إضافة صفحة تقارير شاملة توفر:

- **إحصائيات عامة:**
  - إجمالي المرضى
  - إجمالي المواعيد
  - المواعيد المكتملة
  - إجمالي الإيرادات

- **إحصائيات مالية:**
  - الفواتير المدفوعة
  - الفواتير المعلقة

- **البيانات الشهرية:**
  - عدد المواعيد شهرياً
  - الإيرادات الشهرية
  - عدد المرضى الجدد

- **تحديد الفترة الزمنية:**
  - اختيار تاريخ البداية والنهاية
  - تحديث البيانات تلقائياً

- **تحميل التقارير:**
  - تحميل التقرير بصيغة CSV

### 3. 👥 إدارة المستخدمين

تم إضافة صفحة متخصصة لإدارة المستخدمين (متاحة فقط للمسؤولين):

#### الميزات:
- إضافة مستخدمين جدد
- تعديل بيانات المستخدمين
- تعيين الأدوار المختلفة
- حذف المستخدمين
- البحث والفلترة

#### خطوات إضافة مستخدم:
1. انقر على تبويب "المستخدمون" (متاح فقط للمسؤولين)
2. انقر على "إضافة مستخدم"
3. أدخل البيانات:
   - الاسم
   - البريد الإلكتروني
   - الدور (موظف استقبال / طبيب / مدير نظام)
4. انقر "إضافة"

## الملفات الجديدة المضافة

```
lib/
  └── auth-context.tsx         # نظام الصلاحيات والسياق
  
hooks/
  └── usePermissions.ts        # Hook للتحقق من الصلاحيات

components/
  ├── UsersManager.tsx         # إدارة المستخدمين
  ├── ReportsManager.tsx       # التقارير الإحصائية
  ├── ProtectedComponent.tsx   # مكون محمي بصلاحيات
  └── Dashboard.tsx            # (محدّث) مع التبويبات الجديدة

SUPABASE_SETUP_V2.sql          # SQL لإنشاء الجداول والسياسات
```

## كيفية الاستخدام

### خطوة 1: تحديث قاعدة البيانات

قم بتشغيل الأوامر SQL في `SUPABASE_SETUP_V2.sql` في Supabase:

1. افتح Supabase Dashboard
2. اذهب إلى SQL Editor
3. انسخ وألصق محتوى `SUPABASE_SETUP_V2.sql`
4. اضغط "Run"

### خطوة 2: إضافة مستخدمين اختباريين

```sql
INSERT INTO users (email, name, role, password) VALUES
('admin@clinic.com', 'مدير النظام', 'admin', 'admin123'),
('doctor@clinic.com', 'د. أحمد محمد', 'doctor', 'doctor123'),
('receptionist@clinic.com', 'فاطمة علي', 'receptionist', 'reception123');
```

### خطوة 3: تسجيل الدخول والاستخدام

- استخدم بيانات المستخدم المضافة
- سيتم التحقق تلقائياً من الصلاحيات
- ستظهر فقط الميزات المتاحة لدورك

## أمثلة استخدام API

### التحقق من الصلاحيات في المكونات

```typescript
import { useAuth } from '@/lib/auth-context';

export default function MyComponent() {
  const { hasPermission, canAccess } = useAuth();

  if (!hasPermission('manage_users')) {
    return <div>ليس لديك صلاحية</div>;
  }

  return <div>محتوى محمي</div>;
}
```

### استخدام Hook للصلاحيات

```typescript
import { usePermissions } from '@/hooks/usePermissions';

export default function MyComponent() {
  const { canManageUsers, canViewReports } = usePermissions();

  return (
    <div>
      {canManageUsers && <button>إدارة المستخدمين</button>}
      {canViewReports && <button>عرض التقارير</button>}
    </div>
  );
}
```

### استخدام مكون محمي

```typescript
import { ProtectedComponent } from '@/components/ProtectedComponent';

export default function MyComponent() {
  return (
    <ProtectedComponent 
      permission="manage_users"
      fallback={<div>ليس لديك صلاحية</div>}
    >
      <div>محتوى محمي</div>
    </ProtectedComponent>
  );
}
```

## جداول البيانات

### جدول Users
```sql
- id: UUID (مفتاح أساسي)
- email: VARCHAR (فريد)
- name: VARCHAR
- role: VARCHAR (admin, doctor, receptionist)
- password: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### الجداول الأخرى
- **patients**: المرضى
- **appointments**: المواعيد
- **invoices**: الفواتير

## الصلاحيات المتاحة

| الصلاحية | الوصف |
|---------|-------|
| manage_users | إدارة المستخدمين |
| manage_patients | إدارة المرضى |
| manage_appointments | إدارة المواعيد |
| manage_billing | إدارة الفواتير |
| view_reports | عرض التقارير |
| delete_records | حذف السجلات |

## استكشاف الأخطاء

### المشكلة: لا تظهر تبويبات جديدة
- **الحل**: تأكد من أنك مسؤول (admin) لترى تبويب "المستخدمون"

### المشكلة: رسالة "ليس لديك صلاحية"
- **الحل**: تحقق من دورك في جدول users أو اطلب من المسؤول تحديث صلاحياتك

### المشكلة: البيانات لا تحفظ
- **الحل**: تحقق من اتصال Supabase والبيانات المدخلة

## الخطوات القادمة

للمزيد من التحسينات، يمكن إضافة:
- إرسال إشعارات بالبريد الإلكتروني
- تقارير متقدمة بالرسوم البيانية
- نظام نسخ احتياطي تلقائي
- إدارة الأدوار المتقدمة
- نظام السجلات (Audit Log)

## الدعم الفني

إذا واجهت أي مشاكل:
1. تحقق من رسائل الأخطاء
2. تأكد من الاتصال بـ Supabase
3. تحقق من بيانات المستخدم والصلاحيات
4. راجع سجلات المتصفح (F12)

---

**آخر تحديث**: 24/4/2026
**الإصدار**: 2.0.0
