export async function POST(req:Request){
    try{

   
    const {messages}=await req.json();
    const lastMessageContent=messages[messages.length-1].content;
    const parsed=JSON.parse(lastMessageContent)
    const topic=parsed.topic
    const clerifications=parsed.clerifications
    console.log(topic,clerifications)
}catch(error){
    console.log(error)

}
}