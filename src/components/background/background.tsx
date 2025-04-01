"use client"
import { twMerge } from 'tailwind-merge'
import { Lights } from './lights'
import { Marquee } from '../marquee/marquee'
import { Logos } from '../logo/logos'
// import UserInput from '../user/UserInput'
// import QnA from '../qna/QnA'


export const Example = () => {
      const arr = [Logos.tailwindcss, Logos.framer, Logos.nextjs, Logos.aws]
    
  return (
   

   
    <div className="bg-black w-full h-full block">
      <div className={'w-full h-full relative  bg-grid-white/[0.03] px-4'}>
        <div
          className={
            'w-full h-full flex flex-col sm:items-center items-start justify-center relative z-[1] animate-moveUp'
          }
        >
          <div className="relative w-full">
            <div className="bg-gradient-to-br from-green-950/[0.8] to-blue-950/[0.7] border border-green-900 rounded-lg p-1 aspect-square overflow-hidden absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -top-12">
              <span
                className={twMerge(
                  'text-xl',
                  'text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-yellow-400 '
                )}
              >
                ✨
              </span>
            </div>
          </div>
          <div
            className={
              'text-transparent sm:text-center text-start font-bold sm:text-5xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6]'
            }
          >
           Deep Research.
          </div>
          <div className="text-white/[0.7] sm:text-center text-start p-1">
           Enter a topic and answer a few questions to generate a comprehensive research report.
          </div>
         
       
          
          <div className="  mt-5 w-full flex max-sm:flex-col  justify-center sm:gap-10 gap-4 text-white">
           
{/*          
             <div className="  mt-5 w-full flex max-sm:flex-col  justify-center sm:gap-10 gap-4 text-white">
            <UserInput/>
           

            </div>
             <QnA/> */}

          
            
          </div>
        
            
          <div className='flex gap-10 mt-40  bottom-0'>
        <Marquee>
      {arr.map((Logo,index)=>(
              <div
              key={index}
              className="relative h-full w-fit mx-[4rem] flex items-center justify-start"
              
              
            >
              <Logo 
             
              
               />
            </div>
          ))}

      </Marquee>

        </div>
        </div>
      
        <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
          <Lights/>
        </div>
       
      </div>

     
    </div>
   
  )
}
