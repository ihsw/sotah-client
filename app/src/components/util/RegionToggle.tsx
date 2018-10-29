import * as React from "react";

import { Button, Classes, H6, Intent, Menu, MenuItem, Popover, Position, Spinner } from "@blueprintjs/core";

import { IRegion } from "@app/api-types/region";
import { IRegions } from "@app/types/global";
import { FetchLevel } from "@app/types/main";

export interface IStateProps {
    currentRegion: IRegion | null;
    regions: IRegions;
    fetchBootLevel: FetchLevel;
}

export interface IDispatchProps {
    onRegionChange: (region: IRegion) => void;
}

type Props = Readonly<IStateProps & IDispatchProps>;

export class RegionToggle extends React.Component<Props> {
    public renderMenuItem(region: IRegion, index: number) {
        const { currentRegion, onRegionChange } = this.props;

        let className = "";
        if (currentRegion !== null && region.name === currentRegion.name) {
            className = Classes.ACTIVE;
        }

        return (
            <MenuItem
                key={index}
                icon="geosearch"
                className={className}
                text={region.name.toUpperCase()}
                onClick={() => onRegionChange(region)}
            />
        );
    }

    public renderMenu(regions: IRegions) {
        return (
            <Menu>
                <li>
                    <H6>Select Region</H6>
                </li>
                {Object.keys(regions).map((regionName, index) => this.renderMenuItem(regions[regionName], index))}
            </Menu>
        );
    }

    public render() {
        const { currentRegion, fetchBootLevel } = this.props;

        switch (fetchBootLevel) {
            case FetchLevel.success:
                return (
                    <Popover
                        content={this.renderMenu(this.props.regions)}
                        target={<Button icon="double-caret-vertical">{currentRegion!.name.toUpperCase()}</Button>}
                        position={Position.BOTTOM_RIGHT}
                    />
                );
            case FetchLevel.failure:
                return <Spinner className={Classes.SMALL} intent={Intent.DANGER} value={1} />;
            case FetchLevel.initial:
                return <Spinner className={Classes.SMALL} intent={Intent.NONE} value={1} />;
            case FetchLevel.fetching:
            default:
                return <Spinner className={Classes.SMALL} intent={Intent.PRIMARY} />;
        }
    }
}
