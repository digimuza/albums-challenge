import { FetchFeedsActions } from "./fetchFeedActions";
import { FilterActions } from "./feedFiltering";

export type FeedStateActions = FetchFeedsActions | FilterActions;
