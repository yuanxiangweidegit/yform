<template>
	<div>
		<Yform :value='value' :data='data' ref='yform' :status-object="statusObject"></Yform>
		<Button @click='validate'>检验</Button>
		<Button @click='reset'>重置</Button>
	</div>
</template>

<script>
	import Yform from './components/index.vue'
	export default {
		name: '',
		components: {
			Yform
		},
		data() {
			let self = this
			return {
				value: {
					time: ''
				},
				statusObject: {
					status1: function() {
						if(self.value.str2 == '1') {
							return true
						} else {
							return false
						}
					},
					status2: function() {
						if(self.value.str1 == '1') {
							return false
						} else {
							return true
						}
					},
					status3: function() {
						if(self.value.str3 == '1') {
							return true
						} else {
							return false
						}
					}
				},
				data: {
					rules: {
						select: [{
							required: true,

							message: '下拉选择框不可为空',
							trigger: 'change'
						}],
						date: [{
							required: true,
							message: '请选择日期',
							type: 'date',
							trigger: 'change'
						}],
						time: [{
							required: true,
							message: '请选择日期',
							trigger: 'change'
						}],
						check: [{
							required: true,
							message: '请选择多选',
							type: 'array',
							trigger: 'change'
						}],
						radio: [{
							required: true,
							message: '请选择单选框',
							trigger: 'change'
						}],
					},
					options: {
						'label-width': 140
					},
					fields: [{
						label: '下拉选择框',
						name: 'select',
						type: 'Select',
						disabledWhen: 'status3',
						requireWhen: 'status1',
						span: 12,
						options: {
							choices: [{
								label: '选择1',
								value: '1'
							}, {
								label: '选择2',
								value: '2'
							}, ]
						}
					}, {
						label: '日期选择框',
						name: 'date',
						span: 12,
						showWhen: 'status2',
						requireWhen: 'status1',
						disabledWhen: 'status3',
						type: 'DatePicker',
						options: {

						}
					}, {
						label: '时间选择框',
						name: 'time',
						span: 10,
						showWhen: 'status2',
						requireWhen: 'status1',
						type: 'TimePicker',
						options: {
							format: 'HH:mm:ss',
							'disabled-hours': [1, 2, 3, 4, 5, 6],
							'disabled-minutes': [0, 10, 20, 30, 40, 50]
						}
					}, {
						label: '单选框',
						name: 'radio',
						type: 'RadioGroup',
						requireWhen: 'status1',
						span: 12,
						options: {
							choices: [{
								label: '1',
								msg: '单选框1',
								disabled: true
							}, {
								label: '2',
								msg: '单选框2'
							}, {
								label: '3',
								msg: '单选框3'
							}]
						}
					}, {
						label: '多选框',
						name: 'check',
						type: 'CheckboxGroup',
						disabledWhen: 'status3',
						requireWhen: 'status1',
						span: 12,
						options: {
							choices: [{
								label: '1',
								msg: '多选1',
								disabled: true
							}, {
								label: '2',
								msg: '多选2'
							}, {
								label: '3',
								msg: '多选3'
							}, ]
						}
					}, {
						label: '输入1控制显示隐藏',
						name: 'str1',
						options: {}
					}, {
						label: '输入1设置必输项',
						name: 'str2',
						options: {}
					}, {
						label: '输入1设置禁用项',
						name: 'str3',
						options: {}
					}]
				}
			}
		},
		methods: {
			validate() {
				this.$refs['yform'].validate(function(i, v) {
					console.log(i, v, 888)
				})
			},
			reset() {
				this.$refs['yform'].handleReset()
			}
		}
	}
</script>

<style scoped>

</style>