 /*inempty folder make backenf=d folder
 under it server . js File
 open termial
 npm init :--> git
 installing dependencies and devdependencies
 node mon starts server
 
 we use require here instead of import.

 */

 const express = require('express')
 const colors = require('colors')
 const dotenv =require('dotenv').config()
 /*const {errorHandler}=require('./middleware/errorMiddleware')*/
 const connectDB =require('./config/db')

 connectDB()
 const port =5000;



 const apps= express()
 apps.use(express.json())
 apps.use(express.urlencoded({extended : false}))
 /*apps.use(errorHandler)*/

 apps.use('/api/goals',require('./routes/goalRoutes'))
 apps.use('/api/users',require('./routes/userRoutes'))


 apps.listen(port,()=>console.log(`server started at ${port}`)) 