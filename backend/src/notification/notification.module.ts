/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsService } from '../notification/notification.service';
import { NotificationsController } from './notification.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        logger: false,
        debug: false,
        verify: false,
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: Number(config.get<string>('EMAIL_PORT')) || 587,
          secure: config.get<string>('EMAIL_SECURE') === 'true',
          auth: {
            user: config.get<string>('EMAIL_USER'),
            pass: config.get<string>('EMAIL_PASS'),
          },
          tls: {
            minVersion: 'TLSv1.2',
            ciphers:
              'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
          },
        },
        defaults: {
          from:
            config.get<string>('EMAIL_FROM') ||
            `"CarRental" <noreply@carrentalapp.com>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
