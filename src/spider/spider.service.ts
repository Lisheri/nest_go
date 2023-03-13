import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { createWriteStream } from 'fs';
import { join } from 'path';

const nextText = '下一页';

// const targetUrl = 'https://www.xgmn02.com/Cosplay/Cosplay16527';
// const targetUrl = 'https://www.xgmn02.com/Cosplay/Cosplay10772';
// const targetUrl = 'https://www.xgmn02.com/Xgyw/Xgyw24583';
const targetUrl = 'https://www.xgmn02.com/Mtcos/Mtcos19109';

@Injectable()
export class SpiderService {
  async findAll(url = targetUrl) {
    const urls: string[] = []; // 存储图片
    const baseUrl = 'https://www.xgmn02.com';
    let curIdx = 1;
    const getCosplay = async () => {
      const curPageNum = curIdx === 1 ? '' : `_${curIdx - 1}`;
      // 获取html模板
      const body = await axios
        .get(`${url}${curPageNum}.html`)
        .then((res) => res.data);
      const $ = cheerio.load(body);
      const page = $('.pagination').eq(0).find('a');
      const pageArr = page
        .map(function () {
          return $(this).text();
          // ? 这里必须转换为数组, 否则是一个Jq对象
        })
        .toArray() as unknown as string;
      if (pageArr.includes(nextText) && curIdx !== pageArr.length - 1) {
        console.info(curIdx)
        // 说明还没有结束
        $('.article-content p img').each(function () {
          urls.push(baseUrl + $(this).attr('src'));
        });
        curIdx++;
        await getCosplay();
      }
    };
    await getCosplay();
    this.writeFile(urls);
    return urls;
  }

  // 下载图片
  writeFile(urls: string[]) {
    urls.forEach(async url => {
      const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data);
      const path = join(__dirname, '../cos' + new Date().getTime() + '.jpg');
      // 流下载
      const writeStream = createWriteStream(path);
      // 写入buffer
      writeStream.write(buffer);
    })
  }
}
