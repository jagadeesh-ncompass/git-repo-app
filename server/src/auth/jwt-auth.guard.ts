import { AuthGuard } from "@nestjs/passport";

const { Injectable } = require("@nestjs/common");


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}