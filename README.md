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
` npm install @ellucian/experience-extension-hooks`

## The Hooks
### Universal hooks

Hooks available for all Extension component types

* ### useCache
```javascript
const { clear, getItme, removeItem, storeItem } = useCache();
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
const { navigateToPage, setErrorMessage, setLoadingStatus } = useExtensionControl();
```
_navigateToPage_ is only used for Card and Page components

_setErrorMessage_ and _setLoadingStatus_ work regardless of Component type. No need to use PageControl vs CardControl

* ### useExtensionInfo
```javascript
const { basePath, configuration, extensionId, type } = useExtensionInfo();
```
_basePath_ is only used for Page and Admin components

_configuration_ is only used for Page to convey extension configuration. **Note** for cards, the extension configuration is combined with the card configuration.

* ### useUserInfo
```javascript
const { firstName, locale, roles, tenantId } = useUserInfo();
```

### Card and Page hooks
* ### useThemeInfo
```javascript
const { clear, getItme, removeItem, storeItem } = useThemeInfo();
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
