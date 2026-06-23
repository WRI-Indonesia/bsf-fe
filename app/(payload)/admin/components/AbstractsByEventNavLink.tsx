import type { AdminViewServerProps } from 'payload';

import Link from 'next/link';
import { NavGroup } from '@payloadcms/ui';
import { formatAdminURL } from 'payload/shared';

export function AbstractsByEventNavLink({
  payload,
  permissions,
  visibleEntities,
}: AdminViewServerProps) {
  const canReadAbstracts = permissions?.collections?.abstracts?.read;
  const isVisible = visibleEntities?.collections?.includes('abstracts');

  if (!canReadAbstracts || !isVisible) {
    return null;
  }

  const href = formatAdminURL({
    adminRoute: payload.config.routes.admin,
    path: '/collections/abstracts/by-event',
  });

  return (
    <NavGroup label="Custom Views">
      <Link className="nav__link" href={href} prefetch={false}>
        <span className="nav__link-label">Abstracts By Event</span>
      </Link>
    </NavGroup>
  );
}
