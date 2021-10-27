export class SystemStatus {
    cpu: string;
    ip: string;
    name: string;
    pods: string;
    ram: string;
    role: string;
    state: string;


   initWithJsonStr(systemStatus: any) {
       console.log(systemStatus);
        if(systemStatus != null) {
            // var appObj = JSON.parse(jsonStr);
            this.ip = systemStatus.ip ? systemStatus.ip : '';
            this.name = systemStatus.name ? systemStatus.name : '';
            this.cpu = systemStatus.cpu ? systemStatus.cpu : '';
            this.name = systemStatus.name ? systemStatus.name :'';
            this.pods = systemStatus.pods ? systemStatus.pods : '';
            this.role = systemStatus.role ? systemStatus.role : '';
            this.state = systemStatus.state ? systemStatus.state : '';
            return this;
        }
        return  this;
    }
}