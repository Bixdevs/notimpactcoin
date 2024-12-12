export interface Transaction {
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  timestamp: number;
}