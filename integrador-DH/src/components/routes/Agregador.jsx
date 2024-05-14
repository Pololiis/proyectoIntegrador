import React, { useState } from 'react';
import axios from 'axios';
import './agregador.css';

const Agregador = () => {
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imagen, setImagen] = useState(null);

	const handleNombreChange = (event) => {
		setNombre(event.target.value);
	};

	const handleDescripcionChange = (event) => {
		setDescripcion(event.target.value);
	};

	const handleImagenChange = (event) => {
		setImagen(event.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('nombre', nombre);
		formData.append('descripcion', descripcion);
		formData.append('imagen', imagen);

		try {
			console.log("FormData: " + formData.get('nombre'));
			console.log("FormData: " + formData.get('descripcion'));
			console.log("FormData: " + formData.get('imagen'));

			const response = await axios.post('http://localhost:8081/videojuegos/nuevo', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			console.log(response.data);
		} catch (error) {
			console.error('Error al enviar el objeto:', error);
		}
	};

	return (
		<div id="main">
			<div id="main_agregador">
				<h2 id="h2_agregador">Agregar Producto</h2>
				<form id="form_agregador" onSubmit={handleSubmit}>
					<div>
						<label className="label_agregador">Nombre:</label>
						<input className="input_agregador" type="text" value={nombre} onChange={handleNombreChange} />
					</div>
					<div>
						<label className="label_agregador">Descripción:</label>
						<textarea className="input_agregador" value={descripcion} onChange={handleDescripcionChange} />
					</div>
					<div>
						<label className="label_agregador">Imagen:</label>
						<input className="input_agregador" type="file" accept="image/*" multiple onChange={handleImagenChange} />
					</div>
					<button id="button_agregador" type="submit">Agregar Producto</button>
				</form>
			</div>
		</div>
	);
};

export default Agregador;
