import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';

const Logo = props => {
    const { header_logo_src, logo_alt, logo_height, logo_width, store_code } = props;

    const classes = useStyle({}, props.classes);

    const logo_src = process.env.MAGENTO_BACKEND_URL + '/media/logo/' + header_logo_src;

    return (
        <Image
            classes={{ image: classes.logo }}
            height={logo_height}
            src={logo_src}
            alt={logo_alt}
            width={logo_width}
        />
    );
};


export default Logo;
