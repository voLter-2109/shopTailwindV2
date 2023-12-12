import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	// Icon?: IconType
	Icon?: string
	error?: string
}
