export interface FoodData {
  description: string;
  fdcID: number;
  foodNutrients: FoodNutrient[];
  brandOwner: string;
  publicationDate: string;
  foodCategory: any;
  foodAttributes: any;
  scientificName: string;
  footnote: string;
  ingredients: string;
  additionalDescriptions: string;
}

export interface FoodNutrient {
    name: string;
    amount: number;
    unitName: string;
    number: number;
    nutrient: any;
    foodNutrientDerivation: any;
    id: number;
}
