import React,{useEffect, useState} from 'react'
import { deleteemployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
//use state hooks(js function) are used to define state variables inn functional components
const[employees,setEmployees] = useState([])
const navigate =useNavigate()

useEffect(()=>{
  getAllemployees();
},[])

function getAllemployees(){
  listEmployees().then((response) =>{
    setEmployees(response.data);
}).catch(error =>{
    console.error(error);
})
}

// const dummyData =[
// {
//     "id" : 1,
//     "firstName" : "Sagar",
//     "lastName" : "Sinha",
//     "email" : "sagar@gmail.com"
// },
// {
//     "id" : 2,
//     "firstName" : "Nadeem",
//     "lastName" : "hansh",
//     "email" : "nadeem@gmail.com"
// },
// {
//     "id" : 3,
//     "firstName" : "Kiran",
//     "lastName" : "benju",
//     "email" : "kiran@gmail.com"
// }
// ]
function addEmployee(){
  navigate('/add-employee')
}
function UpdateEmployee(id){
  navigate(`/update-employee/${id}`)
}

function deleteEmployee(id){
  // navigate(`/deleteEmployee/${id}`)
  deleteemployee(id).then((response) =>{
    getAllemployees();
  }).catch(error =>{
    console.error(error);
})
}
  return (
    <div className='container'>
      <h2 className='text-center'>List of Employees</h2>
      <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=>UpdateEmployee(employee.id)}>Update</button>
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            
        </tbody>
      </table>
    </div>
  )
}

export default ListEmployeeComponent
