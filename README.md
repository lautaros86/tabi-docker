# Tabi Dashboard

## Descargar el proyecto

```git clone git@github.com:lautaros86/tabi-docker.git```

## Acceder al directorio del proyecto

```cd tabi-docker```

## Inicialr docker compose

```docker-compose up -d```

# Notas:

### En caso de que se realizen modificaciones en el codigo, recordar eliminar las imagenes previamente creadas para que se reflejen los cambios ejecutando:

```docker images // lista las imagenes existentes```

## Eliminar la imagen "tabi-docker-ui" y "tabi-docker-back"
```docker image rm tabi-docker-ui tabi-docker-back```

## Iniciar docker compose nuevamente
```docker-compose up -d```

# Autores
- Lautaro Silva
- Santiago Barcelo
- 