/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    getViewportDimensions,
    getViewportSize,
    getViewportType,
} from "../selectors/viewportSelectors";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

import typingOnLaptop from ".../images/typing-on-laptop.jpg";

import * as S from "../styles/styled-components/styled";

/**
 * A React Component page for the store.
 *
 * @return {Component} the store page
 */
const Contact = ({ viewport }) => {
    const displayAsColumn = viewport.size.is.greaterThan.medium;
    return (
        <>
            <S.TopHeader
                className="blog"
                url={typingOnLaptop}
                height="100vh">
                <Navbar className="dark-background" />
                <S.Header
                    as="h1"
                    className="feature-text uppercase"
                    color="grey-tint-lightest" >
                    Get in Touch with us.
                </S.Header>
                <S.Header
                    as="h4"
                    className="feature-text header-secondary"
                    color="grey-tint-lightest" >
                    We&apos;d love to hear from you.
                </S.Header>
            </S.TopHeader>
            <S.MainPageBody>
                <S.Section
                    color="grey-shade-dark"
                    bgColor="grey-tint-lightest">
                    <S.Header as="h2" className="uppercase">
                        How can we help?
                    </S.Header>
                    <ContactForm />
                </S.Section>
            </S.MainPageBody>
        </>
    );
};

Contact.propTypes = {
    /**
     * Viewport Redux state.
     * - Contains information about the viewport.
     */
    viewport: PropTypes.object,
};

/**
 * Assign props as Redux Selectors to connect the Component to the Redux store
 *
 * @param {*} state the Redux store state
 * @return {*} props mapped to the Component
 */
const mapStateToProps = (state) => ({
    viewport: {
        dimensions: getViewportDimensions(state),
        size: getViewportSize(state),
        type: getViewportType(state),
    },
});

export default connect(mapStateToProps)(Contact);
