import { Activity, Source } from "@/app/api/deep-research/types";
import {create} from "zustand"

// واجهة تمثل حالة بحث متعمق في نظام ما
export interface DeepResearchState {
    // الموضوع الرئيسي للبحث (مثال: "تأثير الذكاء الاصطناعي على التعليم")
    topic: string;
    
    // مصفوفة الأسئلة البحثية التي تم توليدها
    questions: string[];
    
    // مصفوفة الإجابات التي تم الحصول عليها لكل سؤال
    answers: string[];
    
    // الفهرس الحالي للسؤال الذي يتم معالجته (يبدأ عادةً من 0)
    currentQuestion: number;
    
    // علامة تشير إلى اكتمال البحث
    isCompleted: boolean;
    
    // علامة تشير إلى أن النظام يقوم بمعالجة أو جلب بيانات
    isLoading: boolean;
    
    // سجل الأنشطة التي تم تنفيذها خلال البحث
    activities: Activity[];
    
    // المصادر التي تم استخدامها في البحث (ملاحظة: هناك خطأ إملائي هنا "soures" بدلاً من "sources")
    soures: Source[];
    
    // التقرير النهائي أو الملخص الذي تم إنشاؤه من البحث
    report: string;
}
/**
 * واجهة تحدد جميع الإجراءات الممكنة لإدارة حالة البحث المتعمق
 * تحتوي على دوال لتعديل كل جزء من حالة البحث
 */
export interface DeepResearchActions {
    /**
     * تحديث موضوع البحث الرئيسي
     * @param topic النص الجديد لموضوع البحث
     */
    setTopic: (topic: string) => void;
    
    /**
     * تحديث قائمة الأسئلة البحثية
     * @param questions مصفوفة الأسئلة الجديدة
     */
    setQuestions: (questions: string[]) => void;
    
    /**
     * تحديث قائمة الإجابات على الأسئلة
     * @param answers مصفوفة الإجابات الجديدة
     */
    setAnswers: (answers: string[]) => void;
    
    /**
     * تحديث الفهرس الحالي للسؤال قيد المعالجة
     * @param currentQuestion الفهرس الجديد (يبدأ من 0)
     */
    setCurrentQuestion: (currentQuestion: number) => void;
    
    /**
     * تحديث حالة اكتمال البحث
     * @param isCompleted true إذا اكتمل البحث، false إذا لم يكتمل
     */
    setIsCompleted: (isCompleted: boolean) => void;
    
    /**
     * تحديث حالة التحميل/المعالجة
     * @param isLoading true إذا كان النظام يقوم بمعالجة، false إذا كان خاملاً
     */
    setIsLoading: (isLoading: boolean) => void;
    
    /**
     * تحديث سجل الأنشطة والعمليات
     * @param activities مصفوفة الأنشطة الجديدة
     */
    setActivities: (activities: Activity[]) => void;
    
    /**
     * تحديث قائمة المصادر البحثية
     * @param soures مصفوفة المصادر الجديدة
     * @note يوجد خطأ إملائي في اسم المعلمة (يجب أن تكون sources بدلاً من soures)
     */
    setSoures: (soures: Source[]) => void;
    
    /**
     * تحديث التقرير النهائي للبحث
     * @param report النص الكامل للتقرير
     */
    setReport: (report: string) => void;
}


const initialState:DeepResearchState={
    topic:"",
    questions:[],
    answers:[],
    currentQuestion:0,
    isCompleted:false,
    isLoading:false,
    activities:[],
    soures:[],
    report:""
}
// إنشاء وتصدير مخزن (store) باستخدام مكتبة zustand
export const useDeepResearchStore = create<
  // تحديد نوع المخزن كدمج بين واجهة الحالة (State) والإجراءات (Actions)
  DeepResearchState & DeepResearchActions
>((set) => ({
  // نشر القيم الأولية للحالة (يجب تعريف initialState في مكان آخر)
  ...initialState,
  
  // 1. إجراء لتحديث موضوع البحث
  setTopic: (topic: string) => set({ topic }), // تحديث حقل topic فقط
  
  // 2. إجراء لتحديث قائمة الأسئلة
  setQuestions: (questions: string[]) => set({ questions }), // تحديث حقل questions
  
  // 3. إجراء لتحديث قائمة الإجابات
  setAnswers: (answers: string[]) => set({ answers }), // تحديث حقل answers
  
  // 4. إجراء لتحديث السؤال الحالي (يفترض أن يكون currentQuestionIndex وليس currentQuestion)
  setCurrentQuestion: (currentQuestion: number) => set({ currentQuestion }), // ملاحظة: قد يكون الخطأ في اسم الحقل
  
  // 5. إجراء لتحديث حالة الإكتمال
  setIsCompleted: (isCompleted: boolean) => set({ isCompleted }), // تحديث حقل isCompleted
  
  // 6. إجراء لتحديث حالة التحميل
  setIsLoading: (isLoading: boolean) => set({ isLoading }), // تحديث حقل isLoading
  
  // 7. إجراء لتحديث قائمة الأنشطة
  setActivities: (activities: Activity[]) => set({ activities }), // تحديث حقل activities
  
  // 8. إجراء لتحديث قائمة المصادر (يحتوي على خطأ إملائي - يجب أن يكون sources بدلاً من soures)
  setSoures: (soures: Source[]) => set({ soures }), // يحتاج لتصحيح إملائي
  
  // 9. إجراء لتحديث التقرير النهائي
  setReport: (report: string) => set({ report }) // تحديث حقل report
}))