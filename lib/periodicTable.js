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

export function getPeriodicTableElements(word) {
  const result = [];
  let index = 0;

  while (index < word.length) {
    const current = word[index];
    const next = word[index + 1] ?? '';
    let element = findElement((current + next).toLowerCase());

    if (element) {
      result.push(element);
      index += 2;
      continue;
    }

    element = findElement(current.toLowerCase());

    if (element) {
      result.push(element);
      index += 1;
      continue;
    }

    return [];
  }

  return result;
}

function findElement(symbol) {
  return symbolElementMap[symbol];
}
