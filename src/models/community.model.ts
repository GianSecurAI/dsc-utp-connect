export interface ICommunity {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  city: string;
  region: string;
  topics: string[];
  contact: {
    email?: string;
    website?: string;
    socialMedia: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      discord?: string;
      facebook?: string;
      youtube?: string;
      instagram?: string;
    };
  };
}
