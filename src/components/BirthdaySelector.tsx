import { useState } from "react"

type BirthdaySelectorType = {
    onChange: (birthday: string) => void
}

enum MonthType  {
    Odd,
    Even,
    Feb,
    LeakYearFeb
}

function* numberGenerator(min: number, max: number) {
    let current = min;

    while(current <= max) {
        yield current++;
    }
}

const BirthdaySelector = ({ onChange }: BirthdaySelectorType) => {
    const defaultYear = 1990
    const defaultMonth = 8
    const defaultDay = 15
    const [year, setYear] = useState<number>(defaultYear)
    const [month, setMonth] = useState<number>(defaultMonth)
    const [day, setDay] = useState<number>(defaultDay)
    const [days, setDays] = useState<Array<number>>([...numberGenerator(1, 31)])

    const years = [...numberGenerator(1900, (new Date).getFullYear())]
    const months = [...numberGenerator(1, 12)]

    const handleChangeYear = (year: string) => {
        let newYear = Number(year)
        if(newYear === 0 || Number.isNaN(newYear)) {
            newYear = defaultYear
        }
        const newDays = generateDays(checkMonthType(newYear, month))
        const newDay = newDays.includes(day) ? day : 1
        setYear(newYear)
        setDays(newDays) 
        setDay(newDay)
        onChange(`${newYear}/${month.toString().padStart(2, '0')}/${newDay.toString().padStart(2, '0')}`)
    }
    const handleChangeMonth = (month: string) => {
        let newMonth = Number(month)
        if(newMonth === 0 || Number.isNaN(newMonth)) {
            newMonth = 1
        }
        const newDays = generateDays(checkMonthType(year, newMonth))
        const newDay = newDays.includes(day) ? day : 1
        setMonth(newMonth)
        setDays(newDays) 
        setDay(newDay)
        onChange(`${year}/${newMonth.toString().padStart(2, '0')}/${newDay.toString().padStart(2, '0')}`)
    }
    const handleChangeDay = (day: string) => {
        let newDay = Number(day)
        if(newDay === 0 || Number.isNaN(newDay)) {
            newDay = 1
        }
        setDay(newDay)
        onChange(`${year}/${month.toString().padStart(2, '0')}/${newDay.toString().padStart(2, '0')}`)
    }

    const checkMonthType = (yaer: number, month: number): MonthType => {
        if(month === 2) {
            return yaer % 4 == 0 ? MonthType.LeakYearFeb : MonthType.Feb
        } else if([4, 6, 9, 11].includes(month)) {
            return MonthType.Even
        } 
        return MonthType.Odd
    }

    const generateDays = (monthType: MonthType): Array<number> => {
        switch (monthType) {
            case MonthType.Even: 
                return [...numberGenerator(1, 30)]
            case MonthType.Odd: 
                return [...numberGenerator(1, 31)]
            case MonthType.Feb: 
                return [...numberGenerator(1, 28)]
            case MonthType.LeakYearFeb: 
                return [...numberGenerator(1, 29)]
            default: 
                return [...numberGenerator(1, 31)]
        }    
    }

    return (
        <div className="d-flex mb-1">
            <select className="form-select" value={year} onChange={e => handleChangeYear(e.target.value)}>
            {
                years.map(m => <option key={m} value={m}>{m} 年</option>)
            }
            </select>
            <select className="form-select ms-1" value={month} onChange={e => handleChangeMonth(e.target.value)}>
            {
                months.map(m => <option key={m} value={m}>{m} 月</option>)
            }
            </select>
            <select className="form-select ms-1" value={day} onChange={e => handleChangeDay(e.target.value)}>
            {
                days.map(m => <option key={m} value={m}>{m} 日</option>)
            }
            </select>
        </div>
    )
}

export default BirthdaySelector