import { CACHE_MANAGER, CallHandler, ExecutionContext, Inject, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Cache, CachingConfig } from 'cache-manager';
import { from, iif, Observable, of } from "rxjs";
import { mapTo, mergeMap, tap } from "rxjs/operators";

@Injectable()
class ReportCacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ReportCacheInterceptor.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const params = (request.params || {}) as Record<string, any>;
    const query = (request.query || {}) as Record<string, any>;
    const refresh = query.refresh === 'true';

    // TODO: Improve how cache configs are provided
    const cacheConfig = { ttl: 60000 };
    // if refresh was set, compute it as new, and store it in the cache
    if (refresh) return next.handle().pipe(this.updateCache(params.id, cacheConfig));

    // Check the cache for an entry on this id
    return from(this.cache.get(params.id)).pipe(
      mergeMap(cached => 
        iif(
          // if there is one
          () => Boolean(cached), 
          // return that
          of(cached).pipe(tap(() => this.logger.log(`returning cached response for ${params.id}`))), 
          // otherwise defer to the handler and update the cache with the response
          next.handle().pipe(this.updateCache(params.id, cacheConfig))
        )
      )
    )
  }

  private updateCache(id: string, options: CachingConfig) {
    return (source$: Observable<any>): Observable<any> => source$.pipe(
      mergeMap((response) => from(this.cache.set(id, response, options)).pipe(mapTo(response)))
    )
  }
}

export { ReportCacheInterceptor };
