import React from "react"

export const InputTextArea = (
    { title, name, className, maxLength, rows, placeholder, onChange, refr, pattern, errorMessage, 
         ...rest }) => {
    
    
    return (
       <div className="mb-3">
            { title ? <h2 className="font-semibold text-sm pb-1">{ title }</h2> : null} 
            <textarea className={className} style={{ display: 'block', resize: 'none' }}  // Para quitar el margin below
                name={(title || name).toLowerCase()}  // Si hay title, uso el title. Si no, uso el 'name'
                rows={rows || "3"}
                maxLength={maxLength || 255} 
                placeholder={placeholder || "Write a comment..."} 
                onChange={onChange}
                ref={refr}
                spellCheck={false}  // Para omitir las correcciones
                
                { ...rest }
            />
       </div>
    )
}