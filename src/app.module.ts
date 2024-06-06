import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/config';
import { DbModule } from './db/db.module';
import { BrokenAccessControlModule } from './01_broken-access-control/broken-access-control.module';
import { CryptographicFailuresModule } from './02_cryptographic-failures/cryptographic-failures.module';
import { InjectionModule } from './03_injection/injection.module';
import { InsecureDesignModule } from './04_insecure-design/insecure-design.module';
import { SecurityMisconfigurationModule } from './05_security-misconfiguration/security-misconfiguration.module';
import { VulnerableAndOutdatedComponentsModule } from './06_vulnerable-and-outdated-components/vulnerable-and-outdated-components.module';
import { IdentificationAndAuthenticationFailuresModule } from './07_identification-and-authentication-failures/identification-and-authentication-failures.module';
import { SoftwareAndDataIntegrityFailuresModule } from './08_software-and-data-integrity-failures/software-and-data-integrity-failures.module';
import { SecurityLoggingAndMonitoringFailuresModule } from './09_security-logging-and-monitoring-failures/security-logging-and-monitoring-failures.module';
import { ServerSideRequestForgeryModule } from './10_server-side-request-forgery/server-side-request-forgery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [getConfig], isGlobal: true }),
    DbModule,
    BrokenAccessControlModule,
    CryptographicFailuresModule,
    InjectionModule,
    InsecureDesignModule,
    SecurityMisconfigurationModule,
    VulnerableAndOutdatedComponentsModule,
    IdentificationAndAuthenticationFailuresModule,
    SoftwareAndDataIntegrityFailuresModule,
    SecurityLoggingAndMonitoringFailuresModule,
    ServerSideRequestForgeryModule,
  ],
})
export class AppModule {}
