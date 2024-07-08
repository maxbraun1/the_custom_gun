export interface user {
  id: string;
  ref: string;
  verified: boolean;
  provider: string;
  email: string;
  username: string | null;
  password: string | null;
  account_created_date: Date;
  last_sign_in: Date | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  billing_city: string | null;
  billing_state: string | null;
  billing_zip: string | null;
  date_of_birth: Date | null;
  gender: string | null;
  account_status: string;
  role: string;
  google_id: string | null;
  rating: number;
}
