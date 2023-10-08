
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getProvince, getCity, getDataRS } from './api/configApi'
import NavbarApli from '@/include/navbarApli'
import ButtomNavApli from '@/include/buttomNavApli'

const Apli = () => {
    const [province, setProvince] = useState([])
    const [city, setCity] = useState([])
    const [idProv, setIdProv] = useState([])
    const [idCity, setIdCitY] = useState([])
    const [dataRs, setDataRs] = useState([])

    useEffect(() => {
        getProvince().then((result) => {
            setProvince(result)
        })
    }, [])

    const cityF = async (id) => {
        const query = await getCity(id)
        setCity(query)
        setIdProv(id)
    }

    const getData = async (a) => {
        const query = await getDataRS(idProv, idCity)
        setDataRs(query)
    }
    const DataRs = () => {
        return dataRs.map((dataRs, i) => {
            return (
                <div className="col" key={i}>
                    <div className="card shadow-sm text-center " style={{ height: '100%' }}>
                        <div className="card-header">
                            <h5><b>{dataRs.name}</b></h5>
                        </div>
                        <div className="card-body">
                            <i className="bi bi-hospital fs-1"></i>
                            <h5><span className='badge bg-warning'>Covid : {dataRs.queue}</span> <span className='badge bg-info'>Kamar : {dataRs.bed_availability}</span></h5>
                            <p className="card-text fw-bold">Alamat : {dataRs.address}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <a a href={`tel:${dataRs.phone}`} className="btn btn-sm btn-outline-primary">Telp : {dataRs.phone}</a>
                                <small className="text-body-secondary">{dataRs.info}</small>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <Head>
                <title>Cek Ketersediaan Kamar</title>
                <link rel="icon" href="/assets/favicon/apple-icon-76x76.png" />
            </Head>
            <NavbarApli />
            <ButtomNavApli />
            <div className="container pt-5">
                <div className="row pt-5">
                    <div className="col"></div>
                </div>
                <div className="row pt-5">
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h4 className='fw-bold'>Pilih Provinsi</h4>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={({ target }) => cityF(target.value)}>
                            <option defaultValue>Klik untuk Pilih Provinsi</option>
                            {province.map((province, i) => {
                                return (
                                    <option key={i} value={`${province.id}`}>{province.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-12 col-md-6">
                        <h4 className='fw-bold'>Pilih Kota</h4>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={({ target }) => setIdCitY(target.value)}>
                            <option defaultValue>Klik untuk Pilih Kota</option>
                            {city.map((city, i) => {
                                return (
                                    <option key={i} value={`${city.id}`}>{city.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <button type="button" className="btn btn-outline-primary btn-lg" value='true' onClick={({ target }) => getData(target.value)}>Cek Sekarang</button>
                    </div>
                </div>
            </div>
            <div className="container pt-5 pb-5">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <DataRs />

                </div>
            </div>
        </>
    )
}

export default Apli