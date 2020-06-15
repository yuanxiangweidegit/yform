<template>
	<Form ref='formCustom' :model="value" v-bind='data.options'>
		<Row>
			<Col :span="item.span?item.span:24" v-for='(item,index) in data.fields' :key='index'>
			<FormItem :label="item.label" :prop="item.name" v-if='!item.hidden' :rules='!item.require&&data.rules[item.name]?data.rules[item.name]:{required: false}'>
				<component :is='item.component?item.component:"Cell"' :value='value' :name='item.name' :opts='item.options' :on='item.on' :type='item.type'></component>
			</FormItem>
			</Col>
		</Row>
	</Form>
</template>

<script>
	import Cell from './cell.js'
	export default {
		name: 'yform',
		components: {
			Cell
		},
		props: {
			value: {
				type: Object,
				default: function() {
					return {};
				}
			},
			statusObject: {
				type: Object,
				default: function() {
					return {};
				}
			},
			data: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				watcher: {},
				fields: {}
			}
		},
		created() {
			this.makeWatchers()
		},
		methods: {
			makeWatchers() {
				this.clearWatchers()
				for(let row of this.data.fields) {
					this.fields[row.name] = row
					if(row.showWhen) this.addWatchers(row.showWhen, row, 'hidden')
					if(row.disabledWhen) this.addWatchers(row.disabledWhen, row, 'isDisabled')
					if(row.requireWhen) this.addWatchers(row.requireWhen, row, 'require')
				}
				this.initWatchers()
			},
			addWatchers(name, row, type) {
				if(!this.watcher[name]) {
					this.watcher[name] = {
						items: [],
						watcher: null,
						func: this.statusObject[name]
					}
				}
				this.watcher[name].items.push({
					name: row.name,
					type
				})
			},
			clearWatchers() {
				for(let w in this.watcher) {
					this.watchers[w].watcher()
				}
				this.watchers = {}
			},
			initWatchers() {
				console.log(this.watcher)
				for(let name in this.watcher) {
					let item = this.watcher[name]
					let w = this.$watch(item.func, (n, o) => {
						for(let f of item.items) {
							let field = this.fields[f.name]
							switch(f.type) {
								case 'hidden':
									this.$set(field, 'hidden', !n)
									break
								case 'require':
									this.$set(field, 'require', !n)
									break
								case 'isDisabled':
									this.$set(field.options, 'disabled', n)
									break
							}
						}
					}, {
						immediate: true
					})
					item.watcher = w
				}
			},
			handleReset() {
				this.$refs['formCustom'].resetFields();
			},
			validate(cb) {
				console.log(888444)
				this.$refs['formCustom'].validate(cb)
			},
			validateField(v) {
				this.$refs['formCustom'].validateField(v)
			}
		}
	}
</script>

<style scoped>

</style>