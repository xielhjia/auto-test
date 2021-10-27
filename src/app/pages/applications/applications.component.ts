import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppCreationComponent } from './app-creation/app-creation.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  providers: [AppService],
  styleUrls: ['./applications.component.scss']
})

export class ApplicationsComponent implements OnInit {

  @ViewChild('childModal')
  childModal: AppCreationComponent;
  listNamespace: string[] =  []; 
  selectedNS: string;
  // loading: boolean;
  tableLoading: boolean;
  applications: Array <any> = [];
  expandSet = new Set<number>();
  isVisible = false;
  isOkLoading = false;


  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    // this.loading = true;
    this.getNamespaces();
  }

  getNamespaces(): void {
    this.appService.getNamespaces().subscribe(response => {
      let namespaces = response['data'];
      console.log('namespace:', namespaces);
      this.listNamespace = namespaces;
      if(this.listNamespace.length > 0) {
        this.selectedNS = this.listNamespace[0]; 
        this.getApplications();
      }
    }, error => {
      console.log(error);
    })
  }

  getApplications(): void {
    this.applications = [];
    this.tableLoading = true;
    this.appService.getApplications(this.selectedNS)
      .subscribe(response => {
        let appResp = response['data'];
        console.log('applications:', appResp);
        if(appResp.length >  0) {
          for (let index = 0 ; index < appResp.length; index += 1) {
            appResp[index].id = index;
          }
        }
        this.applications = appResp
        this.tableLoading = false;
        // this.loading = false;
      });
  }


  getDynamicRules(application: any) {
    if(! application.environment) {
      return [];
    }
    return Object.keys(application.environment);
  }


  showModal(): void {
    this.isVisible = true;
  }


 handleOk(): void {
    this.isOkLoading = true;
    this.childModal.submitForm( (error: boolean) => {
      setTimeout(() => {
        this.isOkLoading = false;
        console.log("submitted form");
        if(!error) {
          this.isVisible = false;
        }
        this.getApplications();
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
    this.getApplications();
  }
}
