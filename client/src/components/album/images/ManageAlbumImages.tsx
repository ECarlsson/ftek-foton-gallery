import {AddImagesModal} from './AddImagesModal';
import {Album} from '../../../interfaces';
import {EditAlbumImages} from './EditAlbumImages';
import React from 'react';

/**
 * Component for rendering a view for editing album images
 * @returns EditAlbumImages view-component
 */
export const ManageAlbumImages: React.VFC<{album: Album}> = ({album}) => {
  return (
    <>
      <h2 className="visually-hidden">Hantera albumbilder</h2>
      <AddImagesModal {...album} />
      <hr />
      <EditAlbumImages {...album} />
    </>
  );
};