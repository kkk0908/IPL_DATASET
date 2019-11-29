const axios = require("axios")
const functions ={
	add:(num1,num2)=>num1 +num2,
	isNull:() => null,
	checkValue:x=>x,
	createUser:()=>{
		const user= {firstName:"satish"}
		user.lastName="kumar"
		return user
	},
	fetchUser:()=>{
		
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then(res => res.data)
			// eslint-disable-next-line no-unused-vars
			.catch(err=>"error")
	}
}
module.exports=functions