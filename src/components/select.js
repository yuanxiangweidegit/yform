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
		this.choices.forEach(item=>{
			children.push(h('Option',{
				props:{
					value:item.value,
					key:item.value
				}
			},item.label))
		})
		return h(this.p.type, {
			props,
			on
		},children)
	}
}