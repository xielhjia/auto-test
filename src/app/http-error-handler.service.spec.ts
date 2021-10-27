import { HttpErrorHandler } from "./http-error-handler.service";
import { TestBed } from "@angular/core/testing";

describe("HttpErrorHandlerService", () => {

  let service: HttpErrorHandler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpErrorHandler
      ]
    });
    service = TestBed.get(HttpErrorHandler);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
