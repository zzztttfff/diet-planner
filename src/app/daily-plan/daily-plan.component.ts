import { Component, OnInit } from '@angular/core';
import macroData from '../../assets/json/db.json'
import { Form, FormBuilder, NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CalculatorService } from '../calculator.service';
import { WebScrapeService } from '../web-scrape.service';

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrls: ['./daily-plan.component.css']
})
export class DailyPlanComponent implements OnInit {

    dailyPlanArray = new Array;
    maxIndex: number = macroData.foods.length - 1;
    dailyPlanTotalMacros = [0,0,0,0];
    genders = ["Male", "Female"];
    activityLevels = ["BMR", "Sedentary", "Light", "Moderate", "Active", "Very Active", "Extra Active"];
    goals = ["Maintain Weight", "Mild Weight Loss", "Weight Loss", "Extreme Weight Loss", "Mild Weight Gain", "Weight Gain", "Extreme Weight Gain"]
    defaultAge = 30;
    defaultHeight = 73;
    defaultWeight = 193;
    //disableSelect = new FormControl(false);
    myForm: FormGroup;
    genderControl = new FormControl('');
    activityLevelControl = new FormControl('');
    goalControl = new FormControl('');
    ageControl = new FormControl('');
    heightControl = new FormControl('');
    weightControl = new FormControl('');
    goalMacros: Array<number> = []


    constructor(private fb: FormBuilder) { 
        this.genderControl = new FormControl('');
        this.activityLevelControl = new FormControl('');
        this.goalControl = new FormControl('');
        this.ageControl = new FormControl('');
        this.heightControl = new FormControl('');
        this.weightControl = new FormControl('');

        this.myForm = this.fb.group({
            genderControl: this.genderControl,
            activityLevelControl: this.activityLevelControl,
            goalControl: this.goalControl,
            ageControl: this.ageControl,
            heightControl: this.heightControl,
            weightControl: this.weightControl
        })
    }
    ngOnInit() {
        this.dailyPlanArray = new Array;
    }

    createDailyPlan() {
        let sumCalories = 0;
        let sumFat = 0;
        let sumCarbs = 0;
        let sumProtein = 0;

        let maxCalories = this.goalMacros[0];
        //let maxCalories95 = maxCalories * .95;
        let maxFat = this.goalMacros[3];
        let maxCarbs = this.goalMacros[2];
        let maxProtein = this.goalMacros[1];

        while (sumCalories < maxCalories) {
            console.log()
            let index = this.getRandInt(this.maxIndex)
            let food = macroData.foods[index]

            if (sumCalories + food.Calories <= maxCalories) {
                if (sumFat + food.Fat <= maxFat) {
                    if (sumCarbs + food.Carbs <= maxCarbs) {
                        if (sumProtein + food.Protein <= maxProtein) {
                            sumCalories += food.Calories;
                            sumFat += food.Fat;
                            sumCarbs += food.Carbs;
                            sumProtein += food.Protein;

                            this.dailyPlanArray.push(food)
                        }
                    }
                }
            }
            else break;
        } 
        console.log(this.dailyPlanArray)
        this.dailyPlanTotalMacros[0] = sumCalories;
        this.dailyPlanTotalMacros[1] = sumFat;
        this.dailyPlanTotalMacros[2] = sumCarbs;
        this.dailyPlanTotalMacros[3] = sumProtein;
    }

    getRandInt(maxIndex:number) {
        return Math.floor(Math.random() * (this.maxIndex)) 
    }

    reveal() {
        let hidden = document.getElementById("hiddenUntilClick")!;
        if (hidden.style.display = "none") {
            hidden.style.display = "block";
        }
    }

 /*    addToWeekly() {

    } */

    async calculateMacros(ageControl: FormControl, weightControl: FormControl, heightControl: FormControl, genderControl: FormControl, activityLevelControl: FormControl, goalControl: FormControl) {

        let calculator = new CalculatorService()
        let webscraper = new WebScrapeService()

        let url = calculator.calculate(ageControl, weightControl, heightControl, genderControl, activityLevelControl, goalControl)

        //this.openLink(url)

        this.goalMacros = await webscraper.scrape(url)

        this.createDailyPlan()

    }

    openLink(url: string) {
        //window.open(url, "_blank")
    }
    
}