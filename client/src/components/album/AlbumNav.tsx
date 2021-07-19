import {NavLink, useRouteMatch} from 'react-router-dom';

import React from 'react';
import {join} from 'path';

/**
 * HOC for rendering a navigation for album pages
 * @param WrappedComponent Component to render as child
 * @param album Album data (also passed to child)
 * @returns withAlbumsNav HOC
 */
export const AlbumNav: React.VFC = () => {
  const {url} = useRouteMatch();

  return (
    <>
      <h1>Hantera album</h1>
      <nav className="nav nav-tabs mb-3" aria-label="Verktygsnavigering">
        <NavLink
          className="nav-link"
          to={join(url, 'edit-album')}
          activeClassName="active"
        >
          Redigera albuminformation
        </NavLink>
        <NavLink
          className="nav-link"
          to={join(url, 'edit-images')}
          activeClassName="active"
        >
          Hantera bilder
        </NavLink>
        <NavLink
          className="nav-link"
          to={join(url, 'delete')}
          activeClassName="active"
        >
          Ta bort
        </NavLink>
      </nav>
    </>
  );
};
