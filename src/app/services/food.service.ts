import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://canteen.benzyinfotech.com/api/v3/customer/report';

  constructor(private http: HttpClient) { }

  getMonthlydetails(month: number): Observable<any> {
    return this.http.post(this.apiUrl, { month });
  }
}
