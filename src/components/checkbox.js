import Basics from './basics.js'
export default class Select extends Basics {
	constructor(f, p) {
		super(f, p)
		this.choices = p.opts.choices
	}
	setOn() {
		return super.setOn();
	}
	setProps() {
		return super.setProps();
	}
	render(h, ctx) {
		let props = this.setProps()
		let on = this.setOn()
		let children = []
		this.choices.forEach(item => {
			children.push(h('Checkbox', {
				props: item
			}, item.msg))
		})
		return h(this.p.type, {
			props,
			on
		}, children)
	}
}