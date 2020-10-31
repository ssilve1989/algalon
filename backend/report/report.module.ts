import { CacheModule, HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ReportController } from "./report.controller";
import { FightService } from "./fight.service";
import { GuildService } from "./guild.service";
import { EventService } from "./events.service";

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule,
    HttpModule.register({
      baseURL: 'https://classic.warcraftlogs.com/v1'
    }),
  ],
  controllers: [ReportController],
  providers: [FightService, GuildService, EventService]
})
export class ReportModule {}
