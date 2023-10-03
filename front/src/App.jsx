import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ModalAdd from './components/ModalAdd'
import toast, { Toaster } from 'react-hot-toast'
import ModalConfirm from './components/ModalConfirm'

const API_URL = import.meta.env.VITE_APP_API_URL

function App() {

  const [series, setSeries] = useState(null)
  const [idSerie, setIdSerie] = useState(null)
  const [borrarSerie, setBorrarSerie] = useState(false)
  const [add, setAdd] = useState(false)
  const [update, setUpdate] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false)
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    getSeries()
  }, [])

  const getSeries = async () => {
    try {
      let response = await axios.get(`${API_URL}/series`)
      setSeries(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
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
      setAdd(false)
      getSeries()
    } catch (e) {
      console.log(e)
      e.response.data.data.map((m) => {
        toast.error(m.message, { duration: 6000 })
      })
    }
  }

  const updateSeries = async (data) => {
    try {
      let response = axios.put(`${API_URL}/series`, data)
      await toast.promise(response, {
        loading: 'Modificando serie',
        success: 'Serie modificada correctamente',
        error: 'Error al modificar serie'
      }, { duration: 6000 })
      setUpdate(false)
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
    let serieSeleccionada = serie?.filter(f => parseInt(f.attributes[0]?.value) === idSerie)
    serieSeleccionada[0]?.classList?.toggle('bg-[#141e30]')
    serie?.map((s) => {
      if (parseInt(s.attributes[0]?.value) === idSerie) {
        s.classList?.add('bg-[#141e30]')
      } else {
        s.classList?.remove('bg-[#141e30]')
      }
    })
  }, [idSerie])

  return (
    <div className='px-6 w-full h-screen flex flex-col justify-start items-center max-w-[1150px]'>

      {
        modalConfirm
          ? <ModalConfirm
            id={idSerie}
            modal={setModalConfirm}
            series={getSeries}
            borrar={borrarSerie}
            setBorrar={setBorrarSerie}
            setId={setIdSerie}
          />
          : null
      }

      {
        add
          ? <ModalAdd
            post={postSeries}
            modal={setAdd}
            setId={setIdSerie}
          />
          : null
      }
      {
        update
          ? <ModalAdd
            modal={setUpdate}
            idSerie={idSerie}
            update={updateSeries}
            setId={setIdSerie}
          />
          : null
      }
      <Toaster />
      <h1 className='text-3xl mb-20 mt-32'>Administrador de series</h1>
      <div onClick={getSeries} className='w-full flex flex-wrap gap-5 justify-around md:justify-start items-center mb-5 rounded-sm px-2 py-[2px] cursor-pointer relative z-0'>
        <div>
          <span>Buscar titulo:</span>
          <input onChange={(e) => { setFilter(e.target.value) }} type="search" name="buscar" id="buscar" className='bg-transparent border-b pl-1 ml-3 outline-none' />
        </div>
        <div className='flex bg-white items-center rounded-sm px-2 py-[2px] static md:absolute right-2'>
          <span className=' pointer-events-none'>
            <svg width={'20px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </span>
          <input type="button" value="Consultar" className='self-end cursor-pointer bg-white text-black rounded-sm' />
        </div>
      </div>
      <table className='w-full max-w-[1150px] border rounded-t-md table-fixed'>
        <thead className='w-full rounded-t-md'>
          <tr className='h-[43px] bg-[#0d182d] rounded-t-md'>
            <th className='border text-sm text-start pl-2 w-[20%]'>Titulo</th>
            <th className='border text-sm text-start pl-2 hidden md:table-cell w-[20%]'>Descripcion</th>
            <th className='border text-sm text-center hidden md:table-cell w-[10%]'>Fecha de estreno</th>
            <th className='border text-sm text-center w-[9%] md:w-[7%]'>Estrellas</th>
            <th className='border text-sm text-center w-[10%] md:w-[8%]'>Genero</th>
            <th className='border text-sm text-center hidden md:table-cell w-[8%]'>Precio alquiler</th>
            <th className='border text-sm text-center w-[4.5%]'>ATP</th>
            <th className='border text-sm text-center w-[7%]'>Estado</th>
          </tr>
        </thead>
        <tbody className='relative'>
          {
            loading
              ? <span className='h-[150px] flex content-center'>
                <svg className='absolute top-5 w-full' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" overflow="visible" fill="#52d4ff" stroke="none"><defs><circle id="loader" r="4" cx="50" cy="50" transform="translate(0 -30)" /></defs><use xlinkHref="#loader" transform="rotate(0 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(45 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.125s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(90 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(135 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.375s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(180 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(225 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.625s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(270 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></use><use xlinkHref="#loader" transform="rotate(315 50 50)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.875s" repeatCount="indefinite"></animate></use></svg>
              </span>
              : series?.series[0].length > 0
                ? series?.series[0]?.filter(s => (s.titulo).toLowerCase().includes(filter.toLowerCase())).length > 0
                  ? series?.series[0]?.filter(s => (s.titulo).toLowerCase().includes(filter.toLowerCase())).map((s, i) => {
                    let fecha = (new Date(s?.fechaEstreno).toLocaleDateString().split('/'))
                    fecha[1] = parseInt(fecha[1]) + 1
                    let newFecha = new Date(fecha[2], fecha[0] - 1, fecha[1]).toLocaleDateString('en-GB')
                    return (
                      <tr key={i} onClick={(e) => { setIdSerie(parseInt(e.target.attributes[0].value)) }} value={s.codigo} className='hover:bg-[#141e30] transition-all duration-200 cursor-pointer'>
                        <td value={s.codigo} className='border text-sm pl-2'>{s.titulo}</td>
                        <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2 whitespace-nowrap overflow-hidden'>{s.descripcion}</td>
                        <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2'>{newFecha}</td>
                        <td value={s.codigo} className='border text-sm text-center'>{s.estrellas}</td>
                        <td value={s.codigo} className='border text-sm pl-2'>{s.genero}</td>
                        <td value={s.codigo} className='border hidden md:table-cell text-sm pl-2'>${s.precioAlquiler}</td>
                        <td value={s.codigo} className='border flex justify-center'>
                          {
                            s.atp === 1
                              ? <svg width={'30px'} viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fillRule="evenodd" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)"> <path d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"></path> <path d="m4.5 7.5 2 2 4-4"></path> </g> </g></svg>
                              : <svg width={'30px'} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="ic_fluent_checkbox_unchecked_24_regular" fill="#ffffff" fillRule="nonzero"> <path d="M5.75,3 L18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 Z M5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 L5.75,4.5 Z" id="🎨Color"> </path> </g> </g> </g></svg>
                          }
                        </td>
                        <td value={s.codigo} className='border text-center text-sm pl-2'>{s.estado}</td>
                      </tr>
                    )
                  })
                  : <tr><td className='py-2 text-center w-full flex justify-center'>No se encontraron resultados</td></tr>
                : <tr><td className='py-10 text-center w-full flex justify-center'>No se encontraron series</td></tr>
          }
        </tbody>
      </table>
      <form className='self-center w-full max-w-[1150px] max-[768px]:justify-center flex flex-wrap gap-x-16 gap-y-5 mt-5'>
        <label onClick={() => { setAdd(true) }} className='cursor-pointer bg-white hover:bg-slate-300 transition-all duration-200 rounded-sm w-[103px] text-black flex items-center justify-center py-[1px]'><input type="button" value="" />
          <span className='flex justify-center items-center pr-1'>
            <svg width={'20px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z" fill="#04be07"></path> </g></svg>
          </span>
          Agregar</label>
        <label className='w-[103px] cursor-pointer bg-white hover:bg-slate-300 transition-all duration-200 rounded-sm text-black flex items-center justify-center py-[1px]'><input onClick={() => { series?.series[0].length > 0 ? idSerie ? setUpdate(true) : toast.error('Debe seleccionar una serie') : toast.error('No hay series para modificar') }} type="button" value="" />
          <span className='pr-1'>
            <svg width={'15px'} viewBox="0 0 32 32" enableBackground="new 0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"> <path d="M31,29.7l-0.9-6.8c0-0.2-0.1-0.4-0.3-0.6L13.3,5.8l0,0l0,0L9.4,1.9C8.8,1.3,8,1,7.2,1l0,0 C6.8,1,6.4,1.1,6,1.2c0,0,0,0,0,0C5.8,1.3,5.7,1.4,5.5,1.5c0,0-0.1,0-0.1,0C5.3,1.6,5.1,1.8,4.9,1.9L3.4,3.5l0,0L1.9,5 c-1.2,1.2-1.2,3.2,0,4.5l3.9,3.8l0,0l0,0l16.5,16.5c0.2,0.2,0.4,0.3,0.6,0.3l7,0.9c0,0,0.1,0,0.1,0c0,0,0,0,0,0 c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.4,0.3-0.7C31,29.9,31,29.8,31,29.7z" fill="#FFC10A"></path> <path d="M13.2,5.7C13.2,5.7,13.3,5.8,13.2,5.7L9.4,1.9C8.8,1.3,8,1,7.2,1c0,0,0,0,0,0C6.4,1,5.6,1.3,4.9,1.9 L3.4,3.5l0,0L1.9,5c-1.2,1.2-1.2,3.2,0,4.5l3.9,3.8c-0.4-0.4-0.4-1,0-1.4l0.7-0.7l2.3-2.3l3-3c0.2-0.2,0.4-0.3,0.7-0.3 c0,0,0.1,0,0.1,0c0.1,0,0.2,0,0.3,0.1C13.1,5.6,13.2,5.7,13.2,5.7L13.2,5.7C13.3,5.8,13.3,5.8,13.2,5.7L13.2,5.7z" fill="#F44236"></path> </g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"></g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>
          </span>
          Modificar</label>
        <label className=' w-[103px] cursor-pointer bg-white hover:bg-slate-300 transition-all duration-200 rounded-sm text-black flex items-center justify-center py-[1px]'><input onClick={() => { series?.series[0].length > 0 ? idSerie ? setModalConfirm(true) : toast.error('Debe seleccionar una serie') : toast.error('No hay series para anular') }} type="button" value="" />
          <span className='pr-1'>
            <svg width={'15px'} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier" fill='#e10909' fillRule='evenodd'><path d="M100,390a30,30,0,1,1,30-30A30,30,0,0,1,100,390Zm18-30a4,4,0,0,1-4,4H86a4,4,0,0,1,0-8h28A4,4,0,0,1,118,360Z" id="remove" transform="translate(-70 -330)"></path></g></svg>
          </span>
          Anular</label>
        <label className='w-[103px] cursor-pointer bg-white hover:bg-slate-300 transition-all duration-200 rounded-sm text-black flex items-center justify-center py-[1px]'><input onClick={() => { series?.series[0].length > 0 ? idSerie ? (setModalConfirm(true), setBorrarSerie(true)) : toast.error('Debe seleccionar una serie') : toast.error('No hay series para eliminar') }} type="button" value="" />
          <span className='pr-1'>
            <svg width={'15px'} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier" fill='#e10909' fillRule='evenodd'><path d="M100,390a30,30,0,1,1,30-30A30,30,0,0,1,100,390Zm18-30a4,4,0,0,1-4,4H86a4,4,0,0,1,0-8h28A4,4,0,0,1,118,360Z" id="remove" transform="translate(-70 -330)"></path></g></svg>
          </span>
          Eliminar</label>
      </form>
    </div>
  )
}

export default App
