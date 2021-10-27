import { Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { InferServiceCreationComponent } from './infer-service-creation/infer-service-creation.component';
// import { Inference } from './inference';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-inference',
  providers: [AppService],
  templateUrl: './inference.component.html',
  styleUrls: ['./inference.component.scss']
})

export class InferenceComponent implements OnInit {

  @ViewChild('childModal')
  childModal: InferServiceCreationComponent;

  listNamespace: string[] = [];

  // listNS: string[]; 
  selectedNS: string;
  modalType: string;
  inferences: Array<any> = [];

  expandSet = new Set<number>();
  loading: boolean;

  constructor(private appService: AppService) { }


  isVisible = false;
  isOkLoading = false;



  ngOnInit() {
    this.loading = true;
    this.modalType = 'create';
    // this.inference =; 
    this.getNamespaces();
  }

  getNamespaces(): void {
    this.appService.getNamespaces().subscribe(response => {
      let namespaces = response['data'];
      console.log('namespace:', namespaces);
      this.listNamespace = namespaces;
      if(this.listNamespace.length > 0) {
        this.selectedNS = this.listNamespace[0]; 
        this.getInferences();
      }
    }, error => {
      console.log(error);
    })
  }

  getInferences(): void {
    this.inferences = [];
    this.loading = true;
    this.appService.getInferences(this.selectedNS)
      .subscribe(response => {
        let serviceResp = response['data'];
        if(serviceResp.length >  0) {
          for (let index = 0 ; index < serviceResp.length; index += 1) {
            serviceResp[index].id = index;
          }
        }
        this.inferences = serviceResp;
        this.loading = false;
      });
  }

  

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }


  showModal(): void {
    this.isVisible = true;
  }

  
  getAutoscalingRules(inference: any) {
    if(! inference.rules) {
      return [];
    }
    return Object.keys(inference.rules);

  }

 handleOk(): void {
    this.isOkLoading = true;
    this.childModal.submitForm(()=> {
      setTimeout(() => {
        console.log("submitted form");
        this.isVisible = false;
        this.isOkLoading = false;
      }, 3000);
    } );


  }
  handleCancel(): void {
    this.isVisible = false;
  }

  // get List inferenceservice of selected namespace 
  namespaceChange(value: string): void {
    console.log("changing:", value);
 
    this.selectedNS = value;
    this.getInferences();
  }

  deleteRow(id: number): void {
    // this.listOfData = this.listOfData.filter(d => d.id !== id);
  }
  
  editInference(id: number): void {
    // this.inference = this.listOfData[id];

    console.log('editing inference');
  }
}
