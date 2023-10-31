export const isLastCharKoreanConsonantOrVowel = (text: string) => {
  const koreanConsonantRange = /[\u3131-\u314E]/;
  const koreanVowelRange = /[\u314F-\u3163]/;

  const lastChar = text.charAt(text.length - 1);

  if (koreanConsonantRange.test(lastChar) || koreanVowelRange.test(lastChar)) {
    return true;
  } else {
    return false;
  }
};
