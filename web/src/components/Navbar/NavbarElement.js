import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const NavDefaults = css`
  width: 100%;
  height: 50px;
  padding: 0.5rem 2%;
  margin: 0px;
`;

export const StickyNav = styled.nav`
  ${NavDefaults}
  position: fixed;
  z-index: 999;

  display: flex;
  flex-direction: row;

  background: white;
  opacity: 0.8;
`;

export const StickyNavBlack = styled.nav`
  ${NavDefaults}
  position: fixed;
  z-index: 999;

  display: flex;
  flex-direction: row;

  background: black;
  opacity: 0.8;
`;

export const PlaceholderNav = styled.div`
  ${NavDefaults}
`;

export const FixedNav = styled.nav`
  ${NavDefaults}
  z-index: 999;

  display: flex;
  flex-direction: row;

  background: white;
  opacity: 0.8;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;

  height: 100%;
  padding: 0 1rem;

  color: #fff;
  text-decoration: none;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }

  &[target="_blank"]::after {
    margin-left: 5px;
    font-size: 0.8rem;
  }

  &#events-link{
    
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  padding: 10px 22px;
  margin-left: 24px;
  border-radius: 4px;

  background: #256ce1;
  color: #fff;
  outline: none;
  border: none;
  text-decoration: none;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;