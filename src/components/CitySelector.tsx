import { useState } from "react"
import cityDistrictData from  '@/assets/data/cityDistrict.json'

type CitySelectorType = {
    onChange: (zip: number) => void
}

interface District {
    zip: string,
    name: string,
}

const CitySelector = ({ onChange }: CitySelectorType) => {
    const [city, setCity] = useState(cityDistrictData[0]?.city)
    const [zip, setZip] = useState(cityDistrictData[0]?.districts[0]?.zip)
    const [districts, setDistricts] = useState<Array<District>>(cityDistrictData[0].districts)
    const citys = cityDistrictData.map(m => m.city)


    const handleChangeCity = (newCity: string) => {
        const newDistricts = cityDistrictData.filter(m => m.city === newCity)[0]?.districts ?? []
        const newDistrict = newDistricts[0]
        const newZip = newDistrict?.zip
        setCity(newCity)
        setZip(newZip)
        setDistricts(newDistricts)
        let value = Number(newZip)
        if(Number.isNaN(value)) {
            value = 0
        }
        onChange(value)
    }
    const handleChangeDistrict = (newZip: string) => {
        setZip(newZip)
        
        let value = Number(newZip)
        if(Number.isNaN(value)) {
            value = 0
        }
        onChange(value)
    }
    return (
        <div className="d-flex">
            <select className="form-select " value={city} onChange={e => handleChangeCity(e.target.value)}>
            {
                !city &&
                <option value={""} disabled>請選擇</option>                
            }
            {
                citys.map(m => <option key={m} value={m}>{m}</option>)
            }
            </select>
            <select className="form-select ms-1" value={zip} onChange={e => handleChangeDistrict(e.target.value)}>
            {
                !zip &&
                <option value={""} disabled>請選擇</option>
            }
            {
                districts.map(m => <option key={m.zip + m.name} value={m.zip}>{m.name}</option>)
            }
            </select>
        </div>
    )
}

export default CitySelector