import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { zip } from 'compressing'; // 用于压缩并导出一个流
import { Blob } from 'node:buffer';
import { Stream } from 'node:stream';

@Injectable()
export class UploadService {
  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  getImgStaticUrl() {
    return join(__dirname, '../images');
  }

  getLength(stream: zip.Stream, url: string): Promise<number> {
    return new Promise(async (resolve) => {
      // 添加流入口路径, 该操作是异步的
      await stream.addEntry(url);
      let data = '';
      stream.on('data', function (chunk) {
        data += chunk;
      });
      let length = 0;
      stream.on('end', function () {
        length = new Blob([data]).size;
        console.info(length)
        resolve(length)
      });
    });
  }
}
