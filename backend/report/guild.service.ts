import { HttpService, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { map, tap } from "rxjs/operators";
import { AppConfig } from "../app-config.interface";
import { GuildReportQueryParams } from "./report.dto";

@Injectable()
class GuildService {
  private readonly logger = new Logger(GuildService.name);

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly httpService: HttpService) {}

  getReports({ name, realm, region }: GuildReportQueryParams) {
    const start = new Date(Date.now() - (8 * 24 * 60 * 60 * 1000)).getTime();

    const info = `${name}/${realm}/${region}`;
    this.logger.verbose(`Fetching guild logs ${info}`);

    return this.httpService.get(`reports/guild/${info}`, {
      params: {
        api_key: this.configService.get('WCL_API_KEY'),
        start
      }
    }).pipe(map(({ data }) => data))
  }
}

export { GuildService };
