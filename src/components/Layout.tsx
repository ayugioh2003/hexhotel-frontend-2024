import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
    children: JSX.Element | JSX.Element[];
    showFooter?: boolean,
}

const Layout = ({ children, showFooter = true } : LayoutProps) => {

    return (
        <>
            <Header />
            {children}
            {
                showFooter &&
                <Footer />
            }
        </>
    )
}


export default Layout
