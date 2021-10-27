import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicK8RulesComponent } from '../dynamic-k8-rules/dynamic-k8-rules.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-app-creation',
  templateUrl: './app-creation.component.html',
  providers: [AppService],
  styleUrls: ['./app-creation.component.scss']
})
export class AppCreationComponent implements OnInit {

  @Input() namespace:string
  @ViewChild('dynamicRules')
  dynamicRules: DynamicK8RulesComponent;
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: FormBuilder, private appService: AppService ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      appName: [null, [Validators.required]],
      imageUrl: [null, [Validators.required]],
      cpuRequest: [null,],
      memoryRequest: [null, ],
      scaleMetric: [null, [Validators.required]],
      scaleTarget: [null, [Validators.required]],
      lowerBound: [null, [Validators.required]],
      upperBound: [null, [Validators.required]],
      initialScale: [null, [Validators.required]],
      scaleDownDelay: [null, [Validators.required]],
    });
  }

  submitForm(callback: Function): void {
    var hasError = false;
    let dynamicRules; 
    if(!this.validateForm.valid) {
      this.openDirtyControl();
      return;
    }

    let appName = this.validateForm.controls.appName.value;
    let imageUrl = this.validateForm.controls.imageUrl.value;
    let cpuRequest = this.validateForm.controls.cpuRequest.value;
    let memoryRequest = this.validateForm.controls.memoryRequest.value;
    let scaleMetric = this.validateForm.controls.scaleMetric.value;
    let scaleTarget = this.validateForm.controls.scaleTarget.value;
    let lowerBound = this.validateForm.controls.lowerBound.value;
    let upperBound = this.validateForm.controls.upperBound.value;
    let initialScale = this.validateForm.controls.initialScale.value;
    let scaleDownDelay = this.validateForm.controls.scaleDownDelay.value;
    console.log('appName:', appName);
    console.log('imageUrl:', imageUrl);
    console.log('cpuRequest:', cpuRequest);
    console.log('memoryRequest:', memoryRequest);

    let dynamicRulesReuslt = this.dynamicRules.getVariables();
    if(dynamicRulesReuslt.formError) {
      return;
    } else {
      dynamicRules = dynamicRulesReuslt.rulesArray;
      console.log(dynamicRules);
    }


    var environments: { [key: string]: any } = {};
    dynamicRules.forEach(rule =>{
      let ruleKey = rule.ruleKey;
      environments[ruleKey] = rule.ruleValue;
    })
    


    let jsonObj = {'appName' : appName, 'imageUrl': imageUrl, 'metrics': scaleMetric,
     'target': scaleTarget, 'minScale': lowerBound, 'maxScale': upperBound, 'initialScale': initialScale,
    'scaleDownDelay': scaleDownDelay, 'cpuResourceRequest': cpuRequest, 'memoryResourceRequest': memoryRequest,
    'environment': environments,
    
   }


    this.appService.addApplication(this.namespace, jsonObj).subscribe(response => {
      if(response) {
        let code = response.code;
        if(code === 201) {
          console.log('create application successfully')
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