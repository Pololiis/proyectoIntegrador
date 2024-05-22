import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './/context/AuthContext'

const LoginForm = () => {
const [email,setEmail] = useState()
const [password,setPassword] = useState()

const {setIsLoggIn,setAuthToken} = useAuth()

const navigate = useNavigate()

const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('ttp://localhost:5173/usuarios/login',{
            "email": email,
            "password": password
        })
        if(response.status === 200){
            
            const accesstoken = response?.data?.access_token
            
            //Guardamos en accesstoken en el AuthContext
            setAuthToken(accesstoken)
            setIsLoggIn(true)

            Swal.fire({
                title: 'Inicio de Sesión Exitoso!',
                icon: 'success'
            }).then((resp) => {
                if (resp.isConfirmed){
                    navigate('/dashboard')
                }
            })
        }
    } catch (error) {
        if(!error?.response){
            Swal.fire({
                title:'El servidor no responde',
                icon:'error'
            })
        }else if(error.response?.status === 400){
            Swal.fire({
                title:'El email o la contraseña son invalidos',
                icon:'error'
            })
        }else if(error.response?.status === 401){
            Swal.fire({
                title:'No autorizado',
                icon:'error'
            })
        }else{
            Swal.fire({
                title:'El Inicio de Sesón Fallo',
                icon:'error'
            })
        }
    }
}
return (
    <div className="app vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className='bg-white rounded-3 gap-3 d-flex flex-column justify-content-center align-items-center p-4' style={{ width: '536px', minHeight: '287px' }}>
            <h3 className='text-center'>Inicio de Sesión</h3>
            <form className='w-75' onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Ingrese su email' required id="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder='Ingrese su contraseña' required id="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit" className="btn w-100" style={{ backgroundColor: '#37B5B6' }}>Inicia Sesión</button>
            </form>
        </div>
    </div>
);
}

export default LoginForm;