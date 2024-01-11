import { faker } from '@faker-js/faker';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private userService: UserService
	) {}

	async login(dto: AuthDto) {
		// console.log(dto);
		const user = await this.validateUser(dto);
		// console.log(dto);
		console.log('login service back ' + dto);
		const tokens = await this.issueTokens(user.id);
		console.log('login service back ' +tokens);
		return {
			user: this.returnUserFields(user),
			...tokens
		};
	}

	async getNewTokens(refreshToken: string) {
		// console.log(refreshToken); 
		console.log('refrehtoken-back  ' + refreshToken);
		const result = await this.jwt.verify(refreshToken);
		console.log(result);
		if (!result) throw new UnauthorizedException('Invalid refresh token');

		const user = await this.userService.byId(result.id, {
			isAdmin: true
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		};
	}

	async register(dto: AuthDto) {
		// console.log('register-service ' + dto);
		const oldUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});
		if (oldUser) {
			throw new BadRequestException('User already exists');
		}

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.internet.userName(),
				phone: faker.phone.number('+7 (###) ###-##-##'),
				password: await hash(dto.password)
			}
		});
		// console.log('user ' + user);

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens
		};
	}

	private async issueTokens(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: '24h'
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '30d'
		});
		// console.log('sing new token backend ' + accessToken);

		return { accessToken, refreshToken };
	}

	// Partial<User>
	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin
		};
	}

	private async validateUser(dto: AuthDto) {
		console.log(dto.email);
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const isValid = await verify(user.password, dto.password);

		if (!isValid) {
			throw new UnauthorizedException('Invalid password');
		}
		return user;
	}
}
