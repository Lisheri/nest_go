import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  // 在DTO中直接使用, 会在文档中使用 Example Value 展示对应的name和age
  @ApiProperty({
    example: 'fucker',
  })
  public name: string;
  @ApiProperty({
    example: 10000,
  })
  public age: number;
}
