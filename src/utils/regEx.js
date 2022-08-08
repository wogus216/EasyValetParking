// 한글영어
export const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
// 최소 문자,숫자,특수문자 1자리씩 이고 8자리이상
export const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
// 숫자만
export const numberReg = /^[0-9]+$/;
// 대문자만
export const capitalReg = /^[A-Z]+$/;
