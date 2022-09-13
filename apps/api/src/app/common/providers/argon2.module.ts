import { Module } from '@nestjs/common';
import * as argon2 from 'argon2';

@Module({
  providers: [{ provide: 'argon2', useValue: argon2 }],
  exports: ['argon2'],
})
export default class Argon2Module {}
export type Argon2 = typeof argon2;
