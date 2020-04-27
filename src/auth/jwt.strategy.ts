import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //attach the data user data to request header
  public async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
