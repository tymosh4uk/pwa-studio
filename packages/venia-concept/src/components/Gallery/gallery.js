import React, { useMemo } from 'react';
import { string, shape, array } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import GalleryItemShimmer from '@magento/venia-ui/lib/components/Gallery/item.shimmer';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';

import GalleryItem from './item';
import defaultClasses from './gallery.module.css';

/**
 * Renders a Gallery of items. If items is an array of nulls Gallery will render
 * a placeholder item for each.
 *
 * @params {Array} props.items an array of items to render
 */
const Gallery = props => {
    const { items } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = useGallery();
    const { storeConfig } = talonProps;

    const galleryItems = useMemo(
        () =>
            items.map((item, index) => {
                if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }
                return (
                    <GalleryItem
                        key={item.id}
                        item={item}
                        storeConfig={storeConfig}
                        classes={classes}
                    />
                );
            }),
        [items, storeConfig]
    );

    return (
        <div
            data-cy="Gallery-root"
            className={classes.root}
            aria-live="polite"
            aria-busy="false"
        >
            <div className={classes.items}>{galleryItems}</div>
        </div>
    );
};

Gallery.propTypes = {
    classes: shape({
        filters: string,
        items: string,
        pagination: string,
        root: string
    }),
    items: array.isRequired
};

export default Gallery;
