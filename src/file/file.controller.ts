import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          console.log({ file });

          const name = file.originalname;
          cb(null, name);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'success',
    };
  }

  @Get(':filename')
  async fetFile(@Param('filename') filename: string, @Res() res: Response) {
    fs.access(`./files/${filename}`, fs.constants.F_OK, (err) => {
      if (err) {
        return res.sendStatus(404);
      }
      return res.sendFile(filename, { root: './files' });
    });
    return;
  }
}
