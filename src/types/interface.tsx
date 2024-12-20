export interface FileFields {
  url: string;
}

export interface ImageFields {
  file: FileFields;
  title: string;
}
export interface ContentfulItemFields {
  title: string;
  ctaLink?: string;
  ctaText?: string;
  body?: any;
  description?: any;
  dataOpen?: any;
  firstNameFile?: string;
  secondNameFile?: string;
  mainImagePosition?: boolean;
  gradientBackground?: boolean;
  backgroundGradient?: boolean;
  positionImages?: boolean;
}

export interface ContentfulItem {
  fields: ContentfulItemFields;
}
