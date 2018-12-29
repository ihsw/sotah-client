import { connect, Dispatch } from "react-redux";

import { Actions } from "@app/actions";
import { FetchGetPosts } from "@app/actions/posts";
import { IDispatchProps, IStateProps, PostList } from "@app/components/App/Content/PostList";
import { IStoreState } from "@app/types";

const mapStateToProps = (state: IStoreState): IStateProps => {
    const { posts, getPostsLevel } = state.Posts;

    return { getPostsLevel, posts };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
    return {
        refreshPosts: () => dispatch(FetchGetPosts()),
    };
};

export const PostListContainer = connect<IStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
)(PostList);