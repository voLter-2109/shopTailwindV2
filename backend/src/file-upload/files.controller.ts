import {
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Res,
	UploadedFile,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './fileUpload';

// В filesController есть 3 метода, первый метод uploadedFile() с
// декоратором @Post() предназначен для загрузки одного изображения
// за раз. FileInterceptor() принимает 2 параметра, первый — это ключ
// запроса (полезная нагрузка), который содержит данные изображения,
// второй — объект, который содержит такие параметры, как путь к каталогу
// для сохранения мультимедийного изображения, fileFilter и т. Здесь
// каталог хранения uploads находится в корне папки проекта.

// Второй метод uploadMultipleFiles() может загружать более одного файла
// за раз, а FilesInterceptor() принимает 3 параметра: первый ключ payload,
// который содержит данные изображения, второй параметр для максимального
// количества файлов, разрешенных для загрузки за раз, и третий и последний —
// это объект, который содержит такие параметры, как путь к каталогу для
// сохранения изображения мультимедиа, фильтр файлов и т. д. Здесь снова
// каталог для хранения uploads находится в корне папки проекта.

// Третий метод getImage() используется для получения
// сохраненного изображения, передавая имя изображения в URL-адресе.
@Controller('files')
export class FilesController {
	constructor() {}
	// upload single file

    
	@Post()
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './uploads',
				filename: editFileName
			}),
			fileFilter: imageFileFilter
		})
	)
	
	async uploadedFile(@UploadedFile() file) {
		console.log('Uploaded file');
		console.log(file);

		if (!file) {
			throw new NotFoundException(`No file to upload`);
			// return { message: 'no file' };
		}
		const response = {
			originalname: file.originalname,
			filename: file.filename
		};
		return {
			status: HttpStatus.OK,
			message: 'Image uploaded successfully!',
			data: response
		};
	}


	@Post('uploadMultipleFiles')
	@UseInterceptors(
		FilesInterceptor('image', 10, {
			storage: diskStorage({
				destination: './uploads',
				filename: editFileName
			}),
			fileFilter: imageFileFilter
		})
	)
	async uploadMultipleFiles(@UploadedFiles() files) {
		const response = [];
		files.forEach(file => {
			const fileReponse = {
				originalname: file.originalname,
				filename: file.filename
			};
			response.push(fileReponse);
		});
		return {
			status: HttpStatus.OK,
			message: 'Images uploaded successfully!',
			data: response
		};
	}


	@Get(':imagename')
	getImage(@Param('imagename') image, @Res() res) {
		const response = res.sendFile(image, { root: './uploads' });
		return {
			status: HttpStatus.OK,
			data: response
		};
	}
}
