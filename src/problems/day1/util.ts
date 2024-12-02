export const parseList = (input: string) =>
  input
    .split(/\s+/)
    .map(Number)
    .reduce<[number[], number[]]>(
      ([arr1, arr2], num, index) => {
        if (index % 2 === 0) {
          arr1.push(num);
        } else {
          arr2.push(num);
        }
        return [arr1, arr2];
      },
      [[], []],
    );
