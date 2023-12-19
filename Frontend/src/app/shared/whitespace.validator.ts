import { AbstractControl, ValidationErrors } from '@angular/forms';  
    
export class WhiteSpace {  
    static noSpaceAllowed(control: AbstractControl) : ValidationErrors | null {  
        if((control.value as string).indexOf(' ') >=0){  
            return {noSpaceAllowed: true}  
        }  
    
        return null;  
    }  
}