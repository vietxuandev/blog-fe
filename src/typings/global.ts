import type { ParsedUrlQuery } from 'querystring';

export interface QParams extends ParsedUrlQuery {
  slug?: string;
}
