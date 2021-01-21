import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getArticlesList,
    getLoadStatus,
} from "../selectors/articleSelectors";
import {
    fetchAllArticles,
} from "../thunks/articleThunks";
import {
    getViewportDimensions,
    getViewportSize,
    getViewportType,
} from "../selectors/viewportSelectors";

import ArticleSample from "./ArticleSample";
import LoadingIcon from "./LoadingIcon";
import ServerError from "../pages/ServerError";

import * as S from "../styles/styled-components/styled";

/**
 * React Component which displays a list of articles.
 *
 * If in an article page, this article will be filtered out from the list.
 *
 * @return {Component} list of articles
 */
const ArticlesList = ({
    articleToFilter = null,
    inArticlePage,
    /** Redux */
    viewport,
    loadStatus,
    articles,
    fetchAllArticles,
}) => {
    const [currentArticle, setCurrentArticle] = useState(articleToFilter);
    const [otherArticles, setOtherArticles] = useState([]);

    const displayAsRow = viewport.size.is.greaterThan.small;

    /**
     * useEffect which will attempt to fetch the list of articles
     * if the list has not been loaded yet.
     */
    useEffect(() => {
        let isMounted = true; // Flag which denotes mount status
        if (!loadStatus.loaded || loadStatus.failed) {
            if (isMounted) {
                /** Fetch all article content */
                fetchAllArticles();
            }
        }
        /**
         * useEffect clean-up:
         * If unmounted, set mount status flag to false
         */
        return () => {
            isMounted = false;
        };
    }, []);

    /**
     * useEffect triggered when the current article changes, or the
     * articles list has been loaded.
     *
     * - If an article has been provided to filter out, then filter out
     * that article, otherwise populate the entire list.
     */
    useEffect(() => {
        let isMounted = true;
        if (typeof articles !== undefined &&
            articles.length > 0 && isMounted) {
            articleToFilter === null ?
                setOtherArticles(articles) :
                populateArticleList();
        }
        return () => {
            isMounted = false;
        };
    }, [loadStatus.loaded, currentArticle]);

    /**
     * Function which populates the list of other articles.
     *
     * - If not article has been provided to filter, then
     * we want to display the entire list.
     * - If an article has been provided to filter, filter it
     * out and display the remaining articles.
     */
    const populateArticleList = () => {
        const temp = [];
        articles.map((article) => {
            if (article.path !== articleToFilter) {
                temp.push(article);
            }
        });
        setOtherArticles(temp);
    };

    /*
     * If linked clicked to navigate to another article,
     * update the state with the clicked on article path.
    */
    const linkClicked = (articlePath) => {
        setCurrentArticle(articlePath);
    };
    /*
     * Ternary operators to determine the content to render.
     *
     * If article list is within an article page, we don't want
     * to display the loading spinner in the center of the viewport.
     *
     * If unable to fetch data from server API, display server error page.
    */
    const content = loadStatus.loading ?
        (
            inArticlePage ?
                <LoadingIcon /> :
                (
                    <S.LoadingPlaceholder>
                        <S.CenterInViewport>
                            <LoadingIcon />
                        </S.CenterInViewport>
                    </S.LoadingPlaceholder>
                )
        ) :
        (
            loadStatus.failed ?
                <ServerError errorCode={loadStatus.code} /> :
                (
                    displayAsRow ?
                        (
                            <S.FlexContainer
                                className="full-width no-margin"
                                wrapContent>
                                {otherArticles.map((article, key) => (
                                    <ArticleSample
                                        key={key}
                                        article={article}
                                        linkClicked={linkClicked} />
                                ))}
                            </S.FlexContainer>
                        ) :
                        otherArticles.map((article, key) => (
                            <ArticleSample
                                key={key}
                                article={article}
                                linkClicked={linkClicked} />
                        ))
                )
        );

    return (
        <>
            {content}
        </>
    );
};

ArticlesList.propTypes = {
    /**
     * The article to filter from the list.
     */
    articleToFilter: PropTypes.string,
    /**
     * True if this Component is within an article page.
     * - Used to determine conditional rendering.
     */
    inArticlePage: PropTypes.bool,
    /**
     * The articles stored as an array.
     */
    articles: PropTypes.array,
    /**
     * Viewport Redux state.
     * - Contains information about the viewport.
     */
    viewport: PropTypes.object,
    /**
     * The loading status for fetching data from server API.
     */
    loadStatus: PropTypes.object,
    /**
     * Function to fetch all articles from the server API.
     */
    fetchAllArticles: PropTypes.func,
};

/**
 * Assign props using Redux selectors
 * to connect the Component to the Redux store.
 *
 * @param {*} state the Redux store state
 * @return {*} props mapped to the Component
 */
const mapStateToProps = (state) => ({
    loadStatus: getLoadStatus(state),
    articles: getArticlesList(state),
    viewport: {
        dimensions: getViewportDimensions(state),
        size: getViewportSize(state),
        type: getViewportType(state),
    },
});

/**
 * Assign props to dispatch actions to the Redux Store.
 *
 * @param {*} dispatch action to dispatch
 * @return {Function} functions mapped to the Component as props
 */
const mapDispatchToProps = (dispatch) => ({
    fetchAllArticles: () => dispatch(fetchAllArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
