import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return_user.object';
import { Prisma } from '@prisma/client';
import { UserDto } from './user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		// console.log(id);
		// console.log(selectObject);

		const user = await this.prisma.user.findUnique({
			where: { id: id },

			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						image: true,
						slug: true,
						category: {
							select: {
								slug: true
							}
						},
						reviews: true,
					}
				},
				...selectObject
			}
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}


	async updateProfile(id: number, dto: UserDto) {
		// console.log(dto);
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		});

		if (isSameUser && id !== isSameUser.id) {
			throw new BadRequestException('Email bezier');
		}

		const user = await this.byId(id);

		return this.prisma.user.update({
			where: {
				id: id
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password
			}
		});
	}

	async toggleFavorite(id: number, productId: number) {
		// console.log("toggle favorite")
		const user = await this.byId(id);

		if (!user) {
			throw new Error('User not found');
		}

		const isExists = user.favorites.some(prodcut => prodcut.id === productId);

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		});

		return 'Success';
	}
}
