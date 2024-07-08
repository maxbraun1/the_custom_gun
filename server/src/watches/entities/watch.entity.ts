import { watches } from '@prisma/client';

export class Watch implements watches {
  id: string;
  date: Date;
  listing_id: string;
  user_id: string;
}
