export { getPeriodicTableElements };

var data = [];
var symbolElementMap = {};

await (async function getData() {
  data = await (await fetch('data.json')).json();
  prepareElementSymbolMap(data);
})();

function prepareElementSymbolMap(data) {
  for (let element of data) {
    symbolElementMap[element.symbol.toLowerCase()] = element;
  }
}

function getPeriodicTableElements(word) {
  var elementSymbols = getElementSymbols(word);

  if (elementSymbols.length > 0) {
    return elementSymbols.map(findElement);
  } else {
    return [];
  }
}

function getElementSymbols(word) {
  if (word.length == 0) {
    return [];
  } else {
    // consider first two characters.
    if (word.length >= 2) {
      let two = word.slice(0, 2);
      let rest = word.slice(2);
      // is 'two' a valid periodic table element?
      if (two in symbolElementMap) {
        if (rest.length > 0) {
          let result = [two, ...getElementSymbols(rest)];
          // does combining element symbols in 'result' form 'word'?
          if (result.join('') == word) {
            return result;
          }
        } else {
          return [two];
        }
      }
    }
    // consider first character, if first two characters couldn't form a valid element symbol.
    if (word.length >= 1) {
      let first = word[0];
      let rest = word.slice(1);
      // is 'first' a valid periodic table element?
      if (first in symbolElementMap) {
        if (rest.length > 0) {
          let result = [first, ...getElementSymbols(rest)];
          // does combining element symbols in 'result' form 'word'?
          if (result.join('') == word) {
            return result;
          }
        } else {
          return [first];
        }
      }
    }

    return [];
  }
}

function findElement(symbol) {
  return symbolElementMap[symbol];
}
