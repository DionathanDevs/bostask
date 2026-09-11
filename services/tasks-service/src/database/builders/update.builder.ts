

export function buildDynamicUpdate(data: Record<string, any>, startParamIndex = 1) {
    
const entries = Object.entries(data).filter(([_, value]) => value !== undefined)

if(entries.length === 0){
    return null;
}

const setClauses = entries.map(([key,_], index) => `${key} = ?`).join(`, `)

const values = entries.map(([_, val]) => val)

return { setClauses, values }

}