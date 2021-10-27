import { Component, OnInit } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { NzInputModule } from 'ng-zorro-antd/input';


export interface AutoscalingRule {
  ruleKey: string;
  ruleValue: string;
}

interface AutoscalingRulesResult {
  formError: Boolean;
  rulesArray:  AutoscalingRule[];
}


@Component({
  selector: 'app-dynamic-scale-rules',
  templateUrl: './dynamic-scale-rules.component.html',
  styleUrls: ['./dynamic-scale-rules.component.scss']
})
export class DynamicScaleRulesComponent implements OnInit {


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

  getVariables(): AutoscalingRulesResult {

    let autoscalingRuleResult: AutoscalingRulesResult = {
      formError: false,
      rulesArray:[],
    }

    if(!this.validateForm.valid) {
      autoscalingRuleResult.formError = true;
      return autoscalingRuleResult;
    }

    let autoscalingRuleArray = [];
    for(var index = 0; index < this.listOfControl.length; index ++) {
      let variableKey = this.validateForm.controls[`variable${index}_key`].value;
      let variableValue = this.validateForm.controls[`variable${index}_value`].value;
      let aRule: AutoscalingRule = {
        ruleKey: '',
        ruleValue: '',
      };
      aRule.ruleKey = variableKey;
      aRule.ruleValue = variableValue;
      autoscalingRuleArray.push(aRule);
    }

    console.log(autoscalingRuleArray);
    autoscalingRuleResult.formError = false;
    autoscalingRuleResult.rulesArray = autoscalingRuleArray;
    return autoscalingRuleResult;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.addField();
  }
}