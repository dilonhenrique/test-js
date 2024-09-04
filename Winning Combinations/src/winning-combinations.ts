type WinningCombination = [number, number[]];
type WinningCombinationsResult = WinningCombination[];

const WILD = 0;
const PAYING_SYMBOLS = [WILD, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const NON_PAYING_SYMBOLS = [10, 11, 12, 13, 14, 15];

function call(lines: number[]): WinningCombinationsResult {
  const winningCombinations: WinningCombinationsResult = [];

  let lineSequence: number[] = [];
  let currentChecking: number | null = null;

  function checkSequence(sequence: number[]) {
    if (currentChecking !== null && sequence.length >= 3) {
      winningCombinations.push([currentChecking, sequence]);
    }
  }

  function startLineSequence(sequence: number[], line: number) {
    lineSequence = sequence;
    currentChecking = isNonPayingSymbol(line) ? null : line;
  }

  for (let i = 0; i < lines.length; i++) {
    const symbol = lines[i];

    if (isPayingSymbol(symbol)) {
      if (isSameSymbol(symbol, currentChecking)) {
        lineSequence.push(i);
        if (currentChecking === WILD) currentChecking = symbol;
        continue;
      }

      const lastWildsIndexes = getLastWildsIndexes(lines, i);
      if (lastWildsIndexes.length > 0) {
        checkSequence(lineSequence);
        startLineSequence([...lastWildsIndexes, i], symbol);
        continue;
      }
    }

    checkSequence(lineSequence);
    startLineSequence([i], symbol);
  }

  checkSequence(lineSequence);

  return winningCombinations;
}

function isPayingSymbol(symbol: number) {
  return PAYING_SYMBOLS.includes(symbol);
}

function isNonPayingSymbol(symbol: number) {
  return NON_PAYING_SYMBOLS.includes(symbol);
}

function isSameSymbol(symA: number, symB: number | null) {
  if (symB === null) return false;
  return symA === symB || symA === WILD || symB === WILD;
}

function getLastWildsIndexes(lines: number[], index: number) {
  const indexes: number[] = [];
  for (let i = index - 1; i > -1; i--) {
    if (lines[i] !== WILD) break;
    indexes.push(i);
  }

  return indexes.reverse();
}

export const WinningCombinations = { call };
