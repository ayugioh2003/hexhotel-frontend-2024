import Layout from "../components/Layout"
import useCheckUser from "@/hooks/useCheckUser"
import { News, getNews } from '@/services/NewsService'
import { Culinary, getCulinary } from "@/services/CulinaryService"
import { useEffect, useState } from "react"
import { queryRooms } from '@/services/RoomService'
import { NewsComponent, RoomComponent, CulinaryComponent } from '@/components/IndexComponent'


const Index = () => {
    const [news, setNews] = useState<Array<News>>([])
    const [rooms, setRooms] = useState<Array<Room>>([])
    const [culinary, setCulinary] = useState<Array<Culinary>>([])
    useCheckUser()

    useEffect(() => {
        getNews().then(res => setNews(res.result))
        getCulinary().then(res => setCulinary(res.result))
        queryRooms().then(res => setRooms(res.result))
    }, [])

    const brightness40 = {
        filter: "brightness(0.4)",
    }

    const aboutBackgroundStyle = {
        height: "80%",
        margin: "10% 0"
    }

    const aboutStyle = {
        top: "20%",
        right: "10%",
    }

    return (
        <Layout>
            <div style={{paddingTop:'120px'}}>
                <div className="vh-100 position-relative">
                    <img 
                        className="object-fit-cover w-100 min-vh-100 position-absolute object-position-center-center" 
                        src={"./src/assets/png/banner.png"} 
                        style={brightness40}
                        alt="banner" 
                    />
                    <div className="h-100 p-3 position-relative d-flex flex-column flex-md-row justify-content-around align-items-center">
                        <div>
                            <h2 className="text-primary text-center text-md-start">享樂酒店</h2>
                            <h3 className="text-primary text-center text-md-start">Enjoyment Luxury Hotel</h3>
                        </div>
                        <div className="p-5">
                            <h1 className="text-white mb-3">高雄<br />豪華住宿之選</h1>
                            <h6 className=" text-white mb-4">我們致力於為您提供無與倫比的奢華體驗與優質服務</h6>
                            <button type="button" className="btn btn-primary w-100">立即訂房</button>
                        </div>
                    </div>
                </div>
                <div className="row p-2 p-md-5" style={{background: "#F1EAE4"}}>
                    <h2 className="col-md-2 text-primary mb-5">最新<br />消息</h2>
                    <div className="col-md-10">
                        {news.map(m => <NewsComponent key={m._id} title={m.title} description={m.description} image={m.image} />)}
                    </div>
                </div>
                <div className="min-vh-100 position-relative bg-black">
                    <img 
                        className="object-fit-cover w-100 position-absolute object-position-center-center" 
                        style={aboutBackgroundStyle}
                        src={"./src/assets/png/about.png"} 
                        alt="about" 
                    />                    
                    <div 
                        className="position-absolute p-5 w-75 bg-primary rounded-top-5 rounded-start-5 border border-white opacity-75"
                        style={aboutStyle}
                    >
                        <h2 className="mb-5 text-white">關於<br />我們</h2>
                        <p className="mb-4 text-white">享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。 </p>
                        <p className="mb-4 text-white">我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。 </p>
                        <p className="mb-4 text-white">在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。 </p>
                        <p className="mb-4 text-white">享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。</p>
                    </div>
                </div>
                <div className="vh-100 row bg-black">
                    {
                        rooms.length > 0 && 
                        <RoomComponent 
                            name={rooms[0].name} 
                            description={rooms[0].description} 
                            imageUrl={rooms[0].imageUrl}
                            price={rooms[0].price}
                        />
                    }
                </div>
                <div className="overflow-auto p-5" style={{background: "#F1EAE4"}}>
                    <h2 className="text-primary mb-5">佳餚<br />美饌</h2>
                    <div className="d-flex gx-3">
                        {culinary.map(m => (
                            <CulinaryComponent 
                                key={m._id}
                                title={m.title}
                                diningTime={m.diningTime}
                                description={m.description}
                                image={m.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index