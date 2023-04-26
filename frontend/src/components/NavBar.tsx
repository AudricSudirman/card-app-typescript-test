import {NavLink} from 'react-router-dom'
import Settings from './Settings'
import { ModalContext } from '../utilities/globalContext'
import { useContext } from 'react'
import { Modal } from '../@types/context'

export default function NavBar(){

	const modal = useContext(ModalContext) as Modal;

	const openSettings = () => {
		modal.showModal();
	}

    return(
      <nav className="flex justify-center gap-5">
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
        <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        <button className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" onClick={openSettings}>Settings</button>
		<Settings></Settings>
      </nav>
    )
}