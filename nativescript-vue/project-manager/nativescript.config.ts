import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'fds.vuejx.project',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
} as NativeScriptConfig
