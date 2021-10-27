import { Component, OnInit } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NzInputModule } from 'ng-zorro-antd/input';

export interface DynamicRule {
  ruleKey: string;
  ruleValue: string;
}

interface DynamicRulesResult {
  formError: Boolean;
  rulesArray:  DynamicRule[];
}

@Component({
  selector: 'app-dynamic-k8-rules',
  templateUrl: './dynamic-k8-rules.component.html',
  styleUrls: ['./dynamic-k8-rules.component.scss']
})
export class DynamicK8RulesComponent implements OnInit {


  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; controlInstanceKey: string ; controlInstanceValue: string}> = [];
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstanceKey: `variable${id}_key`,
      controlInstanceValue: `variable${id}_value`
    };
    // const controlValue = {
    //   id, 
    //   controlInstance: `variable${id}_value`
    // }
    const index = this.listOfControl.push(control);
    // const index = this.listOfControl.push(controlValue);

    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.validateForm.
    addControl(
      this.listOfControl[index - 1].controlInstanceKey,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      this.listOfControl[index - 1].controlInstanceValue,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstanceKey: string ; controlInstanceValue: string}, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.validateForm.removeControl(i.controlInstanceKey);
      this.validateForm.removeControl(i.controlInstanceValue);
    }
  }


  getVariables(): DynamicRulesResult {

    let dynamicRuleResult: DynamicRulesResult = {
      formError: false,
      rulesArray:[],
    }

    if(!this.validateForm.valid) {
      dynamicRuleResult.formError = true;
      return dynamicRuleResult;
    }

    let dynamicRuleArray = [];
    for(var index = 0; index < this.listOfControl.length; index ++) {
      let variableKey = this.validateForm.controls[`variable${index}_key`].value;
      let variableValue = this.validateForm.controls[`variable${index}_value`].value;
      let dRule: DynamicRule = {
        ruleKey: '',
        ruleValue: '',
      };
      dRule.ruleKey = variableKey;
      dRule.ruleValue = variableValue;
      dynamicRuleArray.push(dRule);
    }

    console.log(dynamicRuleArray);
    dynamicRuleResult.formError = false;
    dynamicRuleResult.rulesArray = dynamicRuleArray;
    return dynamicRuleResult;

  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }

}
