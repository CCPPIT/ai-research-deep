"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {z} from "zod"
import{zodResolver} from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react'
import { useDeepResearchStore } from '@/store/deepResearch'

const formSchema=z.object({
    input:z.string().min(2).max(200)
})

const UserInput = () =>{
  const {setQuestions,setTopic,isLoading,setIsLoading}=useDeepResearchStore();
    
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            input:""
        }
    })
    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
      setIsLoading(true)
      try{
        const response=await fetch("/api/generate-questions",{
          method:"POST",
          body:JSON.stringify({topic:values.input})

        })
        const data=await response.json();
        setTopic(values.input);
        setQuestions(data)


      }catch(error){
        console.log(error)

      }finally{
        setIsLoading(false)
      }

    }
    
  return (

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col sm:flex-row items-center justify-center gap-4 w-[90vw] sm:w-[80vw] xl:w-[50vw]">
    <FormField
        control={form.control}
        name="input"
        render={({ field }) => (
          <FormItem className='flex-1 w-full'>
            <FormControl>
              <Input 
                placeholder="Enter your research topic" 
                type='input'
                {...field} 
                className='rounded-full w-full flex-1 p-4 py-4 sm:py-6 placeholder:text-sm bg-white/60 backdrop-blur-sm border-black/10 border-solid shadow-none'
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <Button type="submit" className='rounded-full px-6 cursor-pointer' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Submit'
        )}
      </Button> */}
      <Button
      type='submit'
      disabled={isLoading}
       className="group h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-950 to-blue-950 border border-green-900 rounded-lg flex items-center justify-center gap-1.5">
        {isLoading?(
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

             <span className='flex items-center justify-center'>Generating</span>
             <span className="group-hover:translate-x-0.5 transition-all">&rarr;</span>
            </>
        ):(
            <>
              <span className='flex items-center justify-center'>Submit</span>
              <span className="group-hover:translate-x-0.5 transition-all">&rarr;</span>
            </>
        

        )}
             
            </Button>
    </form>
  </Form>
 
  )
}

export default UserInput