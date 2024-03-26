![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# **NewsWave**

## **📌 OBJETIVO DEL PROYECTO**

-Consolidar y poner a prueba conocomientos adquiridos a lo largo de mi aprendizaje
-Crear una aplicacion web que tenga un uso Real integrando en base a mis conocimientos las mejores practicas posibles para poder brindar al usuario una experiencia acorde y tranquilidad en la seguridad del manejo de cualquier informacion sensible

<br />

---

<br />

## **⚠️ IMPORTANTE**

Es necesario contar minimamente con la última versión estable de NodeJS y NPM. Asegúrate de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto. Actualmente las versiónes necesarias son:

- **Node**: 12.18.3 o mayor
- **NPM**: 6.14.16 o mayor

Para verificar que versión tienes instalada:

```bash
node -v
npm -v
```

<br />

---

## **📋 Si queres probar la aplicacion**

1.  Deberás forkear este repositorio para tener una copia del mismo en tu cuenta personal de GitHub.

2.  Clona el repositorio en tu computadora para comenzar

3.  En la carpeta **`api`** deberás crear un archivo llamado: **`.env`** que tenga la siguiente forma:

            ```env
            Reemplazar **`usuariodepostgres`** y **`passwordDePostgres`** con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).
              ```

            Adicionalmente será necesario que crees, **desde psql (shell o PGAdmin)**, una base de datos llamada **`newswave`**. Si no realizas este paso de manera manual no podrás avanzar con el proyecto.

            DB_USER=usuariodepostgres
            DB_PASSWORD=passwordDePostgres
            DB_HOST=localhost:5432

            DB_NAME= newswave
            NOTICIAS_KEY = API key necesaria debe registrarse en 
            https://currentsapi.services/api
            obtener una apikey y pegarla aca
            
            CLIMA_KEY = API key necesaria debe registrarse en
            https://openweathermap.org/api 
            obtener una apikey y pegarla aca

            claves de google console:
            servicio usado People Api
            Orígenes autorizados de JavaScript a configurar :
            Para usar con solicitudes de un navegador : 
            http://localhost:3002
            URI de redireccionamiento autorizados:
            Para usar con solicitudes de un servidor web:
            http://localhost:3002/usuario/auth/google/callback
            aca tenes un paso a paso de como hacerlo :
            https://www.youtube.com/watch?v=muDL3hkcgaY
            SECRET_CLIENT = obtener una apikey y pegarla aca
            CLIENT_ID = obtener una apikey y pegarla aca

            SECRET_KEY = esta clave podes generarla vos mismo es la utilizada para firmar los JWT
          

           este gmail es para enviar el reset de la contraseña para obtener un mail y pass_email debera de crearse un nuevo gmail y seguir estos   pasos para obtener tu contraseña de aplicacion
           https://youtube.com/watch?v=Q74nxFBCHCI
           
           MAIL_NODEMAILER = tu gmail
           PASS_EMAIL =  tu contraseña de aplicacion
            
           este mail es para el envio de noticias personalizadas al usuario al subscribirse al servicio siga los mismo pasos q el anterior necesitara crear un nuevo gmail
           
           MAILsUB_NODEMAILER = tu gmail
           PASS_EMAIL_SUBSCRIBERS =tu contraseña de aplicacion






