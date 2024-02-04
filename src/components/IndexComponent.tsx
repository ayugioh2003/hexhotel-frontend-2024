type NewsComponentType = {
    title: string;
    description: string;
    image: string,
}

export const NewsComponent = ({title, description, image}: NewsComponentType) => {
    return (
        <div className="row flex-row mb-3">
            <img  
                className="col-md-5 object-fit-cover rounded-3 mb-3"
                src={image} 
                alt={title} 
            />
            <div className="col-md-7 d-flex flex-column justify-content-center">
                <h3 className="mb-2">{title}</h3>
                <p className="mb-0">{description}</p>
            </div>
        </div>
    )
}


type RoomComponentType = {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}

export const RoomComponent = (props: RoomComponentType) => {
    const {name, description, imageUrl, price} = props
    return (
    <>
        <div className="col-md-6">
            <img 
                className="object-fit-cover w-100 h-100 object-position-center-center" 
                src={imageUrl} 
                alt={name} 
            />                    
        </div>
        <div className="col-md-6 p-5 d-flex flex-column justify-content-end">
            <h2 className="text-white mb-2">{name}</h2>
            <p className="text-white mb-4">{description}</p>
            <h3 className="text-white mb-3">NT$ {price}</h3>
            <button type="button" className="btn btn-primary w-100">查看更多</button>
        </div>                        
    </>
    )
}

type CulinaryComponent = {
    title: string;
    description: string;
    diningTime: string;
    image: string;
}

export const CulinaryComponent = (props: CulinaryComponent) => {
    const {title, description, diningTime, image} = props
    return (
        <div className="position-relative me-3">
            <img 
                className="object-fit-cover object-position-center-center" 
                src={image} 
                alt={title} 
                style={{width: "300px"}}
                />
                
            <div 
                className="position-absolute bottom-0 p-3"
                style={{
                    background: "linear-gradient(180deg,#0000,#140f0a 77.6%)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-white">{title}</h5>
                    <span className="text-white mb-0">{diningTime}</span>
                </div>
                <p  className="text-white mb-0">{description}</p>
            </div>
        </div>
    )
}
