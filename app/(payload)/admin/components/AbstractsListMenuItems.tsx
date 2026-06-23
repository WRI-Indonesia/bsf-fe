import Link from 'next/link';
import { formatAdminURL } from 'payload/shared';

type Props = {
  collectionSlug: string;
  payload: {
    config: {
      routes: {
        admin: string;
      };
    };
  };
  viewType?: string;
};

const getItemClassName = (active: boolean) =>
  [
    'popup-button-list__button',
    active ? 'popup-button-list__button--selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

export function AbstractsListMenuItems({
  collectionSlug,
  payload,
  viewType,
}: Props) {
  const adminRoute = payload.config.routes.admin;
  const listHref = formatAdminURL({
    adminRoute,
    path: `/collections/${collectionSlug}`,
  });
  const byEventHref = formatAdminURL({
    adminRoute,
    path: `/collections/${collectionSlug}/by-event`,
  });

  return (
    <>
      <Link className={getItemClassName(viewType === 'list')} href={listHref} prefetch={false}>
        All Abstracts
      </Link>
      <Link
        className={getItemClassName(viewType === 'byEvent')}
        href={byEventHref}
        prefetch={false}
      >
        Browse By Event
      </Link>
    </>
  );
}
