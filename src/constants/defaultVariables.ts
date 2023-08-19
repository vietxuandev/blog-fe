export const defaultPage = 1;

export const defaultPageSize = 12;

export const defaultSort = 'createdAt:desc';

export const defaultPagination = {
  page: defaultPage,
  pageSize: defaultPageSize,
};

export const defaultVariables = {
  pagination: defaultPagination,
};

export const defaultVariablesWithSort = {
  pagination: defaultPagination,
  sort: defaultSort,
};
