import { FeedFilter } from "src/modules/Feed";
import { IFeed } from "src/modules/Api";

export const filterByPrice = (
  startPrice: number,
  endPrice: number
): FeedFilter => {
  return (feed: IFeed, index: number, list: IFeed[]) => {
    return feed.price.amount >= startPrice && feed.price.amount <= endPrice;
  };
};

export const filterByYear = (year: number): FeedFilter => {
  return (feed: IFeed, index: number, list: IFeed[]) => {
    return feed.releaseDate.getFullYear() === year;
  };
};

export interface IFilterGroupElement {
  label: string;
  filter: FeedFilter;
}

export interface IFilterGroupData {
  label: string;
  id: string;
  elements: {
    [param: string]: IFilterGroupElement;
  };
}

export const priceFilterGroup = (): IFilterGroupData => {
  return {
    id: "price",
    label: "Price",
    elements: {
      "0_5": {
        label: "0 - 5",
        filter: filterByPrice(0, 5)
      },
      "5_10": {
        label: "5 - 10",
        filter: filterByPrice(5, 10)
      },
      "10_15": {
        label: "10 - 15",
        filter: filterByPrice(10, 15)
      },
      "15_20": {
        label: "15 - 20",
        filter: filterByPrice(15, 20)
      }
    }
  };
};

export const yearFilterGroup = (): IFilterGroupData => {
  const endYear = new Date().getFullYear();

  const filterElements: {
    [param: string]: IFilterGroupElement;
  } = {};

  for (let startYear = 1950; startYear <= endYear; startYear++) {
    filterElements[startYear.toString()] = {
      label: startYear.toString(),
      filter: filterByYear(startYear)
    };
  }

  return {
    id: "year",
    label: "By Year",
    elements: filterElements
  };
};
