export interface Note {
  id: number;
  userId: number;
  title: string;
  text: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
