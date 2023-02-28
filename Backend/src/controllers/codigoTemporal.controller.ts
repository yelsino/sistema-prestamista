import { AuthService } from "../services/auth.service";


export class CodigoTemporalController {

  auth: AuthService;

  constructor() {
    this.auth = new AuthService();
  }


  
}


