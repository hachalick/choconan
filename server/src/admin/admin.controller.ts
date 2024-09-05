import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin panel')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
