import { encode as b64_encode, decode as b64_decode } from 'base-64';

const encode = (str: string) => b64_encode(encodeURIComponent(str))
const decode = (str: string) => decodeURIComponent(b64_decode(str))

export { encode, decode }