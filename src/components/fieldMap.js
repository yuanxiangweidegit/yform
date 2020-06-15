import Field from './basics.js'
import SelectField from './select.js'
import RadioField from './radio.js'
import CheckboxField from './checkbox'
const fieldMapping = {
Select :SelectField,
RadioGroup:RadioField,
CheckboxGroup:	CheckboxField
}
const getField=function(type){
	let input = fieldMapping[type]?fieldMapping[type]:Field
	return input
}
export default getField