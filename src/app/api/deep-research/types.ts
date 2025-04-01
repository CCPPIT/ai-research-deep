// تعريف واجهة (Interface) تسمى Activity تصف نشاطًا في النظام
export interface Activity {
    // نوع النشاط - يجب أن يكون أحد القيم المحددة
    type: "search" | "extract" | "analyze" | "generate" | "Planning";
    
    // حالة النشاط - يجب أن تكون أحد القيم المحددة
    status: "pending" | "complete" | "warning" | "error";
    
    // رسالة توضح تفاصيل النشاط (نص حر)
    message: string;
    
    // الطابع الزمني للنشاط (عدد يمثل الوقت عادةً بالمللي ثانية منذ epoch)
    timestamp: number;
}

// تعريف واجهة (Interface) تسمى Source لتمثيل مصدر بيانات
export interface Source {
    // رابط URL للمصدر (مثال: "https://example.com/article")
    url: string;
    
    // عنوان المصدر (مثال: "أحدث تطورات الذكاء الاصطناعي في 2023")
    title: string;
}