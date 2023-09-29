import React, { useRef, useState } from 'react'
import ReactStars from 'react-rating-star-with-type'

const ModalAdd = ({ post, modal }) => {

  const [estrellas, setEstrellas] = useState(0)
  const [genero, setGenero] = useState(null)

  const inpTitulo = useRef(null)
  const inpDescripcion = useRef(null)
  const inpFecha = useRef(null)
  const inpPrecio = useRef(null)
  const atp = document.getElementById('atp')

  const onChange = (nextValue) => {
    setEstrellas(nextValue)
  }

  const sendSerie = async () => {

    const data = {
      titulo: inpTitulo.current.value,
      descripcion: inpDescripcion.current.value,
      fechaEstreno: inpFecha.current.value,
      estrellas: estrellas,
      genero: genero,
      precioAlquiler: inpPrecio.current.value,
      atp: atp?.checked ? true : false,
      estado: 'AC'
    }
    console.log(data)
    post(data)
  }
  // const

  return (
    <div className='bg-[#4f86a342] absolute backdrop-blur-sm w-screen h-screen top-0 flex justify-center items-center'>
      <div className='bg-[#141e30] flex flex-col items-center justify-center max-w-[900px] py-10 px-6 rounded-md relative'>
        <span onClick={() => { modal(false) }} className='absolute top-5 right-10 cursor-pointer'>
          <svg width={'40px'} fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
        </span>
        <p className='mb-10 text-3xl font-[600]'>Agregar serie</p>
        <form className='grid grid-cols-12 gap-y-5 items-center'>
          <label className='col-span-12 flex justify-center gap-2'>
            <span>Titulo:</span>
            <input ref={inpTitulo} className='pl-1 border-b border-[#9d9d9d] bg-transparent outline-none w-3/5' type="text" name="title" id="title" />
          </label>
          <label className='col-span-12 flex flex-col items-center w-full'>
            <span className='self-center w-full max-w-[540px] '>Descripcion:</span>
            <textarea ref={inpDescripcion} name="textarea" id="textarea" className='bg-[#ffffff] rounded-sm text-black outline-none w-full max-w-[540px] resize-none pl-2'></textarea>
          </label>
          <label className='col-span-6 md:col-span-4 flex flex-col items-center gap-2'>
            <span>Fecha de estreno:</span>
            <input ref={inpFecha} className='border-b border-[#9d9d9d] bg-transparent outline-none' type="date" name="date" id="date" />
          </label>
          <label className='col-span-6 md:col-span-4 flex flex-col items-center gap-2'>
            <span>Estrellas</span>
            <ReactStars
              onChange={onChange}
              value={0}
              isEdit={true}
              activeColor='#FFCE00'
            />
          </label>
          <label className='col-span-12 md:col-span-4 flex flex-col items-center gap-2'>
            <span className='w-[206px] text-center pr-4'>Genero</span>
            <select onChange={(e) => { setGenero(e.target.value) }} defaultValue={'selec1'} className='px-4 text-center border-b outline-none bg-transparent' name="select" id="select">
              <option value='selec1' disabled>Seleccione un genero</option>
              <option className='text-black' value="Accion">Acción</option>
              <option className='text-black' value="Animada">Animada</option>
              <option className='text-black' value="Comedia">Comedia</option>
              <option className='text-black' value="Drama">Drama</option>
              <option className='text-black' value="Suspenso">Suspenso</option>
              <option className='text-black' value="Terror">Terror</option>
            </select>
          </label>
          <label className='col-span-12 md:col-span-6 flex flex-col items-center'>
            <span>Precio alquiler</span>
            <input ref={inpPrecio} className='border-b border-[#9d9d9d] bg-transparent outline-none w-[100px]' placeholder='$' type="number" name="price" id="price" />
          </label>
          <label htmlFor='atp' className=' col-span-12 md:col-span-6 flex flex-col items-center justify-center'>
            <input className='peer hidden border-b border-[#9d9d9d] bg-transparent outline-none cursor-pointer' type="checkbox" name="atp" id="atp" />
            <span name='atp' className='peer-checked:bg-lime-700 bg-red-700 border w- cursor-pointer px-3 py-1 rounded-md text-center'>Apta para todo público(ATP)</span>
          </label>
        </form>
        <div className='flex items-center mt-10 gap-10'>
          <input onClick={sendSerie} type="button" value="Agregar" className=' bg-lime-700 px-3 py-1 rounded-md font-[500] hover:bg-lime-600 cursor-pointer transition-all duration-200' />
          <input onClick={() => { modal(false) }} type="button" value="Cancelar" className=' bg-red-700 px-3 py-1 rounded-md font-[500] hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-200' />
        </div>
      </div>
    </div>
  )
}

export default ModalAdd