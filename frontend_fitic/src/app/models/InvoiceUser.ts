export class InvoiceUser {
    constructor(
      public userId: string,
      public membership: 'Gold' | 'Silver' | 'Platinum',
      public state: string,
      public dateIssue: string,
      public membershipExpirationDate: Date,
      public price: number
    ) {}
  }
  