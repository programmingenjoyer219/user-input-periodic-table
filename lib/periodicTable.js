let data = [];

await (async function getData() {
  data = await (await fetch('data.json')).json();
})();

export function getPeriodicTableElements(word) {
  const result = [];
  let index = 0;

  while (index < word.length) {
    const current = word[index];
    const next = word[index + 1];
    let element = findElement(current + next ?? '');

    if (element) {
      result.push(element);
      index += 2;
      continue;
    }

    element = findElement(current);

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
  return data.find((element) => element.symbol.toLowerCase() == symbol);
}
