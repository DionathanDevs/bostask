
export const creatingTaskInKanban = async (obj) =>{
const title = String(obj.title)
const description = String(obj.description)
let tag = String(obj.tag).trim()

if(tag = 's'){
    tag = 1
}else{
    tag = 2
}
const objForPost = {
    title: title,
    description: description,
    tag: tag,
    status: 1
}


try{

const url = process.env.URL_TASK
const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(objForPost)
})

return response

}catch(err){
    throw err
}


}