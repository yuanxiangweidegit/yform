import fieldType from './fieldMap.js'

export default {
	functional: true,
	props: {
		opts: {
			type: Object,
			default: function() {
				return {};
			}
		},
		type: {
			type: String, // editor类型
			default: 'Input'
		},
		name: {
			type: String, // editor类型
			default: ''
		},
		value: {},
		on: {}
	},
	render(h, ctx) {
	
		let InputClass = fieldType(ctx.props.type)
		let components = new InputClass(ctx.parent, ctx.props)
		return components.render(h,ctx)
	}
}