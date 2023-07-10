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

const delay = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const capitalizeWords = (str: string) => {
  let capitalizedWord = "";

  if (!str) return capitalizedWord;

  str.split(" ").forEach((word: string) => {
    // The word OTC should always be uppercase
    if (word.toUpperCase() == "OTC") {
      capitalizedWord += "OTC "
    } else {
      capitalizedWord += word.charAt(0).toUpperCase()
        + word.slice(1, word.length).toLowerCase()
        + " ";
    }
  });

  return capitalizedWord.trim();
};

const formatDate = (date: string, type: string | null) => {
  date = date.replace(/[^0-9 ]/g, '');
  date = date.substring(0, 8)
  date = `${date.substring(0, 4)}/${date.substring(4, 6)}/${date.substring(6, 8)}`
  if (type === '/') {
    return date
  } else if (type === '-') {
    date = date.replaceAll('/', '-')
    return date
  }
  return date
  
}

const formatNumber = (amount: number, decimals = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  });

  return formatter.format(amount);
};

const formatLocation = (country: string, state: string | null) => {
  return state ? state + ", " + formatName(country) : formatName(country)
}

const formatFullAddress = (addressLine1: string | null | undefined, addressLine2: string | null | undefined, city: string | null | undefined, state: string | null | undefined, zip: string | null | undefined) => {
  const handleSuite = addressLine2 !== null || '' ? addressLine2 : ''
  return `${addressLine1} ${handleSuite} ${city} ${state} ${zip}`
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

// eslint-disable-next-line no-extend-native
const toTitleCase = (input : string) => {
  const lowerCaseWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
  const toUpperCaseWords = /^(llc|inc|lp)$/i
  const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/
  const wordSeparators = /([ :–—-])/

  return input.split(wordSeparators)
    .map(function (current : string, index : number, array : string[]) {
      if (
        /* Check for small words */
        current.search(lowerCaseWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ':' &&
        array[index + 1] !== ':' &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== '-' ||
          (array[index - 1] === '-' && array[index + 1] === '-'))
      ) {
        return current.toLowerCase()
      }

      if (current.search(toUpperCaseWords) > -1) {
        return current.toUpperCase()
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current
      }

      /* Ignore URLs */
      if (array[index + 1] === ':' && array[index + 2] !== '') {
        return current
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase()
      })
    })
    .join('')
}

export {
  addAlpha,
  colorGradient,
  availableYears,
  capitalizeWords,
  formatFullAddress,
  formatMoney,
  formatNumber,
  formatName,
  formatLocation,
  delay,
  formatProductType,
  formatProductName,
  drugTypes,
  allStates,
  filterDuplicates,
  filterDuplicateObjArr,
  getProductTotals,
  getProductTransCount,
  formatDate,
  toTitleCase
};
