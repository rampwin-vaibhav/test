/**
 * @param  {string|number} numStr [Numeric/Numeric string/floatString] It always have decimalSeparator as .
 * @param  {number} decimalScale The value of decimal places. The default value is 0.
 * @return {string} formatted Value
 */
export default function formatNumber(
  numStr: number | string,
  decimalScale = 0,
  thousandsGroupStyle: 'lakh' | 'thousand' | 'wan' = 'thousand'
) {
  numStr = `${numStr}`;
  const fixedDecimalScale = true,
    prefix = undefined,
    suffix = undefined,
    allowNegative = true,
    thousandSeparator = ',',
    decimalSeparator = '.';

  const hasDecimalSeparator = decimalScale && fixedDecimalScale;
  let { beforeDecimal, afterDecimal, addNegation } = splitDecimal(
    numStr,
    allowNegative
  );

  if (decimalScale !== undefined) {
    afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
  }

  if (thousandSeparator) {
    beforeDecimal = applyThousandSeparator(
      beforeDecimal,
      thousandSeparator,
      thousandsGroupStyle
    );
  }

  //add prefix and suffix
  if (prefix) beforeDecimal = prefix + beforeDecimal;
  if (suffix) afterDecimal = afterDecimal + suffix;

  //restore negation sign
  if (addNegation) beforeDecimal = '-' + beforeDecimal;

  numStr =
    beforeDecimal +
    ((hasDecimalSeparator && decimalSeparator) || '') +
    afterDecimal;

  return numStr;
}

function applyThousandSeparator(
  str: string,
  thousandSeparator: string,
  thousandsGroupStyle: 'lakh' | 'thousand' | 'wan'
) {
  const thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  let index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str
      .substring(index, str.length)
      .replace(thousandsGroupRegex, '$1' + thousandSeparator)
  );
}

function getThousandsGroupRegex(
  thousandsGroupStyle: 'lakh' | 'thousand' | 'wan'
) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(
  numStr: string,
  scale: number,
  fixedDecimalScale: boolean
) {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

//spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr: string, allowNegative = true) {
  const hasNegation = numStr[0] === '-';
  const addNegation = hasNegation && allowNegative;
  numStr = numStr.replace('-', '');

  const parts = numStr.split('.');
  const beforeDecimal = parts[0];
  const afterDecimal = parts[1] || '';

  return {
    beforeDecimal,
    afterDecimal,
    hasNegation,
    addNegation,
  };
}
