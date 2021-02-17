import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SampleDataDTO } from 'app/model/DataDTO.model';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  constructor(private readonly http: HttpClient) {}

  public getAllSampleData(): Observable<SampleDataDTO[]> {
    return this.http.get<SampleDataDTO[]>('/sampledata');
  }

  public save(data: SampleDataDTO) {
    return this.http.post<SampleDataDTO>('/sampledata', data);
  }

  public saveAll(data: SampleDataDTO[]) {
    return this.http.post<any>('/sampledata/saveAll', data);
  }

  public delete(data: number) {
    return this.http.delete<any>('/sampledata/' + data);
  }

  public deleteAll(data: number[]) {
    return this.http.post<any>('/sampledata/deleteAll', data);
  }

}
