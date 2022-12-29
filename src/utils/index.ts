import { Doctor, Manufacturer, Payment, Product } from '@prisma/client';
import _ from 'lodash';
const addAlpha = (color: string, opacity: number): string => {
  // coerce values so it is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

const colorGradient = (idx: number) =>
  addAlpha('#4F2FED', Math.max(1 - (1 + idx) * 0.08, 0.1));

const availableYears = [2021, 2020, 2019, 2018, 2017, 2016];

const formatMoney = (amount: number, decimals = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    maximumFractionDigits: decimals,
    currency: 'USD',
  });

  return formatter.format(amount);
};

const formatNumber = (amount: number, decimals = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
};

const formatLocation = (country: string, state: string | null) => {
  return state ? state + ", " + formatName(country) : formatName(country)
}

const drugTypes = [
  'antibiotic',
  'antidiabetic',
  'anti-inflammatory',
  'antineoplastic',
  'antiviral',
  'cancer',
  'corticosteroid',
  'enzyme',
  'hormone',
  'kinase inhibitor',
  'monoclonal antibody',
  'opioid',
  'other',
  'receptor antagonist',
];

const allStates = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const filterDuplicates = (arr: any[]) => {
  const finalArr = arr.filter((ele, index) => {
      return arr.indexOf(ele) === index
  })

  return finalArr
}

const filterDuplicateObjArr = (objArr: any[] | undefined, key: string) => {
  return [...new Map(objArr?.map(item => [item[key], item])).values()]
}

const getProductTotals = (obj: any) => {
  let sum = 0;
  obj.StateItem.forEach((stateItem: any) => {
    sum += stateItem.totalAmount
  })

  return sum
}



const getProductTransCount = (obj: any) => {
  let transactionSum = 0;
  obj.StateItem.forEach((stateItem: any) => {
    transactionSum += stateItem.transactionCount
  })

  return transactionSum

}

const formatName = (text: string) =>
  _.map(text.split(' '), _.capitalize).join(' ');

const formatProductType = (type?: string | null) =>
  type == null || type == 'null' || type == '' ? 'Other' : formatName(type);

const formatProductName = (name?: string | null) =>
  name == null || name == 'null' || name == ''
    ? 'Unknown Product'
    : formatName(name);

export {
  addAlpha,
  colorGradient,
  availableYears,
  formatMoney,
  formatNumber,
  formatName,
  formatLocation,
  formatProductType,
  formatProductName,
  drugTypes,
  allStates,
  filterDuplicates,
  filterDuplicateObjArr,
  getProductTotals,
  getProductTransCount
};
