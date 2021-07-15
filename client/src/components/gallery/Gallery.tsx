import {LoadData, MasonryGrid} from '../common';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {Album} from '../../interfaces';
import {GalleryPagination} from './GalleryPagination';
import {GalleryThumbnail} from './GalleryThumbnail';
import axios from 'axios';

/**
 * Component for rendering the gallery (home) view
 * @returns Gallery view-component
 */
export const Gallery: React.VFC = () => {
  const {page} = useParams<{page: string}>();
  const currentPage = page ? Number(page) : 1;
  const [albumCount, setAlbumCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<{count: number}>('/api/albums/count');
        setAlbumCount(res.data.count);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <LoadData<Album[]>
        url="/api/albums"
        config={{params: {page: currentPage, count: 32}}}
        errorElement={
          <div>
            <h1>Något gick fel. 🙁</h1>
            <p>
              Det gick inte att hitta några album. Detta beror sannolikt på ett
              tillfälligt avbrott. Försök igen om en stund.
            </p>
            <button className="btn btn-secondary" onClick={() => history.go(0)}>
              Ladda om sidan
            </button>
          </div>
        }
      >
        {(albums) => (
          <>
            <h1 className="visually-hidden">Galleri</h1>
            {albums.length > 0 ? (
              <MasonryGrid>
                {albums.map((album) => (
                  <GalleryThumbnail key={album._id} album={album} />
                ))}
              </MasonryGrid>
            ) : (
              <>
                <h2>Det finns inget här. 🙁</h2>
                <p>Prova att klicka på en av länkarna nedan.</p>
              </>
            )}
          </>
        )}
      </LoadData>
      <GalleryPagination count={albumCount} currentPage={currentPage} />
    </>
  );
};
