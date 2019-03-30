import { combineReducers } from "redux";

import { auction } from "./auction";
import { main } from "./main";
import { posts } from "./posts";
import { priceLists } from "./price-lists";

export const rootReducer = combineReducers({
    Auction: auction,
    Main: main,
    Posts: posts,
    PriceLists: priceLists,
});
