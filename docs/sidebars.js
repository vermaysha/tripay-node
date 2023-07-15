/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const fg = require('fast-glob')

/**
 * Replaces the extension of a given path string.
 *
 * @param {string} path - The path string to modify.
 * @return {string} The modified path string with the extension replaced.
 */
function replaceExtension(path) {
  return path.replace('./docs/', '').replace('.md', '')
}

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */

  guideSidebar: [
    'guide/installation',
    'guide/payment',
    'guide/merchant',
    {
      type: 'category',
      label: 'Transactions',
      items: ['guide/closed-transaction', 'guide/open-transaction'],
    },
  ],

  apiSidebar: [
    {
      type: 'doc',
      id: 'api/index',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Tripay Client',
      items: [
        'api/classes/Merchant',
        'api/classes/Payment',
        'api/classes/TripayError',
        {
          type: 'category',
          label: 'Transactions',
          items: [
            'api/classes/ClosedTransaction',
            'api/classes/OpenTransaction',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Classes',
      items: ['api/classes/HTTPRequest', 'api/classes/Signature'],
    },
    {
      type: 'category',
      label: 'Interfaces',
      items: fg.sync(`./docs/api/interfaces/*.md`).map(replaceExtension),
    },
  ],
}

module.exports = sidebars
