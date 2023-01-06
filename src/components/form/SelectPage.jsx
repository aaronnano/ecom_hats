import { Link } from "react-router-dom"

export const SelectPage = ({ page, options = []  }) => {

    return (
        <div className="w-full pb-5">
            <h3 className="py-6 px-7 text-sm uppercase text-gray-400">Options</h3>
            { options.length > 0 ? options.map(({ route, title, icon },i) => (
                <Link key={i} to={route} className={ `flex items-center mb-5 px-7  text-sm hover:ring-l-2 hover:text-black
                ${ page === route ? 'ring-l-2 text-black' : 'text-gray-500'}` }>

                    { icon }
                    <span className="pl-2">{title}</span>
                    
                </Link>
            )) : null }
        </div>
    )
}

/* e.g. 
<Link to='/settings/profile' className={ `flex items-center mb-5 px-7  text-sm hover:ring-l-2 hover:text-black
    ${page.includes('profile') ? 'ring-l-2 text-black' : 'text-gray-500'}` }>
    <Cog8ToothIcon className="w-[16px]" />
    <span className="pl-2">Profile Info</span>
</Link> */