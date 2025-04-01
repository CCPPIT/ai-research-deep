"use client"
import React, { useCallback, useEffect } from 'react'
import QuestionForm from './QuestionForm'
import { useDeepResearchStore } from '@/store/deepResearch'
import { useChat } from '@ai-sdk/react';
import { Activity ,Source} from '@/app/api/deep-research/types';
import CompletedQuestions from './CompletedQuestions';






const QnA = () => {

  const {questions,setActivities,setSoures,setIsLoading,setReport,topic,answers,isCompleted}=useDeepResearchStore();
  const {append,data,isLoading}=useChat({
    api:"/api/deep-research"
  })
  // استخدام useCallback لتحسين الأداء ومنع إعادة الإنشاء غير الضرورية

  const processChatData=useCallback((messages:unknown[])=>{
        // التحقق من صحة البيانات المدخلة

    try{
      if(!messages||!Array.isArray(messages))return;
          // استخراج الأنشطة باستخدام Type Guard للتحقق الآمن من الأنواع
         const activities=messages
         .filter((msg):msg is {type:'activity';content:Activity;}=>
          typeof msg==="object"&&
         msg !==null &&
         'type' in msg &&
         msg.type==="activity"&&
         'content' in msg 
        ).map(msg=>msg.content)
        setActivities(activities) // تحديث حالة الأنشطة

             // استخراج المصادر من الأنشطة المكتملة فقط
     const sources=activities
     .filter((activity):activity is Activity&{type:"extract";status:"complete"}=>
      activity.type==="extract"&&
     activity.status==="complete"

    )
    .map((activity):Source | null=>{
      try{
         // استخراج الرابط باستخدام regex أكثر دقة
         const urlMatch = activity.message.match(/from\s+(https?:\/\/[^\s]+)/i);
         if (!urlMatch?.[1]) return null;
         // استخدام URL API لتحليل الروابط بشكل صحيح
         const url = new URL(urlMatch[1]);
         return {
          url: url.toString(),
          title: url.hostname.replace('www.', '') || 'Untitled Source'
        };

      }catch{
        return null;  // تجاهل الروابط غير الصالحة


      }
    }).filter((source):source is Source=>source !==null)
    setSoures(sources)
    // البحث عن رسالة التقرير باستخدام Type Guard
const reportData=messages.find((msg):msg is{type:'report';content:string}=>
  typeof msg==="object"&&
msg !==null&&
'type' in msg&&
msg.type==="report"&&
'content' in msg&&
  typeof msg.content ==='string'
);
setReport(reportData?.content||'')


    }catch(error){
      console.error('Error processing chat data:', error);
      // يمكن هنا إضافة معالجة أخطاء أكثر تطوراً

    }

  },[setActivities,setSoures,setReport]);
// Effect لمعالجة البيانات عند تغيرها
useEffect(() => {
  if (!data) return;  // الخروج المبكر إذا لم تكن هناك بيانات
  
  processChatData(data);  // معالجة البيانات
  setIsLoading(isLoading);  // تحديث حالة التحميل
}, [data, isLoading, processChatData, setIsLoading]);  // تبعيات useEffect
useEffect(() => {
  // يتم تنفيذ هذا التأثير عندما:
  // 1. isCompleted = true (اكتمل البحث)
  // 2. هناك أسئلة (questions.length > 0)
  if (isCompleted && questions.length > 0) {
    
    // إنشاء مصفوفة من الأسئلة والإجابات المقابلة
    const clarifications = questions.map((question, index) => ({
      question: question,       // نص السؤال
      answer: answers[index],   // الإجابة المقابلة
    }));

    // إرسال البيانات إلى API الدردشة
    append({
      role: "user",  // دور المرسل (user)
      content: JSON.stringify({  // محتوى الرسالة
         topic,            // موضوع البحث
         clarifications  // الأسئلة والإجابات
      }),
    });
  }
}, [isCompleted, questions, answers, topic, append]); // التبعيات

  if(questions.length===0)return null
  return (
    <div className="flex gap-4 w-full flex-col items-center mb-16">
        <QuestionForm/>
        <CompletedQuestions/>

    </div>
  )
} 

export default QnA