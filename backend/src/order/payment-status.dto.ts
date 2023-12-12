class AmountPayment {
	value: string;
    currency: string;
}

class ObjectPayment {
	id: string;
	status: string;
	description: string;
	recipient: object;

	amount: AmountPayment;
	payment_method: {
		type: string;
		id: number;
		saved: boolean;
		title: string;
		card: object;
	};

	create_at: string;
	expires_at: string;

	test: boolean;
	paid: boolean;
	refundable: boolean;
	metadata: object;
	authorization_details: object;
}

export class PaymentStatusDto {
	event:
		| 'payment.succeeded'
		| 'payment.waiting_for_capture'
		| 'payment.canceled'
		| 'refund.succeeded';
	type: string;
	object: ObjectPayment;
}
