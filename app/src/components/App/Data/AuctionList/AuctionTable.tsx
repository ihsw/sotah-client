import * as React from "react";

import { Classes, HTMLTable } from "@blueprintjs/core";

import { Currency } from "@app/components/util";
import { SortToggleContainer } from "@app/containers/App/Data/AuctionList/SortToggle";
import { ItemPopoverContainer } from "@app/containers/util/ItemPopover";

import { SortKind } from "@app/api-types";
import { IAuction } from "@app/api-types/auction";
import { IQueryAuctionsItem } from "@app/api-types/contracts/data";
import { IItem, IItemsMap } from "@app/api-types/item";
import { getSelectedResultIndex, qualityToColorClass } from "@app/util";

import "./AuctionTable.scss";

type ListAuction = IAuction | null;

export interface IStateProps {
    auctions: ListAuction[];
    selectedItems: IQueryAuctionsItem[];
    items: IItemsMap;
}

export interface IDispatchProps {
    onAuctionsQuerySelect: (aqResult: IQueryAuctionsItem) => void;
    onAuctionsQueryDeselect: (index: number) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class AuctionTable extends React.Component<Props> {
    public isResultSelected(result: IQueryAuctionsItem) {
        return this.getSelectedResultIndex(result) > -1;
    }

    public getSelectedResultIndex(result: IQueryAuctionsItem): number {
        const selectedItems = this.props.selectedItems;
        return getSelectedResultIndex(result, selectedItems);
    }

    public onItemClick(item: IItem) {
        const result: IQueryAuctionsItem = {
            item,
            owner: { name: "", normalized_name: "" },
            rank: 0,
            target: "",
        };

        if (this.isResultSelected(result)) {
            this.props.onAuctionsQueryDeselect(this.getSelectedResultIndex(result));

            return;
        }

        this.props.onAuctionsQuerySelect(result);
    }

    public renderItemPopover(item: IItem) {
        return <ItemPopoverContainer item={item} onItemClick={() => this.onItemClick(item)} />;
    }

    public renderAuction(auction: IAuction | null, index: number) {
        const { items } = this.props;

        if (auction === null || !(auction.itemId in items)) {
            return (
                <tr key={index}>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                </tr>
            );
        }

        const item = items[auction.itemId];

        return (
            <tr key={index}>
                <td className={qualityToColorClass(item.quality)}>{this.renderItemPopover(item)}</td>
                <td className="quantity-container">{auction.quantity}</td>
                <td className="currency-container">
                    <Currency amount={auction.buyout} />
                </td>
                <td className="buyout-container">
                    <Currency amount={auction.buyoutPer} />
                </td>
                <td className="auclist-container">{auction.aucList.length}</td>
                <td className="owner-container">{auction.owner}</td>
            </tr>
        );
    }

    public render() {
        const { auctions } = this.props;

        return (
            <HTMLTable
                className={`${Classes.HTML_TABLE} ${Classes.HTML_TABLE_BORDERED} ${Classes.SMALL} auction-table`}
            >
                <thead>
                    <tr>
                        <th>
                            <SortToggleContainer label="Item" sortKind={SortKind.item} />
                        </th>
                        <th>
                            <SortToggleContainer label="Quantity" sortKind={SortKind.quantity} />
                        </th>
                        <th>
                            <SortToggleContainer label="Buyout" sortKind={SortKind.buyout} />
                        </th>
                        <th>
                            <SortToggleContainer label="BuyoutPer" sortKind={SortKind.buyoutPer} />
                        </th>
                        <th>
                            <SortToggleContainer label="Auctions" sortKind={SortKind.auctions} />
                        </th>
                        <th>
                            <SortToggleContainer label="Owner" sortKind={SortKind.owner} />
                        </th>
                    </tr>
                </thead>
                <tbody>{auctions.map((auction, index) => this.renderAuction(auction, index))}</tbody>
            </HTMLTable>
        );
    }
}
