export class CreateClientDto {
    firstName: string;
    lastName: string;
    phone: number;
    address: {
      city: string;
      zone: string;
      street: string;
    };
  }