import { Controller, Post, UseInterceptors, UploadedFile, Get, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { zip } from 'compressing'; // 用于压缩并导出一个流
// import { zip } from 'compressing'; // 用于压缩并导出一个流
// import { createReadStream, statSync } from 'fs';
// import { Blob } from 'node:buffer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("album")
  // UseInterceptors 是一个处理文件的中间件, 同时需要一个字段名称
  // 这里的场景是单个文件, 因此使用 FileInterceptor, 如果是多个文件, 则需要使用 FilesInterceptor
  @UseInterceptors(FileInterceptor('file'))
  // 参数装饰器 UploadFile, 用于解析请求传递的file
  upload(@UploadedFile() file) {
    console.info(file);
    // 如果图片正确, 可以看到已经被存入 module中声明的 storage 中
    // 此时, 还访问不到, 需要配置访问资源路径
    return "死妈仔, 传错了";
  }

  @Get("export")
  download(@Res() res: Response) {
    // 普通下载
    const url = `${this.uploadService.getImgStaticUrl()}/1678533938092.jpg`;
    res.download(url);
  }

  @Get("stream")
  async down(@Res() res: Response) {
    // 流下载
    const url = `${this.uploadService.getImgStaticUrl()}/111111.dmg`;
    // const url = `${this.uploadService.getImgStaticUrl()}/1678533938092.jpeg`;
    // 新建压缩流
    const stream = new zip.Stream();
    await stream.addEntry(url);
    // const length = await this.uploadService.getLength(stream, url);
    // res.setHeader("x-content-size", 1000000);
    // 返回流的话需要设置响应头为stream
    res.setHeader("Content-type", "application/octet-stream");
    // Content-Disposition: attachment; 声明当前图片直接下载, 而不是预览
    res.setHeader("Content-Disposition", "attachment;filename=fucker");
    // 使用流的管道方法 pipe 返回, 但此时返回的只是一个二进制流文件, 是不能直接看的, 需要前端进行解析
    stream.pipe(res);
  }
}
