import { ReactNode } from "react"

interface Props
{
    children: ReactNode
}
const PageLayout : React.FC<Props> = ({children}) =>{

    return(
        <>
            <div>Nav</div>
            <div className="grid sm:grid-cols-1 md:grid-cols-10 px-5 md:px-24">
                <div className="md:col-span-7 bg-slate-200">
                    {children}
                </div>
                <div className="order-first md:col-span-3 md:order-none bg-slate-300">
                    Sidebar
                </div>
            </div>
            <div>Footer</div>
        </>
    )
}

export default PageLayout