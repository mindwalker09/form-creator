import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  jsonData: any = {
    "campusFacilities": ["Library", "Gym", "Cafeteria"]
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.buildFormGroup(this.jsonData);
  }

  buildFormGroup(obj: any): any {
    const group: any = {};
    Object.keys(obj).forEach(key => {
      group[key] = this.buildControl(obj[key]);
    });
    return this.fb.group(group);
  }

  buildFormArray(arr: any[]): FormArray {
    return this.fb.array(arr.map(item => this.buildControl(item)));
  }

  buildControl(value: any): AbstractControl {
    if (Array.isArray(value)) {
      return this.buildFormArray(value);
    } else if (value !== null && typeof value === 'object') {
      return this.buildFormGroup(value);
    } else {
      return new FormControl(value);
    }
  }

  // ✅ Safe wrappers for template (no casting in HTML)
  safeIsFormGroup(val: any): boolean {
    return val instanceof FormGroup;
  }
  safeIsFormArray(val: any): boolean {
    return val instanceof FormArray;
  }
  safeAsFormGroup(val: any): FormGroup {
    return val as FormGroup;
  }
  safeAsFormArray(val: any): FormArray {
    return val as FormArray;
  }

  onSubmit() {
    console.log('✅ Final Form Value:', this.form.value);
  }

  castKey(key: any): string {
    return String(key);
  }
}
