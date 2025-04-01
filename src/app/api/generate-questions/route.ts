import {createOpenRouter} from "@openrouter/ai-sdk-provider"
import { generateObject } from 'ai';

import { NextResponse } from "next/server";
import { z } from "zod";
const openrouter=createOpenRouter({
    apiKey:process.env.OPENROUTER_API_KEY||""
})




// تعريف دالة غير متزامنة (async) تأخذ موضوع البحث كمدخل وتعيد مصفوفة من الأسئلة التوضيحية

const clarifyResearchGoals=async(topic:string)=>{
       // إنشاء نص (prompt) الذي سيتم إرساله لنموذج الذكاء الاصطناعي
    // يحتوي على موضوع البحث محاط بوسوم <topic> لتمييزه
   
    const prompt = `
    Given the research topic <topic>${topic}</topic>, generate 2-4 clarifying questions to help narrow down the research scope. Focus on identifying:
    - Specific aspects of interest
    - Required depth/complexity level
    - Any particular perspective or excluded sources
    `;
    try{
     // استدعاء دالة generateObject للتفاعل مع نموذج الذكاء الاصطناعي
     const {object}=await generateObject({
        model:openrouter("meta-llama/llama-3.3-70b-instruct"),
     // إرسال النص الذي أنشأناه سابقاً

        prompt,
     // تحديد شكل المخرجات المتوقع باستخدام مكتبة Zod للتحقق من الصحة

        schema:z.object({
            questions:z.array(z.string())// نتوقع مصفوفة من الأسئلة (نصوص)
        })
     });
     return object.questions


    }catch(error){
                // في حالة حدوث خطأ، نطبعه في الكونسول ونعيد مصفوفة فارغة (ضمنياً)

        console.log("Error While Generating Clarifying Questions:",error)

    }
    
    

}




export async function POST(req:Request) {
    const {topic}=await req.json();
    console.log("Topic:",topic);
    try{

        const questions=await clarifyResearchGoals(topic);
        console.log("Generated Questions:",questions)
        return NextResponse.json(questions)

    }catch(error){
        console.log("Error While Generating Questions:",error);
        return NextResponse.json({
            success:false,
            error:"Failed To Generate Questions"
        },{status:500})

    }
    
}