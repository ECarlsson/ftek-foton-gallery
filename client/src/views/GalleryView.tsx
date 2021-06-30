import React, {useState} from 'react';

import {Album} from '../interfaces';
import {Link} from 'react-router-dom';
import {LoadData} from '../components';

/**
 * View component for displaying album gallery
 * @return React component
 */
export function GalleryView() {
  const [albums, setAlbums] = useState<Album[]>();
  const [offset] = useState<number>(0);

  const albumThumbnails = albums?.map((album) => {
    const dateURIString = album.date.substring(0, 10).replaceAll('-', '/');
    const thumbnail = album.thumbnail ? album.thumbnail :
                      album.images ? album.images[0] :
                      undefined;

    return (
      <Link key={`${album.date}-${album.slug}`} to={`/album/${dateURIString}/${album.slug}`}>
        <div className="card">
          <img className="card-img w-100" src={`/images/thumbnail/${thumbnail}`} alt={album.name} />
          <div className="card-img-overlay d-inline-flex flex-column justify-content-end p-0">
            <div className="bg-dark text-white rounded-bottom p-3" style={{opacity: 0.75}}>
              <h2 className="card-title h5">
                {album.name}
              </h2>
              <p className="card-text mb-1">
                {`${album.date.substring(0, 10)} | ${album.authors?.join(', ')}`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <LoadData<Album[]>
      query="/api/album"
      params={{
        offset: offset,
        limit: 24,
      }}
      errorMessage="Det gick inte att ladda sidinnehållet. Försök igen om en stund."
      callback={(data) => setAlbums(data)}
    >
      <h1 className="visually-hidden">Galleri</h1>
      <div
        className="d-grid gap-3 justify-content-sm-center"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, max-content))',
        }}
      >
        {albumThumbnails}
      </div>
    </LoadData>
  );
}
