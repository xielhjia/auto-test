import { NgModule } from '@angular/core';

import { GlobalconfigRoutingModule } from './global-config-routing.module'
import { GlobalconfigComponent } from './global-config.component';
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

@NgModule({
  imports: [CommonModule, 
    GlobalconfigRoutingModule, 
    NzTableModule,
     NzDividerModule, 
     NzDropDownModule,
     NzGridModule,
     NzSelectModule,
     NzModalModule,  
     NzInputModule,
     NzFormModule , FormsModule, ReactiveFormsModule, NzIconModule, NzDescriptionsModule, NzButtonModule],
  declarations: [GlobalconfigComponent],
  exports: [GlobalconfigComponent]
})
export class ApplicationsModule {  
 


}
