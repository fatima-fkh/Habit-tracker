
const Header = ({ onAddClick }) => {
    const strDate = new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    })
    return (
        <div className="bg-[#F5E8AA] flex flex-row justify-between items-center px-6 py-4 sticky top-0 z-10">
            <h1 className="text-4xl font-extrabold">Hello, User</h1>

            <div>

                <div className="flex flex-col items-end gap-2">
                    <p className="text-xl font-bold text-neutral-800">{strDate}</p>
                    <button onClick={onAddClick}
                        className="w-10 h-10 pb-2 rounded-full bg-[#EC709A] text-white text-2xl font-light flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg hover:bg-[#d95f89] active:scale-95 transition-all duration-200">+</button>
                </div>
            </div>
        </div>
    );
}

export default Header
