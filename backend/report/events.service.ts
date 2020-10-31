import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
class EventService {
  constructor(
    private readonly configService: ConfigService, 
    private readonly httpService: HttpService
  ) { }

  getEvents() {
    // TODO: Weeeee
  }
}


export { EventService };
