import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-products';

export const GetPopularProductsMock = http.get<
	never,
	never,
	GetPopularProductsResponse
>('/metrics/popular-products', async () => {
	return HttpResponse.json([
		{ product: 'Pizza 1', amount: 5 },
		{ product: 'Pizza 2', amount: 2 },
		{ product: 'Pizza 3', amount: 10 },
		{ product: 'Pizza 4', amount: 7 },
		{ product: 'Pizza 5', amount: 8 },
		{ product: 'Pizza 6', amount: 2 },
		{ product: 'Pizza 7', amount: 4 },
		{ product: 'Pizza 8', amount: 1 },
	])
});
