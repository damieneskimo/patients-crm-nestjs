import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Without_Global_Guard_Key } from '../../without-global-guard.decorator';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const withoutGlobalGuard = this.reflector.getAllAndOverride<boolean>(
      Without_Global_Guard_Key,
      [
        context.getHandler(),
        context.getClass()
      ]
    );

    if (withoutGlobalGuard) {
      return true;
    }
    return super.canActivate(context);
  }
}
