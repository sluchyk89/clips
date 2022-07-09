import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class RegisterValidators {

  static march(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);
      if (!control || !matchingControl) {
        console.error('Form Control can not found in the form group!')
        return {controlNotfound: false}
      }
      const error =  control.value === matchingControl.value ? null : {noMatch: true}
      matchingControl.setErrors(error)
      return error
    }


  }
}
