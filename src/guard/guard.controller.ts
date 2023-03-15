import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { ReqUrl, Role } from './role/role.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger'; // 接口文档描述

// controller使用守卫: 通过 UseGuards装饰器 引入守卫
@UseGuards(RoleGuard)
@Controller('guard')
// token 权限校验, 需要现在入口中对 swagger 文档进行配置
@ApiBearerAuth()
// 给 api文档分组
@ApiTags('守卫接口')
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @Role('admin')
  // 添加单个接口描述
  @ApiOperation({
    summary: 'get接口', // 标题上描述
    description: '不可描述', // 展开后的详细描述
  })
  // 使用和 apiParam 差不多
  @ApiQuery({
    name: 'page',
    description: '分页信息',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'role',
    description: '角色权限',
    required: true,
    type: 'string',
  })
  @ApiResponse({ status: 403, description: '小黑子暴露鸡头了' })
  findAll(@ReqUrl('111') url: string) {
    console.info(url);
    return this.guardService.findAll();
  }

  @Get(':id')
  // @Role('admin')
  // 用于描述动态参数
  @ApiParam({
    name: 'id',
    description: '唯一id',
    required: true,
    type: 'string',
  })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
