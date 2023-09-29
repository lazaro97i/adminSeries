import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ModalAdd from './components/ModalAdd'
import toast, { Toaster } from 'react-hot-toast'

const API_URL = import.meta.env.VITE_APP_API_URL

function App() {

  const [series, setSeries] = useState(null)
  const [idSerie, setIdSerie] = useState('')
  const [add, setAdd] = useState(false)

  useEffect(() => {
    getSeries()
  }, [])

  const getSeries = async () => {
    try {
      let response = await axios.get(`${API_URL}/series`)
      setSeries(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const postSeries = async (data) => {
    try {
      let response = axios.post(`${API_URL}/series`, data)
      await toast.promise(response, {
        loading: 'Agregando nueva serie',
        success: 'Serie agregada correctamente',
        error: 'Error al cargar la serie'
      }, { duration: 6000 })
      console.log(response)
      setAdd(false)
      getSeries()
    } catch (e) {
      console.log(e)
      e.response.data.data.map((m) => {
        toast.error(m.message, { duration: 6000 })
      })
    }
  }


  useEffect(() => {
    const serie = [...document.getElementsByTagName('tr')]
    let serieSeleccionada = serie.filter(f => parseInt(f.attributes[0].value) === idSerie)
    serieSeleccionada[0]?.classList?.toggle('bg-[#141e30]')
    serie.map((s) => {
      if (parseInt(s.attributes[0].value) === idSerie) {
        s.classList?.add('bg-[#141e30]')
      } else {
        s.classList?.remove('bg-[#141e30]')
      }
    })
  }, [idSerie])



  return (
    <div className='px-6 w-full h-screen flex flex-col justify-start items-center max-w-[1150px]'>
      {
        add
          ? <ModalAdd
            post={postSeries}
            modal={setAdd}
          />
          : null
      }
      <Toaster />
      <h1 className='text-3xl mb-20 mt-32'>Administrador de series</h1>
      <div onClick={getSeries} className='flex self-end justify-center items-center gap-1 bg-white mb-5 rounded-sm px-2 py-[2px] cursor-pointer'>
        <span className=' pointer-events-none'>
          <svg width={'20px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </span>
        <input type="button" value="Consultar" className='self-end cursor-pointer bg-white text-black rounded-sm' />
      </div>
      <table className='w-full max-w-[1150px] border rounded-t-md'>
        <thead className='w-full rounded-t-md'>
          <tr className='h-[43px] bg-[#0d182d] rounded-t-md'>
            <th className='border text-sm text-start pl-2 w-[20%]'>Titulo</th>
            <th className='border text-sm text-start pl-2 hidden md:table-cell w-[20%]'>Descripcion</th>
            <th className='border text-sm text-center hidden md:table-cell w-[9%]'>Fecha de estreno</th>
            <th className='border text-sm text-center w-[5%]'>Estrellas</th>
            <th className='border text-sm text-center w-[10%]'>Genero</th>
            <th className='border text-sm text-center hidden md:table-cell w-[8%]'>Precio alquiler</th>
            <th className='border text-sm text-center w-[3%]'>ATP</th>
            <th className='border text-sm text-center w-[3%]'>Estado</th>
          </tr>
        </thead>
        <tbody>
          {
            series?.series[0]?.map((s, i) => {
              return (
                <tr key={i} onClick={(e) => { setIdSerie(parseInt(e.target.attributes[0].value)) }} value={s.codigo} className='hover:bg-[#141e30] transition-all duration-200 cursor-pointer'>
                  <td value={s.codigo} className='border text-sm pl-2'>{s.titulo}</td>
                  <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2'>{s.descripcion}</td>
                  <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2'>{new Date(s.fechaEstreno).toLocaleString('en-GB').split(',')[0]}</td>
                  <td value={s.codigo} className='border text-sm text-center'>{s.estrellas}</td>
                  <td value={s.codigo} className='border text-sm pl-2'>{s.genero}</td>
                  <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2'>${s.precioAlquiler}</td>
                  <td value={s.codigo} className='border flex justify-center'>
                    {
                      s.atp === 1
                        ? <svg width={'30px'} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fillRule="evenodd" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"> <path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"></path> <path d="m4.5 7.5 2 2 4-4"></path> </g> </g></svg>
                        : <svg width={'30px'} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ic_fluent_checkbox_unchecked_24_regular</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="ic_fluent_checkbox_unchecked_24_regular" fill="#ffffff" fillRule="nonzero"> <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z" id="🎨Color"> </path> </g> </g> </g></svg>
                    }
                  </td>
                  <td value={s.codigo} className='border text-center text-sm pl-2'>{s.estado}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <form className='self-center w-full max-w-[1150px] max-[768px]:justify-center flex flex-wrap gap-x-16 gap-y-5 mt-5'>
        <label className='cursor-pointer bg-white rounded-sm w-[83px] text-black flex items-center justify-center py-[1px]'><input onClick={() => { setAdd(true) }} type="button" value="" />Agregar</label>
        <label className='cursor-pointer bg-white rounded-sm w-[83px] text-black flex items-center justify-center py-[1px]'><input type="button" value="" />Modificar</label>
        <label className='cursor-pointer bg-white rounded-sm w-[83px] text-black flex items-center justify-center py-[1px]'><input type="button" value="" />Anular</label>
        <label className='cursor-pointer bg-white rounded-sm w-[83px] text-black flex items-center justify-center py-[1px]'><input type="button" value="" />Eliminar</label>
      </form>
    </div>
  )
}

export default App
