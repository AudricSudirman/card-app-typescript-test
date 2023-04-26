import { useContext, useEffect } from "react";
import { ModalContext } from "../utilities/globalContext";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Settings() {
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key == "Escape") {
                modalContext?.hideModal();
            }
        }

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        }
    })

    return (
        // <!--Modal-->
        <ModalContext.Consumer>
            {context => (
            <div className={(context?.visibility ? "": "opacity-0 pointer-events-none ") + "modal fixed w-full h-full top-0 left-0 flex items-center justify-center"}>
                <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
                
                <div className="bg-white dark:bg-gray-700 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                
                <div className="absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={modalContext?.hideModal}>
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                    <span className="text-sm">(Esc)</span>
                </div>

                <div className="py-4 text-left px-6">
                    {/* <!--Title--> */}
                    <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Settings</p>
                    <div className="cursor-pointer z-50" onClick={modalContext?.hideModal}>
                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                    </div>

                    {/* <!--Body--> */}
                    <DarkModeSwitch/>

                    {/* <!--Footer--> */}
                    <div className="flex justify-end pt-2">
                    <button className="px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-500" onClick={modalContext?.hideModal}>Apply</button>
                    </div>
                    
                </div>
                </div>
            </div>
        )}
        </ModalContext.Consumer>
    )
}