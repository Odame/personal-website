import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import anime from 'animejs';

import styled from 'styled-components';
import { theme, mixins } from '../styles';

const LoaderContainer = styled.div`
  ${mixins.flexCenter};
  background-color: ${theme.colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`;
const LogoWrapper = styled.div`
  width: max-content;
  max-width: 451;
  transition: ${theme.transition};
  opacity: ${props => (props.isMounted ? 1 : 0)};
  svg {
    width: 100%;
    height: 100%;
    display: block;
    margin: 0 auto;
    fill: none;
    user-select: none;
    #B {
      opacity: 0;
    }
  }
`;

class Loader extends Component {
  static propTypes = {
    finishLoading: PropTypes.func.isRequired,
  };

  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({ isMounted: true }, () => this.animate());
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  animate() {
    const loader = anime.timeline({
      complete: () => this.props.finishLoading(),
    });

    loader
      .add({
        targets: '#logo #left-outline',
        delay: 200,
        duration: 450,
        easing: 'linear',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #right-outline',
        delay: -10,
        duration: 700,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #tag-line',
        duration: 400,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 600,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 100,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  }

  render() {
    const { isMounted } = this.state;

    return (
      <LoaderContainer className="loader">
        <Helmet>
          <body className={isMounted ? 'hidden' : ''} />
        </Helmet>
        <LogoWrapper isMounted={isMounted}>
          <svg id="logo" viewBox="0 0 451 107" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <desc>`Prince Odame - Logo`</desc>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g
                id="tag-line"
                transform="translate(96.000000, 80.000000)"
                fill="#CCCCCC"
                opacity="0">
                <text
                  id="engineer"
                  fontFamily="AndaleMono, Andale Mono"
                  fontSize="24"
                  fontWeight="normal"
                  letterSpacing="26.3500004">
                  <tspan x="0" y="22">
                    Engineer
                  </tspan>
                </text>
                <path
                  d="M339.594586,13.2916942 L337.185338,12.8400066 C337.038897,12.3527465 336.846951,11.8853408 336.609087,11.4456486 L338.003175,9.40767704 C338.132242,9.21906023 338.105353,8.93530774 337.943606,8.77399073 L336.224783,7.05493051 C336.063035,6.89319987 335.779667,6.86714097 335.591858,6.99578094 L333.552436,8.39055261 C333.099875,8.14650893 332.617942,7.95086036 332.115326,7.80319325 L331.666074,5.40660159 C331.623879,5.18199868 331.405458,5 331.176282,5 L328.745522,5 C328.516759,5 328.297925,5.18199868 328.255316,5.40660159 L327.8011,7.82677035 C327.319168,7.97402383 326.857092,8.1659497 326.421905,8.40254798 L324.408958,7.02556254 C324.220322,6.89650893 323.93654,6.92298147 323.775206,7.08471211 L322.055969,8.80377234 C321.894222,8.96550298 321.86816,9.24884183 321.996814,9.43745864 L323.382628,11.4626075 C323.149315,11.8977498 322.960265,12.3593647 322.815478,12.8404203 L320.40623,13.2916942 C320.182017,13.3342985 320,13.5531105 320,13.7818498 L320,16.2123594 C320,16.4410986 320.182017,16.6599107 320.40623,16.7029285 L322.813823,17.1542025 C322.960678,17.6455989 323.154279,18.117141 323.393383,18.5601423 L322.023289,20.562955 C321.894222,20.7515718 321.920697,21.0353243 322.082444,21.1962277 L323.801268,22.9148743 C323.963015,23.0770185 324.246383,23.1026638 324.435019,22.9748511 L326.437211,21.6044838 C326.867847,21.8373594 327.324959,22.0268034 327.801928,22.1732296 L328.25573,24.5942257 C328.298339,24.8188286 328.517173,25 328.745936,25 L331.177109,25 C331.406286,25 331.624293,24.8188286 331.667315,24.5942257 L332.116981,22.1972204 C332.613392,22.0507942 333.090774,21.8576274 333.539199,21.6177201 L335.566624,23.0050463 C335.75526,23.1340999 336.039042,23.1076274 336.200376,22.9450695 L337.918372,21.2272502 C338.080946,21.0651059 338.106594,20.7825943 337.978355,20.5935639 L336.598746,18.5779285 C336.842401,18.12955 337.038069,17.6526307 337.187406,17.1550298 L339.594586,16.7037558 C339.818385,16.6607379 339.999989,16.4419259 339.999989,16.2131866 L339.999989,13.782677 C340.001644,13.5531105 339.819212,13.3342985 339.594586,13.2916942 Z M330.008939,19.6846069 C327.607154,19.6846069 325.659586,17.7370389 325.659586,15.3339599 C325.659586,12.9326063 327.607154,10.9846069 330.008939,10.9846069 C332.411587,10.9846069 334.359586,12.9326063 334.359586,15.3339599 C334.359586,17.7370389 332.410724,19.6846069 330.008939,19.6846069 Z"
                  id="gear"
                  fillRule="nonzero"
                />
              </g>
              <text
                id="opodame"
                fontFamily="ArialMT, Arial"
                fontSize="85"
                fontWeight="normal"
                letterSpacing="10.4499998"
                fill="#1D658F">
                <tspan x="18" y="62">
                  opodame
                </tspan>
              </text>
              <path
                d="M71.1054688,64.0507812 C66.3653392,71.3133637 59.310198,75.84828 52.3126145,78 C45.890866,79.8586511 37.4486193,79.0283152 32,78 C23.092149,76.3188257 7.99199446,66.6856693 4,52 C1.37527412,42.344211 2.73177605,32.5829242 4,29 C4.86482323,27.650232 6.82277214,18.7847333 18,10.3117176 C24.8551517,5.11509736 29.1231528,3.3113732 32,3.19921875 L215.40139,3.19921875"
                id="left-outline"
                stroke="#4A90E2"
                strokeWidth="5"
              />
              <path
                d="M243,3.19921875 C281.994194,3.19921875 340.442534,3.19921875 416.660156,3.19921875 C427.163173,4.72870007 430.588365,7.91008992 434.164063,10.7421875 C438.589693,14.9693883 441.556165,18.3779169 443.063477,20.9677734 C444.570788,23.5576299 445.958809,27.5879034 447.227539,33.0585938 C448.271348,39.8607963 448.41607,46.933111 445.445313,54.9414063 C441.557967,62.6263249 436.999441,66.6352425 432.457031,70.7324219 C424.752818,75.7610277 420.835642,75.7516654 416.660156,76.0859375 L99,76.0859375"
                id="right-outline"
                stroke="#ff8300"
                strokeWidth="5"
              />
            </g>
          </svg>
        </LogoWrapper>
      </LoaderContainer>
    );
  }
}

export default Loader;
