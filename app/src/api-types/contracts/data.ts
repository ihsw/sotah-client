import { IAuction, IOwner, OwnerName } from "../auction";
import { IProfessionPricelistJson } from "../entities";
import { ExpansionName, IExpansion } from "../expansion";
import { SortDirection, SortKind } from "../index";
import { IItem, IItemsMap, ItemId } from "../item";
import { IItemClass } from "../item-class";
import {
    IItemMarketPrices,
    IItemPriceLimits,
    IItemPricelistHistoryMap,
    IPriceLimits,
    IPriceListMap,
} from "../pricelist";
import { IProfession } from "../profession";
import { IRealm, IRegion } from "../region";

export type IGetRegionsResponse = IRegion[];

export interface IGetItemsClassesResponse {
    classes: IItemClass[];
}

export interface IGetBootResponse {
    regions: IRegion[];
    item_classes: IItemClass[];
    expansions: IExpansion[];
    professions: IProfession[];
}

export interface IStatusRealm extends IRealm {
    regionName: string;
}

export interface IGetRealmsResponse {
    realms: IStatusRealm[];
}

export interface IGetAuctionsRequest {
    count: number;
    page: number;
    sortKind: SortKind;
    sortDirection: SortDirection;
    ownerFilters: OwnerName[];
    itemFilters: ItemId[];
}

export interface IGetAuctionsResponse {
    auctions: IAuction[];
    total: number;
    total_count: number;
    items: IItemsMap;
}

export interface IGetOwnersRequest {
    query: string;
}

export interface IGetOwnersResponse {
    owners: OwnerName[];
}

export interface IQueryAuctionsRequest {
    query: string;
}

export interface IQueryAuctionsItem {
    target: string;
    item: IItem | null;
    owner: IOwner | null;
    rank: number;
}

export interface IQueryAuctionsResponse {
    items: IQueryAuctionsItem[];
}

export interface IQueryOwnerItemsRequest {
    items: ItemId[];
}

export interface IQueryOwnerItem {
    owned_value: number;
    owned_volume: number;
}

export interface IQueryOwnerItemsMap {
    [ownerName: string]: IQueryOwnerItem;
}

export interface IQueryOwnerItemsResponse {
    total_value: number;
    total_volume: number;
    ownership: IQueryOwnerItemsMap;
}

export interface IQueryItemsRequest {
    query: string;
}

export interface IQueryItemsItem {
    item: IItem;
    target: string;
    rank: number;
}

export interface IQueryItemsResponse {
    items: IQueryItemsItem[];
}

export interface IGetPricelistRequest {
    item_ids: ItemId[];
}

export interface IGetPricelistResponse {
    price_list: IPriceListMap;
}

export interface IGetPricelistHistoriesRequest {
    item_ids: ItemId[];
    lower_bounds?: number;
    upper_bounds?: number;
}

export interface IGetPricelistHistoriesResponse {
    history: IItemPricelistHistoryMap;
    items: IItemsMap;
    itemPriceLimits: IItemPriceLimits;
    overallPriceLimits: IPriceLimits;
    itemMarketPrices: IItemMarketPrices;
}

export interface IGetUnmetDemandRequest {
    expansion: ExpansionName;
}

export interface IGetUnmetDemandResponse {
    items: IItemsMap;
    professionPricelists: IProfessionPricelistJson[];
    unmetItemIds: ItemId[];
}

export interface IGetProfessionPricelistsResponse {
    profession_pricelists: IProfessionPricelistJson[];
    items: IItemsMap;
}
