import { Get, Param, Query, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiController } from "../decorators/api-controller.decorator";
import { GuildReportQueryParams, ReportPathParams, ReportQueryParams } from "./report.dto";
import { FightService } from "./fight.service";
import { ReportCacheInterceptor } from "./interceptors/cache.interceptor";
import { GuildService } from "./guild.service";

@ApiController()
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ReportCacheInterceptor)
export class ReportController {
  constructor(
    private readonly fights: FightService,
    private readonly guild: GuildService,
  ) {}

  @Get('report/:id')
  getReport(@Param() params: ReportPathParams, @Query() query: ReportQueryParams) {
    return this.fights.getReport(params.id);
  }

  @Get('reports')
  getGuildReports(@Query() query: GuildReportQueryParams) {
    return this.guild.getReports(query);
  }
}
