import { IUpdatePricelistRequest, IUpdatePricelistResponse } from "@app/api-types/contracts/user/pricelist-crud";
import { IProfessionPricelistJson } from "@app/api-types/entities";
import { IExpansion } from "@app/api-types/expansion";
import { IItemsMap, ItemId } from "@app/api-types/item";
import {
    IItemMarketPrices,
    IItemPriceLimits,
    IPriceLimits,
    IPricelistHistoryMap,
    IPriceListMap,
} from "@app/api-types/pricelist";
import { IProfession } from "@app/api-types/profession";
import { IErrors } from "./global";
import { FetchLevel } from "./main";

export interface IPriceListsState {
    pricelists: IPricelist[];
    createPricelistLevel: MutatePricelistLevel;
    createPricelistErrors: IErrors;
    updatePricelistLevel: MutatePricelistLevel;
    updatePricelistErrors: IErrors;
    entryCreateLevel: EntryCreateLevel;
    selectedList: IPricelist | null;
    isAddListDialogOpen: boolean;
    isEditListDialogOpen: boolean;
    isDeleteListDialogOpen: boolean;
    isAddEntryDialogOpen: boolean;
    getPricelistsLevel: GetPricelistsLevel;
    items: IItemsMap;
    deletePricelistLevel: DeletePricelistLevel;
    selectedProfession: IProfession | null;
    professionPricelists: IExpansionProfessionPricelistMap;
    getProfessionPricelistsLevel: GetProfessionPricelistsLevel;
    selectedExpansion: IExpansion | null;
    getUnmetDemandLevel: GetUnmetDemandLevel;
    unmetDemandItemIds: ItemId[];
    unmetDemandProfessionPricelists: IProfessionPricelistJson[];
    getPricelistLevel: FetchLevel;
    pricelistMap: IPriceListMap;
    getPricelistHistoryLevel: FetchLevel;
    pricelistHistoryMap: IPricelistHistoryMap;
    getItemsOwnershipLevel: FetchLevel;
    itemsOwnershipMap: IOwnerItemsOwnershipMap;
    itemsPriceLimits: IItemPriceLimits;
    overallPriceLimits: IPriceLimits;
    itemsMarketPrices: IItemMarketPrices;
}

export interface IOwnerItemsOwnershipMap {
    [ownerName: string]: {
        owned_value: number;
        owned_volume: number;
    };
}

export interface IExpansionProfessionPricelistMap {
    [key: string]: IProfessionPricelistJson[];
}

export enum ListDialogStep {
    list,
    entry,
    finish,
}
export enum EntryCreateLevel {
    initial,
    success,
    failure,
}
export enum MutatePricelistLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum GetPriceListLevel {
    initial,
    success,
    failure,
}
export enum GetPricelistsLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum GetProfessionPricelistsLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum DeletePricelistLevel {
    initial,
    fetching,
    success,
    failure,
}
export enum GetUnmetDemandLevel {
    initial,
    fetching,
    success,
    failure,
}

export interface IPricelist {
    id: number;
    user_id: number;
    name: string;
    pricelist_entries?: IPricelistEntry[];
}

export interface IPricelistEntry {
    id?: number;
    pricelist_id?: number;
    item_id: ItemId;
    quantity_modifier: number;
}

interface IUpdatePricelistMeta {
    isAddEntryDialogOpen?: boolean;
    isEditListDialogOpen?: boolean;
}

export interface IUpdatePricelistRequestOptions {
    request: IUpdatePricelistRequest;
    meta: IUpdatePricelistMeta;
}

export interface IUpdatePricelistResponseOptions {
    response: IUpdatePricelistResponse;
    meta: IUpdatePricelistMeta;
}

export interface ISelectExpansionPayload {
    expansion: IExpansion;
    jumpTo?: IPricelist | null;
}

export const defaultPriceListsState: IPriceListsState = {
    createPricelistErrors: {},
    createPricelistLevel: MutatePricelistLevel.initial,
    deletePricelistLevel: DeletePricelistLevel.initial,
    entryCreateLevel: EntryCreateLevel.initial,
    getItemsOwnershipLevel: FetchLevel.initial,
    getPricelistHistoryLevel: FetchLevel.initial,
    getPricelistLevel: FetchLevel.initial,
    getPricelistsLevel: GetPricelistsLevel.initial,
    getProfessionPricelistsLevel: GetProfessionPricelistsLevel.initial,
    getUnmetDemandLevel: GetUnmetDemandLevel.initial,
    isAddEntryDialogOpen: false,
    isAddListDialogOpen: false,
    isDeleteListDialogOpen: false,
    isEditListDialogOpen: false,
    items: [],
    itemsMarketPrices: {},
    itemsOwnershipMap: {},
    itemsPriceLimits: {},
    overallPriceLimits: { lower: 0, upper: 0 },
    pricelistHistoryMap: {},
    pricelistMap: {},
    pricelists: [],
    professionPricelists: {},
    selectedExpansion: null,
    selectedList: null,
    selectedProfession: null,
    unmetDemandItemIds: [],
    unmetDemandProfessionPricelists: [],
    updatePricelistErrors: {},
    updatePricelistLevel: MutatePricelistLevel.initial,
};
