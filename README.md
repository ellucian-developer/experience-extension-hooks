# Experience Extension Hooks

This package provides useful hooks to access the Extension properties using React Contexts

The several hooks provide logical groups of the properties passed by Experience to an extension as properties.

Using these hooks avoids having to pass Extension properties through layers of React Components. To use any of these hooks add code to your Extension component (at any level) like the following:

```javascript
import { useCardInfo, useCache, useData } from '@ellucian/experience-extension-hooks';

...

    const cache = useCache();
    const { getExtensionJwt } = useData();
    const { configuration: {myConfigurationKey = ''} } = useCardInfo();
```

## Installation
`npm install ellucian-developer/experience-extension-hooks`

### Edit webpack.config.js

 You will need to add this to your webpack.config.js in the "For advanced scenarios ..."

```
    // this is needed for @ellucian/experience-extension-hooks
    webpackConfig.module.rules.forEach( rule => {
        if (rule.loader === 'babel-loader') {
            rule.exclude = /node_modules\/(?!(@ellucian)\/)/
        }
    })
```

### Use babel.config.js

Rename .babelrc to babel.config.js and convert to JS syntax so that is looks like:

```
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/transform-runtime'
    ],
    env: {
        test: {
            plugins: [
                'rewire'
            ]
        }
    }
}
```

## The Hooks
### Universal hooks

List of hooks available for all Extension component types

_note:_ Ellucian has an internal component type of Admin which is not available to customer developers

* ### useCache
```javascript
const { clear, getItem, removeItem, storeItem } = useCache();
```

* ### useData
`
const { getEthosQuery, getEthosQueryResourceVersions, getExtensionJwt } = useData();
`

_getEthosQuery_ and _getEthosQueryResourceVersions are only used for Card and Page components

* ### useExperienceInfo
```javascript
const { version } = useExperienceInfo();
```
_version_ is Dashboard version or Setup version for Admin components

* ### useExtensionControl
```javascript
const {
    navigateToPage,
    setErrorMessage,
    setLoadingStatus,
    setPreventRemove,
    setPreventRemoveMessage
} = useExtensionControl();
```
_navigateToPage_ is only used for Card and Page components

_setErrorMessage_ and _setLoadingStatus_ work regardless of Component type. No need to use PageControl vs CardControl

_setPreventRemove_ is only used for Card and Page components

_setPreventRemoveMessage_ is only used for Card and Page components

* ### useExtensionInfo
```javascript
const { basePath, configuration, extensionId, type } = useExtensionInfo();
```
_basePath_ is only used for Page and Admin components

_configuration_ is only used for Page to convey extension configuration. **Note** for cards, the extension configuration is combined with the card configuration in useCardInfo.

* ### useUserInfo
```javascript
const { firstName, locale, roles, tenantId } = useUserInfo();
```

* ### useThemeInfo
```javascript
const { clear, getItem, removeItem, storeItem } = useThemeInfo();
```

### Card hooks
* ### useCardInfo
```javascript
const { cardId, configuration } = useCardInfo()
```

### Usage
The context needs to be wired into each card and page. To do this add similar code to each card and page as follows.

```javascript
import { ExtensionProvider } from '@ellucian/experience-extension-hooks';

...

export default function CardOrPageWithProviders(props) {
    return (
        <ExtensionProvider {...props}>
            <MyCardOrPageComponent/>
        </ExtensionProvider>
    )
}
```
