import React, {Fragment, Suspense, useEffect, useRef} from 'react';
import { shape, string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

import AccountTrigger from '@magento/venia-ui/lib/components/Header/accountTrigger';
import CartTrigger from '@magento/venia-ui/lib/components/Header/cartTrigger';
import NavTrigger from '@magento/venia-ui/lib/components/Header/navTrigger';
import SearchTrigger from '@magento/venia-ui/lib/components/Header/searchTrigger';
import OnlineIndicator from '@magento/venia-ui/lib/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import StoreSwitcher from '@magento/venia-ui/lib/components/Header/storeSwitcher';
import CurrencySwitcher from '@magento/venia-ui/lib/components/Header/currencySwitcher';
import MegaMenu from '../MegaMenu';
import Logo from '@magento/venia-ui/lib/components/Logo';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';
import { useIntl } from 'react-intl';

import FetchedLogo from '../Logo';
import defaultClasses from './header.module.css';
import './header.css';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef,
        logoConfig,
        error,
        loading
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });

    const header = document.getElementById('header');

    const headerRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            threshold: [0,1],
        };

        const callback = function(entries, observer) {
            entries.forEach(entry => {
                // console.log('1 ' +entry.boundingClientRect.y);
                // console.log(entry.rootBounds.y);
                if(!entry.isIntersecting){
                    if(headerRef.current) {
                        headerRef.current.classList.add('header-animation', 'top-0', 'sticky');
                    }
                }
                // if(entry.boundingClientRect.y >= entry.rootBounds.y && entry.boundingClientRect.y == 40) {
                //     headerRef.current.classList.remove('header-animation', 'top-0', 'sticky');
                // }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        if(headerRef) {
            observer.observe(headerRef.current);
        }
    }, [headerRef]);

    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div>
            <header ref={headerRef} className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        {(!error && !loading && logoConfig.header_logo_src)
                            ?
                            <FetchedLogo { ...logoConfig } classes={{ logo: classes.logo }} />
                            :
                            <Logo classes={{ logo: classes.logo }} />
                        }

                    </Link>
                    <MegaMenu />
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>
                {searchBar}
                <PageLoadingIndicator absolute />
            </header>
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
