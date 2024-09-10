import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

class Fullname {
  @IsOptional()
  @Length(2, 20)
  firstName?: string;

  @IsOptional()
  @Length(2, 20)
  lastName?: string;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  //isunique decorator must be added
  username: string;

  @IsOptional()
  @IsObject()
  fullname?: Fullname;

  @IsNotEmpty()
  @IsEmail()
  //isunique decorator must be added
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;
}
