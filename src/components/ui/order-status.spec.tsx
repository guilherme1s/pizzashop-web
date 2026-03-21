import { render } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("Order Status", () => {
	// Pedido pendente
  it("Should display the right text when order status is pending", () => {
    const wrapper = render(<OrderStatus status="pending" />);

		const statusText = wrapper.getByText('Pendente');
		const badgeElement = wrapper.getByTestId('badgePending');

		expect(statusText).toBeInTheDocument();
		expect(badgeElement).toHaveClass('bg-slate-400');
  });

	 it("Should display the right text when order status is canceled", () => {
    const wrapper = render(<OrderStatus status="canceled" />);

		const statusText = wrapper.getByText('Cancelado');
		const badgeElement = wrapper.getByTestId('badgeCanceled');

		expect(statusText).toBeInTheDocument();
		expect(badgeElement).toHaveClass('bg-rose-500');
  });

	it("Should display the right text when order status is entregue", () => {
    const wrapper = render(<OrderStatus status="delivered" />);

		const statusText = wrapper.getByText('Entregue');
		const badgeElement = wrapper.getByTestId('badgeDelivered');

		expect(statusText).toBeInTheDocument();
		expect(badgeElement).toHaveClass('bg-emerald-500');
  });
});
