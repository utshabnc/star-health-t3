export interface Food {
    fdcId: number;
    description: string;
    dataType: string;
    publicationDate: string;
    brandOwner: string;
    gtinUpc: string;
    foodNutrients: FoodNutrient[];
    foodAttributes: any[];
    scientificName: string;
    footnote: string;
    ingredients: string;
    additionalDescriptions: string;
    foodCategory: string;
}

export interface FoodNutrient {
    number: string;
    name: string;
    amount: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
    nutrient: any;
    nutrientNumber: string;
    value: string;
}
