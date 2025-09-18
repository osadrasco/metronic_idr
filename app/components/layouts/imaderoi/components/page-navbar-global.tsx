'use client';

import { Container } from '@/components/common/container';
import { Navbar } from '@/partials/navbar/navbar';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config.imaderoi';

export function PageNavbarGlobal() {
  return (
    <Navbar>
      <Container>
        <NavbarMenu items={MENU_SIDEBAR} />
      </Container>
    </Navbar>
  );
}


