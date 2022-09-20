import * as bcrypt from 'bcrypt';

export function hashPassword(passwordString: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(passwordString, SALT);
}

export function comparePassword(passwordString: string, hash: string) {
  return bcrypt.compareSync(passwordString, hash);
}
