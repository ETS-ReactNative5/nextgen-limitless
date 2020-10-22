/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import RouterLink from "./RouterLink";
import { debounce } from "lodash";
import * as S from "../styles/styled-components";
import SocialMediaButton from "./SocialMediaButton";

const socialMediaIcons = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/",
        dVals: [
            "M16.762 5.432h-1.786c-1.428 0-1.666.71-1.666 1.657v2.248h3.452l-.357 3.55h-2.857V22H9.976v-9.112H7v-3.55h2.976V6.733C9.976 3.775 11.762 2 14.381 2c1.19 0 2.262.118 2.619.118v3.314h-.238z",
        ],
    },
    {
        name: "Twitter",
        href: "https://twitter.com/home",
        dVals: [
            "M20.681 7.328v.577c0 5.915-4.486 12.695-12.735 12.695-2.605 0-4.92-.721-6.946-2.02.434 0 .724.145 1.158.145 2.026 0 4.052-.722 5.644-1.876-1.882 0-3.618-1.298-4.197-3.174.29 0 .579.145.868.145.434 0 .434 0 1.013-.145-2.17-.432-4.052-2.308-4.052-4.472 0 .433 1.592.433 2.316.577-1.158-.865-1.882-2.164-1.882-3.75 0-.866.29-1.587.724-2.309 2.17 2.741 5.644 4.472 9.261 4.761-.144-.433-.144-.721-.144-1.01C11.709 5.02 13.735 3 16.195 3c1.302 0 2.46.433 3.328 1.443 1.013-.289 1.882-.577 2.75-1.154-.434 1.154-1.158 1.875-1.881 2.452a13.73 13.73 0 0 0 2.604-.721c-.723.865-1.447 1.73-2.315 2.308z",
        ],
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/",
        dVals: [
            "M23.8 7.6s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1C17 4 12 4 12 4s-5 0-8.4.2c-.5.1-1.5.1-2.4 1-.7.7-1 2.4-1 2.4S0 9.5 0 11.5v1.8c0 1.9.2 3.9.2 3.9s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1 1.9.2 8.2.2 8.2.2s5 0 8.4-.3c.5-.1 1.5-.1 2.4-1 .7-.7 1-2.4 1-2.4s.2-1.9.2-3.9v-1.8c0-1.9-.2-3.8-.2-3.8zM9.5 15.5V8.8l6.5 3.4-6.5 3.3z",
        ],
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/",
        dVals: [
            "M12 2.162c3.204 0 3.584.012 4.849.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311 1.265-.058 1.645-.07 4.849-.07zM12 0C8.741 0 8.332.014 7.052.072c-1.95.089-3.663.567-5.038 1.942C.639 3.389.161 5.102.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.089 1.95.567 3.663 1.942 5.038 1.375 1.375 3.088 1.853 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.95-.089 3.663-.567 5.038-1.942 1.375-1.375 1.853-3.088 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.089-1.95-.567-3.663-1.942-5.038C20.611.639 18.898.161 16.948.072 15.668.014 15.259 0 12 0z",
            "M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z",
        ],
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/",
        dVals: [
            "M.351 24h4.982V7.93H.351zM18.035 7.509c-2.386 0-4.07 1.333-4.702 2.596h-.07V7.93H8.491V24h4.983v-7.93c0-2.105.421-4.14 3.017-4.14 2.597 0 2.597 2.386 2.597 4.28V24H24v-8.842c0-4.351-.912-7.65-5.965-7.65M2.877 0A2.845 2.845 0 0 0 0 2.877a2.845 2.845 0 0 0 2.877 2.877c1.614 0 2.877-1.333 2.877-2.877A2.845 2.845 0 0 0 2.877 0",
        ],
    },
    {
        name: "Reddit",
        href: "https://www.reddit.com/",
        dVals: [
            "M21.334 13.023c.359-.283.538-.671.538-1.166 0-.354-.112-.663-.342-.928a1.111 1.111 0 0 0-.882-.398 1.17 1.17 0 0 0-.734.268 5.004 5.004 0 0 1 1.42 2.224m-2.572-9.275a.97.97 0 0 0-.222.638c0 .247.076.458.222.635a.697.697 0 0 0 .562.265c.23 0 .426-.088.59-.265a.904.904 0 0 0 .244-.635.908.908 0 0 0-.244-.638.773.773 0 0 0-.59-.264.697.697 0 0 0-.562.264M14.156 15.09c.31.319.677.477 1.102.477.424 0 .793-.158 1.102-.477.311-.319.466-.724.466-1.219 0-.46-.146-.848-.44-1.167-.294-.316-.67-.476-1.128-.476-.458 0-.832.16-1.127.476-.295.32-.44.708-.44 1.167 0 .495.153.9.465 1.219m-2.18 4.716c1.568 0 2.84-.529 3.822-1.589l-.638-.635c-.815.848-1.878 1.27-3.184 1.27a4.38 4.38 0 0 1-1.666-.319c-.523-.21-.9-.422-1.128-.635l-.343-.316-.637.635c.98 1.06 2.237 1.59 3.774 1.59M7.221 13.87c0 .495.157.9.467 1.219.309.319.677.477 1.102.477a1.49 1.49 0 0 0 1.104-.477c.308-.319.463-.724.463-1.219 0-.46-.145-.848-.44-1.167-.293-.316-.67-.476-1.127-.476-.457 0-.832.16-1.128.476-.292.32-.44.708-.44 1.167m-4.556-.9c.262-.814.734-1.537 1.42-2.172a1.167 1.167 0 0 0-.734-.268c-.326 0-.613.133-.858.398a1.316 1.316 0 0 0-.367.928c0 .53.18.902.539 1.114M23 11.911c0 1.094-.44 1.89-1.324 2.383.034.179.05.425.05.744 0 2.013-.955 3.735-2.866 5.167-1.91 1.43-4.206 2.145-6.884 2.145s-4.965-.708-6.86-2.121c-1.896-1.412-2.843-3.125-2.843-5.14 0-.352.017-.616.05-.795C1.44 13.801 1 13.004 1 11.91c0-.74.245-1.37.733-1.88.492-.513 1.063-.77 1.717-.77.588 0 1.127.229 1.616.69C6.864 8.607 8.97 7.884 11.39 7.778h.096l1.52-5.459 4.409.952C17.87 2.423 18.509 2 19.324 2h.05c.621 0 1.135.231 1.543.69.408.459.613 1.024.613 1.696 0 .67-.205 1.236-.613 1.696a1.975 1.975 0 0 1-1.542.687h-.05c-.555 0-1.046-.203-1.47-.608a2.186 2.186 0 0 1-.686-1.51l-3.283-.743-1.078 3.921c2.484.177 4.524.885 6.126 2.121.488-.461 1.045-.69 1.665-.69.653 0 1.218.257 1.69.77.474.51.711 1.14.711 1.88",
        ],
    },
];

