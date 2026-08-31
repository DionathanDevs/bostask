import {conn} from '../database/conn.js'

export const creatingTaskInKanban = async (obj) =>{
const title = String(obj.title)
const description = String(obj.description)
let tag = String(obj.tag).trim()

if(tag = 's'){
    tag = 1
}else{
    tag = 2
}


const cc = conn
try{

const sql = 'INSERT INTO tasks (title, description, tag, status) VALUES (?, ?, ?, ?)'

const [rows] = await cc.execute(sql, [title, description, tag, 1])

if(rows.affectedRows > 0){
    return true
}


}catch(err){
    throw err
}finally{
   await cc.end()
}

}