import { Controller, Get, Injectable } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';

@Injectable()
export class EnvHealthIndicator {
  private readonly requiredVars = [
    'CLERK_SECRET_KEY',
    'CORS_ORIGINS',
  ];

  constructor(
    private readonly healthIndicatorService: HealthIndicatorService
  ) {}

  async isHealthy(): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicatorService.check('env');

    const missing = this.requiredVars.filter((key) => !process.env[key]);
    if (!process.env.DATABASE_URL && !process.env.DATABASE_URL_UNPOOLED) {
      missing.push('DATABASE_URL or DATABASE_URL_UNPOOLED');
    }

    if (missing.length === 0) {
      return indicator.up();
    }

    return indicator.down({
      missing,
      message: `Missing required environment variables: ${missing.join(', ')}`,
    });
  }
}

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly envHealth: EnvHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([() => this.envHealth.isHealthy()]);
  }
}
