import { defaultPageSize } from '@/constants';

interface IPagination {
  page?: number;
  total?: number;
  pageSize?: number;
  pageCount?: number;
}

export function getNextPageParamFunc(pagination: IPagination = {}) {
  const page = pagination.page ?? 0;
  const pageCount = pagination.pageCount ?? 0;
  if (page < pageCount) {
    return {
      pagination: {
        page: (pagination.page ?? 0) + 1,
        pageSize: defaultPageSize,
      },
    };
  }
}
