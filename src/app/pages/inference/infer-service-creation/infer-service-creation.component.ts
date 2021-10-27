import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicScaleRulesComponent } from '../dynamic-scale-rules/dynamic-scale-rules.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-infer-service-creation',
  templateUrl: './infer-service-creation.component.html',
  styleUrls: ['./infer-service-creation.component.scss'],
  providers: [AppService],

})
export class InferServiceCreationComponent implements OnInit {

  @Input() namespace:string
  @ViewChild('autoscalingRulesChild')
  autoscalingRulesChild : DynamicScaleRulesComponent;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      inferName: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      imageVersion: [null, [Validators.required]],
      storageUrl: [null, [Validators.required]],
      resourceType: [null, [Validators.required]],
      cpuResourceSize: [null, [Validators.required]],
      gpuResourceSize: [null, [Validators.required]],
      className: [null, [Validators.required]],
    });
  }



  submitForm(callback: Function): void {
    var hasError = false;
    let autoscalingRules; 
    if(!this.validateForm.valid) {
      this.openDirtyControl();
      return;
    }

    let inferName = this.validateForm.controls.inferName.value;
    let imageUrl = this.validateForm.controls.imageUrl.value;
    let imageVersion = this.validateForm.controls.imageVersion.value;
    let storageUrl = this.validateForm.controls.storageUrl.value;
    let resourceType = this.validateForm.controls.resourceType.value;
    let cpuResourceSize = this.validateForm.controls.cpuResourceSize.value;
    let gpuResourceSize = this.validateForm.controls.gpuResourceSize.value;
    let className = this.validateForm.controls.className.value;
    console.log('inferName:', inferName);

    let autoscalingRulesReuslt = this.autoscalingRulesChild.getVariables();
    if(autoscalingRulesReuslt.formError) {
      return;
    } else {
      autoscalingRules = autoscalingRulesReuslt.rulesArray;
      console.log(autoscalingRules);
    }

    
    var rules: { [key: string]: any } = {};
    autoscalingRules.forEach(rule =>{
      let ruleKey = rule.ruleKey;
      rules[ruleKey] = rule.ruleValue;
    })
    

    let jsonObj = {'inferenceServiceName' : inferName, 'imageUrl': imageUrl, 'imageVersion': imageVersion,
     'storageUrl': storageUrl, 'cpuResourceRequest': cpuResourceSize, 'gpuResourceRequest': gpuResourceSize, 
    'className': className,  'rules': rules }


    this.appService.addInference(this.namespace, jsonObj).subscribe(response => {
      if(response) {
        let code = response.code;
        if(code === 201) {
          console.log('create inference successfully')
        }
      }
    }, error => {

    })
    if(callback) {
      callback(hasError);
    }
  }

  openDirtyControl(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        }
    }
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

}
