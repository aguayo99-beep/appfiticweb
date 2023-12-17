export class GymClassReservation {
    constructor(
        public _id: string,

      public userId: string,
      public gymClassId: string,
      public instructorId: string,
      public gymClassName: string,
      public userName : string,
       public instructorName : string,
       public gymClassDate : string
    ) {}
  }