import { NestFactory } from '@nestjs/core';
import { path } from 'app-root-path';
import { AppModule } from './app.module';
// const ngrok = require('ngrok');

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: console
	});

	const port = 4200;
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: '*',
		// credentials: true,
		// methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		// preflightContinue: false,
		allowedHeaders: '*',
		// origin: 'http://localhost:3000',
		credentials: true
	});
	// app.get('/', function (req, res) {
	// 	res.sendFile('index.html');
	// });
	console.log(__filename);
	// console.log(path);
	await app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});
	// const url = await ngrok.connect(4200);
	// ! ngrok для получения внешнего подтверждения оплаты от yookassa
	//! полученный url необходимо ввести на странице https://yookassa.ru/my/merchant/integration/http-notifications
	// ! ответ на данный url подтвердит оплату заказа и изменит order.status
	// ! inspect ngrok http://127.0.0.1:4040
	//! exs: https://eede-94-181-56-112.ngrok.io/api/orders/status
	// console.log(url);
}
bootstrap();
