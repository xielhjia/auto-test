import { Injectable } from "@angular/core";
import { HttpClient, HttpParams  } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { environment  } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  })
}
/**
 * @description
 * @class
 */
@Injectable()
export class AppService {

  urlPrefix_k8s  = 'http://iotlab.live:35000/edm/kubernetes/';
  urlPrefix_knative = 'http://iotlab.live:35000/edm/knative/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ApplicationService');
  }

  // namespace service
  getNamespaces (): Observable<any> {
      return this.http.get<any>(environment.urlPrefix_k8s +"namespace" ).pipe(catchError(this.handleError('getNamespace', ''))
      );
  }

  // Application service
  getApplications (namespace: string): Observable<any> {
    return this.http.get<any>(environment.urlPrefix_knative +"apps/" + namespace ).pipe(catchError(this.handleError('getApplication', ''))
    );
  }

  addApplication(namespace: string, application: any): Observable<any> {

    return  this.http.post<any>(environment.urlPrefix_knative + "apps/" + namespace, application, httpOptions).pipe(
      catchError(this.handleError('addApplication', ''))
    );
    
  }

  updateApplication(application: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<any>(environment.urlPrefix_knative, application, httpOptions)
      .pipe(
        catchError(this.handleError('updateApplication', application))
      );
  }

  // Inference service 
  getInferences (namespace: string): Observable<any> {
    return this.http.get<any>(environment.urlPrefix_knative + "service/" + namespace).pipe(catchError(this.handleError('getInferences', ''))
    );
  }

  
  addInference(namespace: string, inference: any): Observable<any> {

    return  this.http.post<any>(environment.urlPrefix_knative + "service/" + namespace, inference, httpOptions).pipe(
      catchError(this.handleError('addInference', ''))
    );
    
  }

  updateInference(inference: any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<any>(environment.urlPrefix_knative, inference, httpOptions)
      .pipe(
        catchError(this.handleError('updateInference', inference))
      );
  }


  getSystemstatus (): Observable<any> {
    return this.http.get<any>(environment.urlPrefix_k8s +"status").pipe(catchError(this.handleError('getSystemstatus', ''))
    );
  }
  
  getGlobalConfig(): Observable<any> {
    return this.http.get<any>(environment.urlPrefix_knative + "registry").pipe(catchError(this.handleError('getGlobalConfig', '')))
  }

  updateGlobalConfig(configJsonStr: any): Observable<any> {
    return this.http.post<any>(environment.urlPrefix_knative + "registry", configJsonStr, httpOptions).pipe(catchError(this.handleError('postGlobalConfig', '')))
  }

}
