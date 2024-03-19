import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

import { PrismaClient, Product } from '@prisma/client';
import { generateSlug } from './generate-slug';
import { getAverage } from './get-average';
import { getRandomNumber } from './random-number';
//Использование пакета dotenv для чтения переменных из файла .env в Node

//! запуск отдельного файла вне сбоки nest 1. пишем в packpage.json команду
//! "seed": "ts-node seeder/seed.ts"
dotenv.config();

const prisma = new PrismaClient();

const createProducts = async (quantity: number) => {
	const products: Product[] = [];

	for (let i = 21; i < quantity; i++) {
		const productName = faker.commerce.productName();
		const categoryName = faker.commerce.department();
		console.log(productName);
		console.log(categoryName);
		const reviews = [];
		const reviewsRatings = [];

		for (let j = 0; j < getRandomNumber(1, 10); j++) {
			let rating = getRandomNumber(3, 5);
			reviewsRatings.push(rating);

			reviews.push({
				rating: rating,
				text: faker.lorem.paragraph(),
				user: {
					connect: {
						id: getRandomNumber(1, 2)
					}
				}
			});
		}

		try {
			const product = await prisma.product.create({
				data: {
					name: productName,
					slug: generateSlug(productName),
					description: faker.commerce.productDescription(),
					price: +faker.commerce.price({ min: 10, max: 999, dec: 0 }),
					averageReviews: getAverage(reviewsRatings),
					user: {
						connect: {
							id: getRandomNumber(2, 3)
						}
					},
					image: Array.from({
						length: getRandomNumber(2, 7)
					}).map(() =>
						faker.image.urlLoremFlickr({
							width: 500,
							height: 500,
						})
					),

					category: {
						connectOrCreate: {
							where: {
								name: categoryName
							},
							create: {
								name: categoryName,
								slug: generateSlug(categoryName)
							}
						}

						// create: {
						// 	// where:{name: categoryName},
						// 	// update: {},
						// 	// create:{},
						// 	name: categoryName,
						// 	slug: generateSlug(categoryName)
						// }
					},
					reviews: {
						create: reviews
					}
				}
			});

			products.push(product);
			// if (product) {
			// 	await prisma.category.upsert({
			// 		where: {
			// 			name: categoryName
			// 		},
			// 		create: {
			// 			name: categoryName,
			// 			slug: generateSlug(categoryName)
			// 		},
			// 		update: {}
			// 	});
			// }
			console.log(product);
		} catch (error) {
			console.log(error.message);
		}
	}

	console.log(`created ${products.length} products`);
};

async function main() {
	console.log('starting...');

	await createProducts(50);

	console.log('end...');
}

main()
	.catch(e => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