const Footer = () => {
    /** Initialize state with undefined width/height so server and client renders match
     * Important when implementing server-side rendering */
    const [viewport, setViewport] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        /* Handler function called during window viewport resize */
        function handleResize() {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        /* Add the event listener and attach lodash debounce delay */
        window.addEventListener("resize", debounce(handleResize, 200));

        /* Call Handler immediately to update the initial window size in state */
        handleResize();

        /* Clean-up to remove the event listener */
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let minWidthDetected = false;
    if (viewport.width < 540) {
        minWidthDetected = true;
    };

    return (
        <S.Footer>
            <S.FlexContainer column className="footer-nav">
                <RouterLink url="/" label="Home" />
                <RouterLink url="/articles-list" label="Articles" />
                <RouterLink url="/about" label="About" />
                <RouterLink url="/contact" label="Contact" />
            </S.FlexContainer>
            <S.HorizontalRuler thin smallMargin color="grey" width={"50%"} />
            <S.TinyText margin="0.6rem" light>Connect with us:</S.TinyText>
            <S.FlexContainer smallMargin wrapContent>
                {minWidthDetected ?
                    null :
                    <S.HorizontalRuler thin smallMargin color="grey" width={"25%"} />
                }
                {socialMediaIcons.map((icon, key) => (
                    <SocialMediaButton
                        key={key}
                        icon={icon} />
                ))}
                {minWidthDetected ?
                    null :
                    <S.HorizontalRuler thin smallMargin color="grey" width={"25%"} />
                }
            </S.FlexContainer>
            {minWidthDetected ?
                <S.HorizontalRuler thin smallMargin color="grey" width={"50%"} /> :
                null
            }
            <S.TinyText>
                <span>© 2020 Reuben Smith.&nbsp;</span>
            All Rights Reserved.
            </S.TinyText>
            <S.TinyText superTiny>
                Special thanks to
                <S.InlineAnchor
                    color="light"
                    bgColor="dark"
                    href="https://www.linkedin.com/learning/"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn Learning
                </S.InlineAnchor>
                and
                <S.InlineAnchor
                    color="light"
                    bgColor="dark"
                    href="https://www.linkedin.com/in/shaun-wassell/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Shaun Wassell
                </S.InlineAnchor>
            for initial content and ideas.
            </S.TinyText>
            <S.FlexContainer smallMargin wrapContent>
                <RouterLink tiny url="/privacy" label="Privacy" />
                <RouterLink tiny url="/cookies" label="Cookies" />
                <RouterLink tiny url="/legal" label="Legal" />
            </S.FlexContainer>
        </S.Footer>
    );
};

export default Footer;
