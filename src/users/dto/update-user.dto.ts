import {
  IsDateString,
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

class Fullname {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  lastName?: string;
}

export class UpdateUser {
  @IsOptional()
  @IsString()
  @Length(1, 15)
  username?: string;

  @IsOptional()
  @IsObject()
  fullname?: Fullname;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;
}
