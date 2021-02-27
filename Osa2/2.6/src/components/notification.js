import React from 'react'

const Notification = ({message}) => {

	if(message.messageString !== null){
		return(
			<div className='notification' style={{color: message.success ? 'green' : 'red'}}>
				{message.messageString}
			</div>
		)
	}else{
		return(
			<div></div>
		)
	}

}

export default Notification