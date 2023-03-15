import { PartialType } from '@nestjs/swagger';
import { CreateDbUserDto } from './create-db-tst.dto';

export class UpdateDbTstDto extends PartialType(CreateDbUserDto) {}
