export interface Note {
  id: number;
  userId: string;
  title: string;
  text: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
