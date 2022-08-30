import React from 'react';
import { FocusScope } from 'react-aria';
import {bool, func, object} from "prop-types";
import { X as CloseIcon } from 'react-feather';

import { Portal } from "@magento/venia-ui/lib/components/Portal";
import {useStyle} from "@magento/venia-ui/lib/classify";
import Icon from "@magento/venia-ui/lib/components/Icon";

import defaultClasses from './quickView.module.css';
import QuickViewItem from "./quickViewItem";

const QuickView = (props) => {
    const { isOpen, onCancel, product } = props;

    const classes = useStyle(defaultClasses, props.classes);

    const modalRoot = document.getElementById('modal-root');

    const maybeCloseXButton = isOpen ? (
        <button
            className={classes.closeButton}
            onClick={onCancel}
            type="reset"
        >
            <Icon className={classes.closeIcon} src={CloseIcon} />
        </button>
    ) : null;

    return (
        <Portal container={modalRoot}>
            <FocusScope contain restoreFocus autoFocus>
                <aside>
                    <div className={classes.background} onClick={() => onCancel('none')}></div>

                        <div className={classes.container}>
                            <div className={classes.wrapper}>
                                {maybeCloseXButton}
                                <QuickViewItem product={product}/>
                            </div>
                        </div>

                </aside>
            </FocusScope>
        </Portal>
    );
};

export default QuickView;

QuickView.propTypes = {
    isOpen: bool,
    onCancel: func,
    product: object
};
