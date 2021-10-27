import { NgModule } from '@angular/core';

import { ApplicationsRoutingModule } from './applications-routing.module'
import { ApplicationsComponent } from './applications.component';
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
import { AppCreationComponent } from './app-creation/app-creation.component';
import { DynamicK8RulesComponent  } from './dynamic-k8-rules/dynamic-k8-rules.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [CommonModule, 
    ApplicationsRoutingModule, 
    NzTableModule,
     NzDividerModule, 
     NzDropDownModule,
     NzGridModule,
     NzSelectModule,
     NzModalModule,  
     NzInputModule,
     NzFormModule , FormsModule, ReactiveFormsModule, NzIconModule, NzDescriptionsModule, NzButtonModule],
  declarations: [ApplicationsComponent, DynamicK8RulesComponent, AppCreationComponent],
  exports: [ApplicationsComponent]
})
export class ApplicationsModule {  
 


}
