import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Matches } from "class-validator";

/**
 * @description Represents a report request
 */
class ReportPathParams {
  @ApiProperty()
  @Matches(/^[a-zA-Z0-9]{16}$/)
  id: string;;
}

class ReportQueryParams {
  @ApiProperty()
  // class-transformer/validator has some weird issue with booleans so we use string for now
  @IsString()
  @IsOptional()
  refresh?: string;
}

// can add really strict validation on realm/region if you wanted to
class GuildReportQueryParams {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  realm: string;

  @ApiProperty()
  @IsString()
  region: string;
}

export { ReportPathParams, ReportQueryParams, GuildReportQueryParams };
