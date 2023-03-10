import { Component, OnInit } from '@angular/core';
import macroData from '../../assets/json/db.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    macros = macroData;

    constructor() {
    
    }

    ngOnInit(): void {
    }

    //sortByCals[] = this.macros.map(Calories.sort());

    //console.log(this.macros.sort((a,b) => this.macros[a.Calories] - this.macros[b.Calories]);

    //CREATE ARRAYS OF NAME+EACH MACRO TO ENABLE SORTING BY CHOSEN MACRO
    arrayCalories = this.macros.foods.map(item => {
        return [item.id, item.Calories]
    });

    //arraySortedByCalories = this.arrayCalories.sort((a,b) => a.Calories - b[1]);
}
