import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { DbTstService, IFindAll, IAddTags } from './db-tst.service';
import { CreateDbUserDto } from './dto/create-db-tst.dto';
import { UpdateDbTstDto } from './dto/update-db-tst.dto';

@ApiTags('db.user')
@Controller({
  path: 'db.user',
  version: '1',
})
export class DbTstController {
  constructor(private readonly dbTstService: DbTstService) {}

  // 创建
  @Post()
  @ApiBody({
    schema: {
      type: '{name: string; desc: string;}',
      title: '创建新用户',
      default: {
        name: '老六',
        desc: '最持久的男人',
      },
      description: '创建新用户',
      required: ['name', 'desc'],
    },
    examples: {
      name: {
        summary: '创建新用户',
        description: '创建新用户必传参数',
        value: '{name: 老六; desc: 最持久的男人}',
      },
    },
  })
  async create(@Body() createDbUserDto: CreateDbUserDto) {
    return await this.dbTstService.create(createDbUserDto);
  }

  // 查询全部
  @Get()
  @ApiOperation({
    summary: '查询所有用户数据', // 标题上描述
    description: '返回全部用户数据', // 展开后的详细描述
  })
  @ApiQuery({
    name: 'keyWord',
    description: '关键字查询',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'pageIndex',
    description: '分页序号',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'pageSize',
    description: '分页条数',
    required: false,
    type: 'string',
  })
  async findAll(@Query() query: IFindAll) {
    const data = await this.dbTstService.findAll(query);
    console.info(data);
    return {
      data,
      code: 0,
      message: 'ok',
      success: true,
    };
  }

  // 查询单个数据
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dbTstService.findOne(+id);
  }

  // 更新
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDbTstDto: UpdateDbTstDto,
  ) {
    return await this.dbTstService.update(+id, updateDbTstDto);
  }

  // 删除
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dbTstService.remove(+id);
  }

  @Post('/add/tags')
  addTags(@Body() params: IAddTags) {
    return this.dbTstService.addTags(params);
  }
}
