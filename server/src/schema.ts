export interface users {
  id: string;
  ref: string;
  provider: string;
  email: string;
  username: string | null;
  password: string | null;
  created_date: Date;
  last_sign_in: Date | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  date_of_birth: Date | null;
  gender: string | null;
  account_status: string;
  role: string;
  google_id: string | null;
}

export interface finishes {
  id: string;
  value: string;
  display: string;
}

export interface listing_images {
  id: string;
  isThumbnail: boolean | null;
  uploaded_date: Date;
  url: string;
  listing_id: string | null;
}
