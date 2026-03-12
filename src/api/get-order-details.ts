import { api } from "@/lib/axios";

interface getOrderDetailsParams {
	orderId: string;
}

interface getOrderDetailsResponse {
	id: string;
	createdAt: string;
	status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
	totalInCents: number;
	customer: {
		name: string;
		email: string;
		phone: string | null;
	};
	orderItems: {
		id: string;
		priceInCents: number;
		quantity: number | null;
		product: {
			name: string;
		} | null;
	}[];
}

export async function getOrderDetails({ orderId }: getOrderDetailsParams) {
	const response = await api.get<getOrderDetailsResponse>(`/orders/${orderId}`);

	return response.data;
}
