export type ProgramType = 'FREE' | 'PAID';
export type ProgramStatus = 'FREE' | 'PAID' | 'NEW' | 'UPDATED';

export interface SoftwareProgram {
  id: string;
  name: string;
  slug: string;
  version: string;
  description: string;
  longDescription: string;
  category: string;
  platform: string;
  price: number;
  type: ProgramType;
  status: ProgramStatus;
  fileSize: string;
  releaseDate: string;
  updatedAt: string;
  developer: string;
  features: string[];
  requirements: string[];
  changelog: string[];
  accent: string;
  image?: string;
  downloadUrl?: string;
}
