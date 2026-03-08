import { api } from "@/lib/axios";

export interface getOrdersQuery {
	pageIndex?: number | null;
}

interface getOrdersResppnse {
	orders: {
		orderId: string;
		createdAt: string;
		status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
		customerName: string;
		total: number;
	}[];
	meta: {
		pageIndex: number;
		perPage: number;
		totalCount: number;
	};
}

export async function getOrders({pageIndex}: getOrdersQuery) {
	const response = await api.get<getOrdersResppnse>('/orders', {
		params: {
			pageIndex,
		},
	})

	return response.data;
}