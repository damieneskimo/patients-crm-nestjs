import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "../auth.service";
import { JWT_SECRET } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    })
  }

  async validate(payload) {
    return {
      userId: payload.sub,
      email: payload.email
    };
  }
}