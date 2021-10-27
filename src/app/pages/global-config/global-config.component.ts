import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
// import { GlobalConfig } from './global-config';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-global-config',
  templateUrl: './global-config.component.html',
  styleUrls: ['./global-config.component.scss'],
  providers: [AppService]
})

export class GlobalconfigComponent implements OnInit {

  validateForm!: FormGroup;
  globalConfig: any = {}; 
  selectedScaleType: string;
  listScaleType : string[];
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]],
      scalerType: [null, [Validators.required]],
    });
    this.getGlobalConfig();
    this.listScaleType = ['Horizontal Pod Autoscaler (HPA)']
    this.selectedScaleType = this.listScaleType[0];
    
  }

  getGlobalConfig(): void {
    this.appService.getGlobalConfig().subscribe(response=> {
      this.globalConfig = response['data'];
    }, error => {
      console.log("error: ", error);
    })
  }

  submitForm(): void {
    let dynamicRules; 
    if(!this.validateForm.valid) {
      this.openDirtyControl();
      return;
    }

    let registryName = this.validateForm.controls.name.value;
    let registryUrl = this.validateForm.controls.url.value;
    let email = this.validateForm.controls.email.value;
    let username = this.validateForm.controls.username.value;
    let password = this.validateForm.controls.password.value;
   
    console.log('registryName:', registryName);
    console.log('registryUrl:', registryUrl);
    console.log('email:', email);
    console.log('username:', username);
    console.log('password:', password);

    let jsonObj = {'registryName' : registryName, 'registryUrl': registryUrl, 'email': email, 'username': username, 'password': password}
    console.log('jsonObj:', jsonObj);
    this.appService.updateGlobalConfig(jsonObj).subscribe(response => {

    });
   
  }

  openDirtyControl(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
        }
    }
  }


  scaleTypeChange(value: string): void {
    console.log("changing:", value);
    this.selectedScaleType = value;
  }
}
