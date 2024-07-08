import { ffls } from '@prisma/client';

export class FFLEntity implements ffls {
  id: string;
  LIC_FULL: string;
  LIC_REGN: string;
  LIC_DIST: string;
  LIC_CNTY: string;
  LIC_TYPE: string;
  LIC_XPRDTE: string;
  LIC_SEQN: string;
  LICENSE_NAME: string;
  BUSINESS_NAME: string;
  PREMISE_STREET: string;
  PREMISE_CITY: string;
  PREMISE_STATE: string;
  PREMISE_ZIP_CODE: string;
  MAIL_STREET: string;
  MAIL_CITY: string;
  MAIL_STATE: string;
  MAIL_ZIP_CODE: string;
  VOICE_PHONE: string;

  constructor(partial: Partial<FFLEntity>) {
    Object.assign(this, partial);
  }
}
