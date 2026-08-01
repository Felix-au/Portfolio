import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background: rgba(10, 10, 15, 0.65);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.25rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandName = styled.span`
  color: #00e5ff;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

const NavList = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #a0a0b8;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <BrandName>Aziz Stark</BrandName>
      <NavList>
        <NavLink href="#works">Works</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </NavList>
    </HeaderContainer>
  );
};
