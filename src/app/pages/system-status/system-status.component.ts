import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.scss'],
  providers:[AppService],
})

export class SystemstatusComponent implements OnInit {
  
  listOfData : any[];
  loading: boolean;
  constructor(private appService: AppService) {   }

  ngOnInit() {
    this.getSystemStatus();
    this.listOfData = [];
  }

  getSystemStatus(): void {
    this.loading = true;
    this.appService.getSystemstatus().subscribe(response => {
      let statusList = response['data'];
      this.loading = false;
      if(statusList.length > 0) {
        for (let index = 0 ; index <  statusList.length; index += 1) {
          statusList[index].id = index;
        }
        this.listOfData = statusList;
      }
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }
 
}
