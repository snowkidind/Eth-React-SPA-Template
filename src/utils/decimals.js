import * as bigDecimal from "js-big-decimal"


// convert wei to display, without using floating point math.
export const weiToDisplay = (gwei, decimals) => {
  let acc = ''
  let g = String(gwei)
  if (typeof g === 'string' && g.length > 0) {
    if (g.length <= decimals) {
      g = g.padStart(decimals + 1, '0')
    }
    let index = g.length - decimals - 1
    for (let i = 0; i < g.length; i++) {
      acc += g[i]
      if (index === i) {
        if (g[i] !== '.') {
          acc += '.'
        }
      }
    }
    // remove trailing zeroes after decimal point
    let finished = false
    for (let i = acc.length - 1; i > 0; i--) {
      if (acc[i] === '.' && !finished) {
        acc = acc.slice(0, acc.length - 1)
        finished = true
      }
      if (acc[i] !== '0') {
        finished = true
      }
      if (!finished) {
        acc = acc.slice(0, acc.length - 1)
      }
    }
    return acc
  } else {
    return 'Error'
  }
}


// convert display to wei, without using floating point math.
export const displayToWei = (display, decimals) => {
  let d = JSON.parse(JSON.stringify(display));
  // index of decimal point
  let floats;
  if (typeof d === 'string' && d.length > 0) {
    for (let i = 0; i < d.length; i++) {
      if (d[i] === '.') {
        floats = (d.length - 1) - i
      }
    }
    // determine position of decimal point
    let offset;
    if (decimals < floats) { // chop off numbers that have more digits than decimals
      let diff = floats - decimals
      d = display.slice(0, display.length - diff)
      offset = 0
    }
    else if (floats) {
      offset = decimals - floats
    } else {
      offset = decimals
    }
    // pad the end with zeroes and remove decimal point
    let acc = d;
    for (let i = 0; i < offset; i++) {
      acc += '0'
    }
    acc = acc.replace('.', '')
    // remove leading zeroes
    let acc2 = ''
    let done = false;
    for (let i = 0; i < acc.length; i++) {
      if (acc[i] !== '0') done = true
      if (done) acc2 += acc[i]
    }
    // if nothing left, return zero
    if (acc2 === '') acc2 = '0'
    return acc2
  } else {
    return 'Error'
  }
}

// These require Big Decimal objects
export const gt = (a, b) => {
  if (typeof a !== 'object') return 'Error, expecting an object.'
  if (!a.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  if (typeof b !== 'object') return 'Error, expecting an object.'
  if (!b.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  const result = a.compareTo(b)
  if (result === 1) return true
  return false
}

export const lt = (a, b) => {
  if (typeof a !== 'object') return 'Error, expecting an object.'
  if (!a.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  if (typeof b !== 'object') return 'Error, expecting an object.'
  if (!b.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  const result = a.compareTo(b)
  if (result === -1) return true
  return false
}

export const equals = (a, b) => {
  if (typeof a !== 'object') return 'Error, expecting an object.'
  if (!a.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  if (typeof b !== 'object') return 'Error, expecting an object.'
  if (!b.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  const result = a.compareTo(b)
  if (result === 0) return true
  return false
}

export const abs = (a) => {
  if (typeof a !== 'object') return 'Error, expecting an object.'
  if (!a.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  if (a.compareTo(bigD('0')) === -1) {
    a = a.multiply(bigD('-1'))
  }
  return a
}

export const isPositive = (a) => {
  if (typeof a !== 'object') return 'Error, expecting an object.'
  if (!a.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  if (a.compareTo(bigD('0')) === -1) return false
  return true
}

export const numberWithCommas = function (x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

export const d = (amount, decimals, precision) => {
  if (precision) {
    return round(weiToDisplay(amount, decimals), precision)
  }
  return weiToDisplay(amount, decimals)
}

export const digits = (n) => {
  return Math.floor(Math.log(n) / Math.log(10))
}

export const isExponential = (num) => {
  const eParts = getExponentialParts(num)
  return !Number.isNaN(Number(eParts[1]))
}

export const getExponentialParts = (num) => {
  return Array.isArray(num) ? num : String(num).split(/[eE]/);
}

export const noExponents = (exponent) => {
  var data = String(exponent).split(/[eE]/)
  if (data.length === 1) return data[0]
  var z = '', sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1
  if (mag < 0) {
    z = sign + '0.'
    while (mag++) z += '0'
    return z + str.replace(/^-/, '')
  }
  mag -= str.length
  while (mag--) z += '0'
  return str + z
}

export const findPrecision = (array) => {
  let pHigh = 0
  let x
  let p
  for (let i = 0; i < array.length; i++) {
    x = noExponents(parseFloat(array[i]))
    const y = String(x).split(".")
    p = 0;
    if (y.length > 1) {
      p = y[1].length
    } else {
      p = 0;
    }
    if (p > pHigh) {
      pHigh = p
    }
  }
  return pHigh
}

export const formatFloatAsNumber = (value) => {
  let error;
  let precision;
  let num;
  if (typeof (value) === 'undefined') error = 'error: undefined object';
  try {
    num = Number(value);
    precision = findPrecision([num]);
    if (isNaN(parseFloat(num))) {
      error = 'parseDecimal - could not format input'
    }
  } catch (e) {
    error = 'parseDecimal - could not format input - ' + e;
  }
  return { value: num, precision: precision, error: error }
}

export const formatFloatForDisplay = (value) => {
  let error;
  let precision;
  let num;
  if (typeof (value) === 'undefined') error = 'error: undefined object';
  try {
    num = Number(value);
    precision = findPrecision([num]);
    num = noExponents(num);
  } catch (e) {
    error = 'could not format input - ' + e;
  }
  return { value: num, precision: precision, error: error }
}


export const bigDfromWei = (value, precision) => {
  let raw
  if (typeof value !== 'string') {
    raw = value.toString()
  } else {
    raw = value
  }
  return new bigDecimal(weiToDisplay(raw, precision))
}

export const bigD = (value) => {
  let raw
  if (typeof value !== 'string') {
    raw = value.toString()
  } else {
    raw = value
  }
  return new bigDecimal(raw)
}

export const roundBigD = (bigD, precision) => {
  if (typeof bigD !== 'object') return 'Error, expecting an object.'
  if (!bigD.hasOwnProperty('value')) return 'Error, object suplied is incompatible.'
  return bigD.round(precision, bigDecimal.RoundingModes.FLOOR)
}

export const round = (_value, decimals) => {
  let value = _value
  if (typeof value !== 'string') {
    value = String(_value)
  }
  const d = bigD(value)
  return d.round(decimals, bigDecimal.RoundingModes.FLOOR).getValue()
}

export const divideWithFloor = (dividend, divisor, precision) => {
  let divd
  if (typeof dividend === 'string') {
    divd = dividend
  } else if (typeof dividend === 'object') {
    if (dividend.hasOwnProperty('value')) {
      // a big decimal was supplied.
      divd = dividend.getValue()
    }
  } else if (typeof dividend === 'number') {
    divd = String(dividend)
  }
  let divs
  if (typeof divisor === 'string') {
    divs = divisor
  } else if (typeof divisor === 'object') {
    if (divisor.hasOwnProperty('value')) {
      // a big decimal was supplied.
      divs = divisor.getValue()
    }
  } else if (typeof divisor === 'number') {
    divs = String(divisor)
  }
  const unfettered = new bigDecimal.divide(divd, divs, 18)
  return roundBigD(bigDecimal(unfettered), precision)
}