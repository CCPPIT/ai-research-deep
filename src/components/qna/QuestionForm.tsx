import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useDeepResearchStore } from '@/store/deepResearch'

const formSchema = z.object({
  answer: z.string().min(1, "Answer is required!")
})



const QuestionForm = () => {

    const {questions, currentQuestion, answers, setCurrentQuestion, setAnswers, setIsCompleted, isLoading, isCompleted} = useDeepResearchStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answer: answers[currentQuestion] || "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // 1. تحديث الإجابات
        const newAnswers = [...answers]; // إنشاء نسخة جديدة من مصفوفة الإجابات
        newAnswers[currentQuestion] = values.answer; // تحديث الإجابة الحالية
        setAnswers(newAnswers); // حفظ الإجابات المحدثة
      
        // 2. التحكم في تدفق الأسئلة
        if (currentQuestion < questions.length - 1) {
          // إذا لم نصل للسؤال الأخير:
          setCurrentQuestion(currentQuestion + 1); // الانتقال للسؤال التالي
          form.reset(); // إعادة تعيين النموذج
        } else {
          // إذا كنا عند السؤال الأخير:
          setIsCompleted(true); // تحديد أن البحث اكتمل
        }
      }
      
      // 3. شروط الخروج المبكر من العرض
      if (isCompleted) return; // إذا اكتمل البحث، لا تعرض شيئاً
      
      if (questions.length === 0) return; // إذا لم توجد أسئلة، لا تعرض شيئاً


  return (

    <Card className=' w-full  max-w-[90vw] sm:max-w-[80vw] xl:max-w-[50vw] shadow-none bg-white/60 backdrop-blur-sm border rounded-xl border-black/10 border-solid px-4 py-6'>
  <CardHeader className='px-4 sm:px-6'>
    <CardTitle className='text-base text-primary/50'>
        Question {currentQuestion + 1} of {questions.length}
    </CardTitle>
  </CardHeader>
  <CardContent className='space-y-6 w-full px-4 sm:px-6'>
    <p className='text-base'>{questions[currentQuestion]}</p>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="answer"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="Type your answer here..." {...field}
              className='px-4 py-2 text-base resize-none placeholder:text-sm border-black/20'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='flex justify-between items-center'>
        <Button type='button' variant={"outline"}
        onClick={()=>{
          if(currentQuestion>0){
            setCurrentQuestion(currentQuestion-1)
          }
          form.setValue("answer", answers[currentQuestion-1]||"")
        }}
        >
          Previous
        </Button>
        <Button type='submit'
        disabled={isLoading}
        >
          {currentQuestion===questions.length-1?"Start Research":"Next"}

        </Button>

      </div>
    </form>
  </Form>
<div className='h-1 w-full bg-gray-300 rounded'>
  <div
  className='h-1 bg-primary rounded transition-all duration-300'
  style={{
    width:`${((currentQuestion+1)/questions.length)*100}%`
  }}
  />

</div>
 
  
  </CardContent>
</Card>
   
  )
}

export default QuestionForm