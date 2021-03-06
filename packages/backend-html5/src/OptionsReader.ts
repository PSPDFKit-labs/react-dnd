import { HTML5BackendContext, HTML5BackendOptions } from './types'

export class OptionsReader {
	public ownerDocument: Document | null = null
	private globalContext: HTML5BackendContext

	public constructor(
		incoming: HTML5BackendOptions,
		globalContext: HTML5BackendContext) {

		this.globalContext = globalContext

		Object.keys(incoming).forEach((key) => {
			if ((incoming as any)[key] != null) {
				;(this as any)[key] = (incoming as any)[key]
			}
		})
	}

	public get window(): Window | undefined {
		if (this.globalContext) {
			return this.globalContext
		} else if (typeof window !== 'undefined') {
			return window
		}
		return undefined
	}

	public get document(): Document | undefined {

		if (this.ownerDocument) {
			return this.ownerDocument
		} else if (this.globalContext?.document) {
			return this.globalContext.document
		} else if (this.window) {
			return this.window.document
		} else {
			return undefined
		}
	}
}
