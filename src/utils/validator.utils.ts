export const userValidator = (text: string) => {
  if (text.length < 3) {
    return 'Минимум 3 символа';
  }

  if (text.length > 16) {
    return 'Максимум 16 символов';
  }

  return null;
};
