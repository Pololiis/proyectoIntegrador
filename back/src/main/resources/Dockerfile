# 1. Tener descargado Docker Desktop o descargarlo en su web: https://www.docker.com/products/docker-desktop/

# Usamos la imagen oficial de MySQL
FROM mysql:8.0

# Establecemos las variables de entorno
ENV MYSQL_DATABASE=BD_gameShare
ENV MYSQL_ROOT_PASSWORD=123456

# Puerto por defecto para MySQL
EXPOSE 3306

# 2. Dentro de una terminal Bash, nos posicionamos en la carpeta /resources de nuestro Backend ya que contiene este archivo Dockerfile.
# 3. Creamos nuestra imagen corriendo el siguiente comando en la terminal: docker build -t my-mysql-server .
# Puedes corroborar la creación de la imagen en tu Docker Desktop, en la sección de "Images".

# 4. Creamos nuestro contenedor (instancia de la imagen) corriendo el siguiente comando en la terminal:
# docker run -d -p 3306:3306 --name my-mysql-instance my-mysql-server
# Puedes corroborar la creación de la instancia en tu Docker Desktop, en la sección "Containers".

#  5. Abrimos el backend de nuestro proyecto en IntelliJ IDEA, nos dirigimos al archivo application.properties y...
# ...descomentamos la línea 8.

# Si todo salió bien y tu contenedor está corriendo, podremos conectarnos a la base de datos al correr el backend del proyecto.
# Recuerden siempre abrir Docker Desktop y corroborar que el contenedor esté corriendo cada vez que deseen trabajar...
# ... con la base de datos.

# IMPORTANTE: Docker Desktop no tiene persistencia, por lo que si vuelven a crear el contenedor, la base de datos partirá desde cero.