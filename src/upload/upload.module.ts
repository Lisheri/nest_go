import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'; // 引入上传文件时使用的 MulterModule
import { diskStorage } from 'multer';
import { join, extname } from 'path';
@Module({
  // MulterModule有两个动态模块方法, 一个是同步的, 一个是异步的
  // 这里使用同步的即可
  imports: [MulterModule.register({
    // 图片存储位置, 这里使用 multer 中的 diskStorage 来开辟
    storage: diskStorage({
      // 声明存放位置
      destination: join(__dirname, "../images"),
      // 生成存放时的名字, 可以是字符串锁死, 也可以是一个函数
      filename: (_req, file, callback) => {
        // extname可以去后缀, originalname是原始名称, 包含后缀的
        const fileName = `${new Date().getTime()}${extname(file.originalname)}`;
        // 使用callback返回即可, callback接收两个参数, 第一个是error回调, 第二个是成功名称
        return callback(null, fileName);
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
