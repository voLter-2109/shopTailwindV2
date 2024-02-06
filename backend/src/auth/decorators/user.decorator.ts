import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		// console.log(data);
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		// console.log(user);
		return data ? user?.[data] : user;
	}
);
