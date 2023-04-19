import { userValidator } from './validator.utils';

describe('Валидаторы', () => {
  test('Валидация имени пользователя', () => {
    expect(userValidator('Username')).toBeNull();
    expect(userValidator('User')).toBeNull();
    expect(userValidator('UserUserUserUser')).toBeNull();
    expect(userValidator('Us')).toBe('Минимум 3 символа');
    expect(userValidator('UserUserUserUser1')).toBe('Максимум 16 символов');
  });
});
