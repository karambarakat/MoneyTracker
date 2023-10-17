import component from './Pagination'

export default {
  component,
  title: 'pagination',
  args: {
    padding: 2,
  },
} satisfies SB.Meta<typeof component>

export const Short = {
  args: {
    pageInfo: {
      page: 1,
      pageSize: 2,
      totalPages: 3,
      total: 4,
    },
  },
} satisfies SB.Story<typeof component>
