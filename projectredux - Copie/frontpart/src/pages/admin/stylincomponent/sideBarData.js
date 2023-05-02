import React from "react";
import * as FaIcons from'react-icons/fa'
import * as AiIcons from'react-icons/ai'
import * as IoIcons from'react-icons/io'
import * as RiIcons from'react-icons/ri'

export const SideBarData=[
  {
   title:'overview',
   path:'/admin',
   icon:<AiIcons.AiFillHome/>,
   iconClosed:<RiIcons.RiArrowDownFill/>,
   iconOpen:<RiIcons.RiArrowUpFill/>,
   subNav:[
     {
      titles:'utilisateur',
      path:'user',
      icon:<FaIcons.FaUsers/>
    },
    {
        titles:'commande',
        path:'order',
        icon:<FaIcons.FaClipboard/>
      },


   ]

  },
  {
    title:'reports',
    
    icon:<AiIcons.AiFillHome/>,
    iconClosed:<RiIcons.RiArrowDownFill/>,
    iconOpen:<RiIcons.RiArrowUpFill/>,
    subNav:[
      {
       titles:'report1',
      
       icon:<IoIcons.IoIosPaper/>
     }
    

    ]
 
   },
   {
    title:'product',
    path:'create',
    icon:<FaIcons.FaCartPlus/>
  },
  {
    title:'team',
    path:'summary',
    icon:<IoIcons.IoMdPeople/>
  },
  {
    title:'message',
    path:'create',
    icon:<FaIcons.FaEnvelopeOpenText/>  ,
    iconClosed:<RiIcons.RiArrowDownFill/>,
    iconOpen:<RiIcons.RiArrowUpFill/>,
    subNav:[
      {
       titles:'message1',
       path:'/messages/message1',
       icon:<IoIcons.IoIosPaper/>
     },
     {
        titles:'message2',
        path:'/messages/message2',
        icon:<IoIcons.IoIosPaper/>
      }
 
    
    ]
 
   },
   {
    title:'support',
    path:'/support',
    icon:<IoIcons.IoMdAddCircle/>
  }


]