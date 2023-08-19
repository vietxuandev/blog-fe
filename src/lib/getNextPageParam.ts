import { defaultPageSize } from '@/constants';
import { Pagination } from '@/generated/graphql';

export function getNextPageParamFunc(pagination?: Pagination) {
  const page = pagination?.page ?? 0;
  const pageCount = pagination?.pageCount ?? 0;
  if (page < pageCount) {
    return {
      pagination: {
        page: (pagination?.page ?? 0) + 1,
        pageSize: defaultPageSize,
      },
    };
  }
}
