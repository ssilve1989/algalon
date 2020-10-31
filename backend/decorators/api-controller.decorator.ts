import { Controller } from '@nestjs/common';

// Prefix the controller with `api` + whatever sub-section for the route if provided
export const ApiController = (prefix?: string) => Controller(prefix ? `api/${prefix}` : 'api');
