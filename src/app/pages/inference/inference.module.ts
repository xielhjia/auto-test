import { NgModule } from '@angular/core';

import { InferenceRoutingModule } from './inference-routing.module';

import { InferenceComponent } from './inference.component';
import { NzTableModule  } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from "@angular/common";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { InferServiceCreationComponent } from './infer-service-creation/infer-service-creation.component';
import { DynamicScaleRulesComponent  } from './dynamic-scale-rules/dynamic-scale-rules.component';
// import { DynamicK8RulesComponent  } from '../applications/dynamic-k8-rules/dynamic-k8-rules.component';

@NgModule({
  imports: [CommonModule, 
    InferenceRoutingModule, 
    NzTableModule,
     NzDividerModule, 
     NzDropDownModule,
     NzGridModule,
     NzSelectModule,
     NzModalModule,  
     NzInputModule,
     NzButtonModule,
     NzFormModule , FormsModule, ReactiveFormsModule, NzIconModule, NzDescriptionsModule, NzPopconfirmModule],
  declarations: [InferenceComponent, InferServiceCreationComponent, DynamicScaleRulesComponent],
  exports: [InferenceComponent]
})
export class InferenceModule {  
 

}
