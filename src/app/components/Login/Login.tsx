import './Login.scss'
import logo from './img/LogoCV1.svg'
import icon from './img/Down-Row.svg'
import {useRef, useState} from 'react'

function Login(props: {
	onSubmit: (username: string, password: string) => void
	listOfExistentUsers: string[]
}) {
	/* -------------- INIT REFS AND THEMES --------------*/
	const inputName = useRef(document.createElement('input'))
	const inputPass = useRef(document.createElement('input'))
	const inputSubmit = useRef(document.createElement('button'))

	const [handleSelect, setHandleSelect] = useState(false)
	const [userValue, setUserValue] = useState('')
	const [userInSelect, setUserInSelect] = useState(-1)

	/* -------------- FUNCTIONS -------------- */
	function sendData(event: {preventDefault: () => void}) {
		event.preventDefault()
		props.onSubmit(inputName.current.value, inputPass.current.value)
		inputPass.current.value = ''
		inputPass.current.focus()
	}

	function resetPassword(event: {preventDefault: () => void}) {
		event.preventDefault()
		console.log('Reset Password')
	}

	/* -------------- RENDER --------------*/
	return (
		<div className='login_container'>
			<img src={logo} alt='main_logo' className='login__logo' />

			<form className='login__form' onSubmit={sendData}>
				<div className='login__fild'>
					<label>Usuario:</label>

					<div className='form__username'>
						<div className='username__select_area'>
							<input
								type='text'
								name='username'
								ref={inputName}
								autoFocus
								autoComplete='off'
								onChange={(event: {target: {value: any}}) => {
									setUserValue(event.target.value)
								}}
								value={userValue}
								onKeyPress={(e: {key: any; preventDefault: () => void}) => {
									if (e.key === 'Enter') {
										e.preventDefault()
										inputPass.current.value = ''
										inputPass.current?.focus()
										setHandleSelect(false)
									}
								}}
								onKeyDown={async e => {
									if (e.key === 'ArrowDown') {
										const InSelect: number = await new Promise(resolve => {
											if (userInSelect < props.listOfExistentUsers.length - 1) {
												setUserInSelect(userInSelect + 1)
												setHandleSelect(true)
											}
											resolve(userInSelect + 1) //Se ejecuta al mismo tiempo que el if. por eso regreso el valor mientras actualiza el estado
										})

										if (
											InSelect >= 0 &&
											InSelect < props.listOfExistentUsers.length
										) {
											setUserValue(`${props.listOfExistentUsers[InSelect]}`)
											setHandleSelect(true)
										}
									}

									if (e.key === 'ArrowUp') {
										const InSelect: number = await new Promise(resolve => {
											if (userInSelect > 0) {
												setUserInSelect(userInSelect - 1)
												setHandleSelect(true)
											}
											resolve(userInSelect - 1)
										})
										if (
											InSelect >= 0 &&
											InSelect < props.listOfExistentUsers.length
										) {
											setUserValue(`${props.listOfExistentUsers[InSelect]}`)
											setHandleSelect(true)
										}
									}

									if (e.key === 'Escape') {
										setUserValue('')
										setHandleSelect(false)
										setUserInSelect(-1)
									}
								}}
								className='input'
							/>

							<div
								className='username__icon_select'
								onClick={() => setHandleSelect(!handleSelect)}
							>
								<img
									className={
										handleSelect ? 'icon-motion-right' : 'icon-motion-left'
									}
									src={icon}
									alt='V'
								/>
							</div>
						</div>

						<div
							className='options_area'
							style={handleSelect ? {} : {display: 'none'}}
						>
							{props.listOfExistentUsers.map((user, index) => (
								<div
									className={
										userValue === user
											? 'select__option focused'
											: 'select__option'
									}
									onClick={() => {
										setUserValue(`${user}`)
										setHandleSelect(false)
										setUserInSelect(index)
										inputPass.current.value = ''
										inputName.current?.focus()
									}}
									key={index}
								>
									{user}
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='login__fild'>
					<label>Contraseña:</label>
					<input
						type='password'
						name='password'
						ref={inputPass}
						onKeyPress={(e: {key: any; preventDefault: () => void}) => {
							if (e.key === 'Enter') {
								e.preventDefault()
								inputSubmit.current?.focus()
							}
						}}
						className='form__password input'
					/>

					<a href='.' className='form__link' onClick={resetPassword}>
						Olvidé mi contraseña...
					</a>
				</div>

				<div className='form__btnsArea'>
					<button
						type='submit'
						ref={inputSubmit}
						className='form__btnEntry button'
					>
						Login
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
