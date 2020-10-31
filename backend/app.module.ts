import Joi from "@hapi/joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { ReportModule } from "./report/report.module";

@Module({
  imports: [
    // Third party Modules
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        WCL_API_KEY: Joi.string(),
        HTTP_PORT: Joi.number().default(8080)
      })
    }),
    // Our modules
    HealthModule,
    ReportModule,
  ]
})
export class AppModule { }
