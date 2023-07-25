import { defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: 'chatgpt-tool-kit',
  description: 'chatgpt-tool-kit',
  version: '1.1',
  background: {
    service_worker: 'background/background.ts',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', 'file:///*'],
      js: [
        'api/openaiapi.ts',
        'content/content.ts',
        'content/ui.ts'],
      css: ['css/content.css'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'options/options.html',
    open_in_tab: false,
  },
  // web_accessible_resources: [
  //   {
  //     resources: [
  //       // this file is web accessible; it supports HMR b/c it's declared in `rollupOptions.input`
  //       'welcome/welcome.html',
  //     ],
  //     matches: ['<all_urls>'],
  //   },
  // ],
  // action: {
  //   default_popup: 'popup/popup.html',
  //   default_icon: {
  //     '16': 'images/extension_16.png',
  //     '32': 'images/extension_32.png',
  //     '48': 'images/extension_48.png',
  //     '128': 'images/extension_128.png',
  //   },
  // },
  // icons: {
  //   '16': 'images/extension_16.png',
  //   '32': 'images/extension_32.png',
  //   '48': 'images/extension_48.png',
  //   '128': 'images/extension_128.png',
  // },
  permissions: ['storage', 'tabs', 'contextMenus'],
}));

export default manifest;
