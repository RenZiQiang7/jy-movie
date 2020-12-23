import Films from '@/views/Films/Film'
import CommingSoon from '@/views/Films/CommingSoon'
import NowPlaying from '@/views/Films/NowPlaying'
import Detail from '@/views/Films/Detail'
const FilmsRouter=[{
    path:'/films',
    component:Films,
    redirect: '/films/nowplaying',
    children:[
        {path:'commingsoon',component:CommingSoon},
        {path:'nowplaying',component:NowPlaying}
    ]
},
{ path: '/film/:filmId', component: Detail }
]
export default FilmsRouter