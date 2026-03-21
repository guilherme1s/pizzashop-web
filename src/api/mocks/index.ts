import { env } from '@/env';
import { setupWorker } from 'msw/browser';
import { signInMock } from './sign-in-mock';
import { registerRestaurantMock } from './register-restaurant-mock';
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock';
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock';
import { getMonthRevenuetMock } from './get-month-revenue-mock';
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock';
import { GetPopularProductsMock } from './get-popular-products-mock';

export const worker = setupWorker(
	signInMock,
	registerRestaurantMock,
	getDayOrdersAmountMock,
	getMonthCanceledOrdersAmountMock,
	getMonthRevenuetMock,
	getDailyRevenueInPeriodMock,
	GetPopularProductsMock
);

export async function enableMSW() {
	if (env.MODE !== 'test') {
		return;
	}

	await worker.start();
}
