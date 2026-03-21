import { http, HttpResponse } from 'msw'
import type { ManagedRestaurantResponse } from '../get-managed-restaurant';

export const getManagedRestaurantMock = http.get<
	never,
	never,
	ManagedRestaurantResponse
>('/managed-restaurant', () => {
	return HttpResponse.json({
		name: "Pizza Shop",
		id: "user-custom-id",
		createdAt: new Date(),
		updatedAt: null,
		description: 'custom description',
		managerId: "custom-restaurant-id",
	})
});
