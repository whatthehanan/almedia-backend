import { IsString, IsUrl, IsBoolean } from 'class-validator';

export class OfferDTO {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  isDesktop: boolean;

  @IsBoolean()
  isAndroid: boolean;

  @IsBoolean()
  isIos: boolean;

  @IsUrl()
  offerUrlTemplate: string;

  @IsString()
  providerName: string;

  @IsString()
  externalOfferId: string;
}
