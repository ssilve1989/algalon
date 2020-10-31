import { Controller, Get } from "@nestjs/common";

@Controller('health')
export class HealthController {
  // TODO: Add redis, etc health checks
  @Get()
  healthCheck() {
    return 'ok';
  }
}
