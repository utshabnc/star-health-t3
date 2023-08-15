import { ajax } from "rxjs/ajax";

const CALORIENINJA_APIKEY = "eqN/IEjKazPTJFm+jUDzRQ==UelyF4RjxBImKrcf";

export function getNutritionByText(text: string) {
    return ajax({
      method: "GET",
      url: `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(text)}`,
      crossDomain: true,
      headers: { 'X-Api-Key': CALORIENINJA_APIKEY }
    });
  }
