export interface IFeed {
  image: string;
  name: string;
  price: {
    label: string;
    amount: number;
    currency: string;
  };
  releaseDate: Date;
}
