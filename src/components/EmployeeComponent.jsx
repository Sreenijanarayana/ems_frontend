import {React,useEffect,useState} from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'
const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('') 
    const [lastName, setLastName] = useState('') 
    const [email, setEmail] = useState('') 
    const[password,setPassword]=useState('')
    const Navigator = useNavigate()
    const [errors, setErrors] = useState({
      firstName : '',
      lastName : '',
      email:'',
      password:''

    })
    const {id} = useParams();

// const handleFirstName = (e) => setFirstName(e.target.value);

// const handleLastName = (e) =>setLastName(e.target.value);

// const handleEmail = (e) =>setEmail(e.target.value);

useEffect(()=>{
if(id){
  getEmployee(id).then((response)=>{
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setPassword(response.data.password);
  }).catch(
    error =>{
      console.error(error);
    }
  )
}
},[id])

function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
          const employee ={firstName, lastName, email,password}
              console.log(employee)
              if(id){
                updateEmployee(id,employee).then((response)=>{
                  console.log(response.data);
                  Navigator('/employees');
              }).catch(error =>{
                  console.error(error);
                })
              }
              else{
              createEmployee(employee).then((response) =>{
                console.log(response.data);
                Navigator('/employees')
                }).catch(error =>{
                  console.error(error);
                })
              }                                                                   
      }
    }

function validateForm(){
  let valid = true;
  const errorCopy ={...errors}

  if(firstName.trim()){
    errorCopy.firstName = '';
  }
  else{
    errorCopy.firstName ='First name is required!!';
    valid = false;
  }
  if(lastName.trim()){
    errorCopy.lastName = '';
  }
  else{
    errorCopy.lastName ='Last name is required!!';
    valid = false;
  }
  if(email.trim()){
    errorCopy.email = '';
  }
  else{
    errorCopy.email ='email id is required!!';
    valid = false;
  }
  if(password.trim()){
    errorCopy.password = '';
  }
  else{
    errorCopy.password ='password is required!!';
    valid = false;
  }
  setErrors(errorCopy);
  return valid;
}

function pageTitle(){
  if(id){
    return <h2 className='text-center'>Update Employee</h2>
  }
  else
  return <h2 className='text-center'>Add Employee</h2>
}

  return (
    <div className='container'>
        <br/> <br/>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                 {
                  pageTitle()
                 }
                <div class="card-body">
                <form>
                    <div class="form-group mb-2">
                            <label  class="form-label">First Name</label>
                            <input 
                            type="text" 
                            placeholder="Enter employee First name"
                            name='firstName'
                            value={firstName}
                            className={`form-control ${errors.firstName?'is-invalid': ''}`}
                            onChange={(e) => setFirstName(e.target.value)}
                            ></input>
                            {errors.firstName &&<div className='invalid-feedback'>{errors.firstName}</div>}
                         </div>

                         <div class="form-group mb-2">
                            <label  className="form-label">Last Name</label>
                            <input 
                            type="text" 
                            placeholder="Enter employee Last name"
                            name='lastName'
                            value={lastName}
                            className={`form-control ${errors.lastName?'is-invalid': ''}`}
                            onChange={(e) =>setLastName(e.target.value)}
                            ></input>
                             {errors.lastName&& <div className='invalid-feedback'>{errors.lastName}</div>}
                           
                         </div>

                         <div class="form-group mb-2">
                            <label  class="form-label">Email</label>
                            <input 
                            type="text" 
                            placeholder="Enter employee email"
                            name='email'
                            value={email}
                            className={`form-control ${errors.email?'is-invalid': ''}`}
                            onChange={(e) =>setEmail(e.target.value)}
                            ></input>
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                             </div>

                             <div class="form-group mb-2">
                            <label  class="form-label">Password</label>
                            <input 
                            type="password" 
                            placeholder="Enter password"
                            name='email'
                            value={password}
                            className={`form-control ${errors.password?'is-invalid': ''}`}
                            onChange={(e) =>setPassword(e.target.value)}
                            ></input>
                             {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                             </div>
    
  <button type="submit" class="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
</form>
                </div>
                </div>
            </div>
    </div>
  )
}

export default EmployeeComponent
 