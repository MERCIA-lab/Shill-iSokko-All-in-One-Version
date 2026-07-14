export interface Customer {
  id: string;
  name: string;
  avatarUrl?: string | null;
  documentId: string;
  country: string;
  rating: number;
  phone?: string;
  email?: string;
  createdAt: string;
}
