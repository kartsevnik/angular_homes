import { Component, ViewEncapsulation, inject } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  filterText: string = '';
  
  housingService: HousingService = inject(HousingService)
  
  constructor(private route: Router) {
    this.housingLocationList = this.housingService.getAllHousingLocations()
    this.filteredLocationList = this.housingLocationList;
  }

  navToDetailPage(id: number) {
    this.route.navigate(["details", id]);
  }

  filterResults(text: string) {
    console.log("Filtering for:", text);
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
    console.log("Filtered List:", this.filteredLocationList);
  }
}
