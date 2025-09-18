'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { MENU_SIDEBAR } from '@/config/menu.config.imaderoi';
import { MenuItem } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';

export function Breadcrumb() {
  const pathname = usePathname();
  const { isActive } = useMenu(pathname);

  // Busca profunda que prioriza o match mais específico e ignora headings
  const findBreadcrumb = (
    nodes: MenuItem[],
    trail: MenuItem[] = [],
  ): MenuItem[] | null => {
    for (const item of nodes) {
      const nextTrail = item.heading ? trail : [...trail, item];

      // Descer primeiro para pegar filho mais específico
      if (item.children && item.children.length > 0) {
        const deep = findBreadcrumb(item.children, nextTrail);
        if (deep) return deep;
      }

      // Considerar o próprio item somente se não houve match mais profundo
      const matches = item.path && isActive(item.path);
      if (matches) return nextTrail;
    }
    return null;
  };

  const items: MenuItem[] = findBreadcrumb(MENU_SIDEBAR) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const active = item.path ? isActive(item.path) : false;

        return (
          <Fragment key={`root-${index}`}>
            <span
              className={cn(active ? 'text-mono' : 'text-secondary-foreground')}
              key={`item-${index}`}
            >
              {item.title}
            </span>
            {!last && (
              <ChevronRight
                className="size-3.5 text-muted-foreground"
                key={`separator-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
