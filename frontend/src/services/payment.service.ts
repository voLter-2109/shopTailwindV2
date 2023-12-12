import instanse from '../api/api.interceptor'
import { IPaymentResponse } from '../types/payment.interface'

const PAYMENT = '/payment'

const PaymentService = {
	async createPayment(amount: number) {
		return instanse<IPaymentResponse[]>({
			method: 'POST',
			url: PAYMENT,
			data: amount
		})
	}
}

export default PaymentService
