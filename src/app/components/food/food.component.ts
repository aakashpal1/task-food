import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  reportData: any;
  fine: any;
  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];
  selectMonth: number = new Date().getMonth() + 1;
  
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
   this.getFoodDetails(this.selectMonth)
  }

  changeMonth(event: Event) {
    const selectedValue = (event?.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.getFoodDetails(+selectedValue);
    }
  }
  getFoodDetails(month: number) {
  this.foodService.getMonthlydetails(month).subscribe((data) => {
    this.reportData = data;
    this.calcuFine();
  });
}

  calcuFine(): void {
    this.fine = 0;

    this.reportData?.reports?.forEach((report: any) => {
      Object.values(report?.opt_ins)?.forEach((status: any) => {
        if (status == 'Pending') {
          this.fine += 100;
        }
      });
    });
  }
  getStatus(status: string): string {
    return status?.toLowerCase() || '';
  }
}
