export const PASSWORD_MIN_LENGTH = 10;
export const USERNAME_MAX_LENGTH = 10;
export const PHONE_MAX_LENGTH = 11;

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const EMAIL_REGEX = RegExp(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);
export const USERNAME_REGEX = RegExp(/^\d+기-[가-힣A-Za-z]+$/);

export const PASSWORD_REGEX_ERROR =
  '소문자, 대문자, 숫자, 특수문자를 포함해서 작성해주세요';
export const USERNAME_REGEX_ERROR =
  '기수-이름의 형식으로 입력해주세요 (예. 8기-김태윤)';
export const EMAIL_REGEX_ERROR = '올바르지 않은 이메일 형식 입니다';
export const USERNAME_MAX_LENGTH_ERROR =
  '유저이름은 길이가 10 이하이어야 합니다';
export const PASSWORD_MIN_LENGTH_ERROR = '비밀번호는 10자 이상이어야 합니다';
export const USERNAME_REQUIRED_ERROR = '유저이름은 필수입력란 입니다';
export const EMAIL_REQUIRED_ERROR = '이메일은 필수입력란 입니다';
export const PASSWORD_REQUIRED_ERROR = '비밀번호는 필수입력란 입니다';
export const PASSWORD_CONFIRM_REQUIRED_ERROR =
  '비밀번호확인은 필수입력란 입니다';
