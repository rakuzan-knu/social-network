import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemoryMonitorService } from './memory-monitor.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MemoryMonitorService],
  exports: [MemoryMonitorService],
})
export class MemoryModule {}
