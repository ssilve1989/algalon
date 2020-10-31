import { HttpException, HttpService, Injectable } from "@nestjs/common";
import { catchError, map, mapTo, mergeMap, reduce, tap } from 'rxjs/operators';
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "../app-config.interface";
import { of, throwError, zip } from "rxjs";
import { Friendly, Raid, ReportResponse } from "./report.interfaces";
import { AxiosError } from "axios";


@Injectable()
class FightService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly httpService: HttpService) { }

  getReport(id: string) {
    return this.httpService.get<ReportResponse>(`report/fights/${id}`, {
      params: {
        api_key: this.configService.get('WCL_API_KEY')
      }
    }).pipe(
      // check for the error response
      catchError(({ message, response }: AxiosError) => {
        const code = response?.data.status || 500;
        return throwError(new HttpException(message, code));
      }),
      // extract the response
      map(({ data }) => data),
      // split the response into emissions without the friendlies, and with the friendlies mapped to ids
      mergeMap(({ friendlies, ...report }) => zip(of(report), of(friendlies.reduce(this.toRaid, {})))),
      // join the split emissions back up into a single object
      map(([report, raid]) => ({ ...report, raid })),
      tap(() => {
        // TODO: Not sure what was happening with wclReport.refresh = true? Didn't see it used anywhere else but that can go here
      }),
    )
  }

  private toRaid(raid: Raid, friendly: Friendly) {
    raid[friendly.id] = friendly;
    return raid;
  }
}

export { FightService };
