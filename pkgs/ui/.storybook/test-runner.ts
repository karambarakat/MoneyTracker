import { injectAxe, checkA11y } from 'axe-playwright'

export default {
  async preRender(page) {
    await injectAxe(page)
  },
  async postRender(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  },
}
