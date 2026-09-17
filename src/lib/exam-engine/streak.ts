/** Longest run of consecutive correct answers (by question order) in one attempt. */
export function computeLongestCorrectStreak(orderedIsCorrect: boolean[]): number {
  let longest = 0;
  let current = 0;
  for (const isCorrect of orderedIsCorrect) {
    current = isCorrect ? current + 1 : 0;
    if (current > longest) longest = current;
  }
  return longest;
}
