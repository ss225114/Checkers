import tie from "../assets/images/handshake.jpg"
const TieDialog = () => {
  return (
    <dialog
          open
          className="inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row justify-around">
            <div>
            <h2 className="text-2xl text-black font-bold">It&apos;s a Draw!!</h2>
            <p className="mt-2 text-black">Well played!</p>
            <button
              className="mt-4 px-4 py-2 bg-yellow-200 text-white rounded"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
            </div>
            <div>
                <img className="w-36" src={tie}/>
            </div>
          </div>
        </dialog>
  )
}

export default TieDialog