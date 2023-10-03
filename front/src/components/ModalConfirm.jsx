import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_APP_API_URL

const ModalConfirm = ({ id, modal, series, borrar, setBorrar, setId }) => {

  const [serie, setSerie] = useState(null)

  const getSerie = async (id) => {
    try {
      let serie = await axios.get(`${API_URL}/series/${id}`)
      setSerie(serie?.data?.data[0])
    } catch (e) {
      console.log(e)
    }
  }

  const anularSerie = async () => {
    let data = {
      estado: 'AN',
      codigo: id
    }
    try {
      const response = axios.put(`${API_URL}/series/anular`, data)
      await toast.promise(response, {
        loading: 'Anulando la serie...',
        success: 'Serie anulada correctamente',
        error: 'Error al anular la serie'
      }, { duration: 6000 })
      modal(false)
      series()
    } catch (e) {
      console.log(e)
    }
  }

  const borrarSerie = async (id) => {
    try {
      const response = axios.delete(`${API_URL}/series/${id}`)
      await toast.promise(response, {
        loading: 'Eliminando serie...',
        success: 'Serie eliminada correctamente',
        error: 'Error al eliminar la serie'
      })
      modal(false)
      setBorrar(false)
      series()
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    getSerie(id)
  }, [])

  return (
    <div className='bg-[#4f86a342] absolute backdrop-blur-sm w-screen h-screen top-0 flex justify-center items-center z-10'>
      <div className='bg-[#141e30] flex flex-col items-center justify-center max-w-[900px] py-10 px-6 rounded-md relative'>
        <span onClick={() => { modal(false), setBorrar(false) }} className='absolute top-5 right-5 cursor-pointer'>
          <svg width={'40px'} fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
        </span>
        {
          !borrar
            ? serie?.estado === 'AN'
              ? <>
                <p className='mb-10 text-3xl font-[400] mt-10'>La serie se encuentra anulada</p>
                <input onClick={() => { modal(false), setBorrar(false) }} type="button" value="Cancelar" className='w-[86px] bg-red-700 px-3 py-1 rounded-md font-[500] hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-200' />
              </>
              : <>
                <p className='mb-5 text-3xl font-[400] mt-10'>Desea anular la serie?</p>
                <p className='mb-10 text-2xl font-[700]'>{serie?.titulo}</p>
                <div className='flex items-center mt-10 gap-10'>
                  <input onClick={() => { anularSerie(), setId(null) }} type="button" value='Anular' className=' bg-red-700 px-3 py-1 rounded-md font-[500] hover:bg-red-600 cursor-pointer transition-all duration-200 w-[86px]' />
                  <input onClick={() => { modal(false), setBorrar(false) }} type="button" value="Cancelar" className='w-[86px] bg-white text-black px-3 py-1 rounded-md font-[500] hover:bg-slate-300 cursor-pointer transition-all duration-200' />
                </div>
              </>
            : <>
              <p className='mb-5 text-3xl font-[400] mt-10'>Desea eliminar la serie?</p>
              <p className='mb-10 text-2xl font-[700]'>{serie?.titulo}</p>
              <div className='flex items-center mt-10 gap-10'>
                <input onClick={() => { borrarSerie(id), setId(null) }} type="button" value='Eliminar' className=' bg-red-700 px-3 py-1 rounded-md font-[500] hover:bg-red-600 cursor-pointer transition-all duration-200 w-[86px]' />
                <input onClick={() => { modal(false), setBorrar(false) }} type="button" value="Cancelar" className='w-[86px] bg-white text-black px-3 py-1 rounded-md font-[500] hover:bg-slate-300 cursor-pointer transition-all duration-200' />
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default ModalConfirm