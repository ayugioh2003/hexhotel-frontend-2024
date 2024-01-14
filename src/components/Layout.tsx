import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children } : { children: JSX.Element | JSX.Element[] }) => {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}


export default Layout
