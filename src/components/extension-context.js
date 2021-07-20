import React, { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const ExtensionContext = createContext({})

export function ExtensionProvider(props) {
    const {
        children,
        experienceInfo,
        userInfo,
        extensionInfo,
        extensionControl,
        data,
        cache,
        dashboardInfo,
        cardControl,
        cardInfo,
        pageControl,
        pageInfo,
        themeInfo
    } = props;

    const contextValue = useMemo(() => {
        const experienceInfoValue = Object.assign({}, experienceInfo || {
            version: dashboardInfo ? dashboardInfo.version : undefined
        });

        const extensionInfoValue = Object.assign({}, extensionInfo || {});
        const {type = (pageInfo ? 'page' : 'card')} = extensionInfoValue;
        extensionInfoValue.type = type;

        if (type === 'page') {
            extensionInfoValue.basePath = pageInfo.basePath;
            extensionInfoValue.mergedConfiguration = { ... experienceInfo.configuration, ... cardInfo.cardConfiguration };
        } else if (type === 'card') {
            extensionInfoValue.extensionId = cardInfo.extensionId;
            extensionInfoValue.mergedConfiguration = cardInfo.cardConfiguration;
        }

        const extensionControlValue = Object.assign(extensionControl || (pageInfo ? {
            navigateToPage: pageControl.navigateToPage,
            setErrorMessage: pageControl.setErrorMessage,
            setLoadingStatus: pageControl.setLoadingStatus
        } : {
            navigateToPage: cardControl.navigateToPage,
            setErrorMessage: cardControl.setErrorMessage,
            setLoadingStatus: cardControl.setLoadingStatus
        }));

        extensionControlValue.setPreventRemove = cardControl.setPreventRemove;
        extensionControlValue.setPreventRemoveMessage = cardControl.setPreventRemoveMessage;

        const context = {
            experienceInfo: experienceInfoValue,
            userInfo: userInfo || {},
            extensionInfo: extensionInfoValue,
            extensionControl: extensionControlValue,
            data: data || {},
            cache: cache || {},
            themeInfo: themeInfo || {}
        }

        context.cardInfo = {...cardInfo};
        context.cardInfo.configuration = cardInfo.cardConfiguration;
        if (type === 'card') {
            delete context.cardInfo.extensionId;
        }

        return context;
    }, [
        cache,
        data,
        experienceInfo,
        extensionControl,
        extensionInfo,
        userInfo,
        themeInfo
    ]);

    return (
        <ExtensionContext.Provider value = { contextValue } >
            { children }
        </ExtensionContext.Provider>
    )
}

ExtensionProvider.propTypes = {
    children: PropTypes.object,
    experienceInfo: PropTypes.object,
    userInfo: PropTypes.object.isRequired,
    extensionInfo: PropTypes.object,
    extensionControl: PropTypes.object,
    data: PropTypes.object,
    cache: PropTypes.object.isRequired,
    dashboardInfo: PropTypes.object,
    cardControl: PropTypes.object,
    cardInfo: PropTypes.object,
    pageControl: PropTypes.object,
    pageInfo: PropTypes.object,
    themeInfo: PropTypes.object
}

export function useCache(defaultValue = {}) {
    return useContext(ExtensionContext).cache || defaultValue;
}

export function useCardInfo(defaultValue = {}) {
    return useContext(ExtensionContext).cardInfo || defaultValue;
}

export function useData(defaultValue = {}) {
    return useContext(ExtensionContext).data || defaultValue;
}

export function useExperienceInfo(defaultValue = {}) {
    return useContext(ExtensionContext).experienceInfo || defaultValue;
}

export function useExtensionControl(defaultValue = {}) {
    return useContext(ExtensionContext).extensionControl || defaultValue;
}

export function useExtensionInfo(defaultValue = {}) {
    return useContext(ExtensionContext).extensionInfo || defaultValue;
}

export function useThemeInfo(defaultValue = {}) {
    return useContext(ExtensionContext).themeInfo || defaultValue;
}

export function useUserInfo(defaultValue = {}) {
    return useContext(ExtensionContext).userInfo || defaultValue;
}
