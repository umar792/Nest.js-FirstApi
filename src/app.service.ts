import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      success : true,
      message : "FirstApi Backend"
    }
  }
}
