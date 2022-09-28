import { Type } from 'class-transformer';
import { MaxLength, IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @IsInt()
  @Min(1)
  @Type(() => Number) // string で渡ってくるものを number にする
  price: number;

  @IsString()
  @IsNotEmpty()
  describe: string;
}
